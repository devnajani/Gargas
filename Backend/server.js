const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors("*"));
app.use(express.json());

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// In-memory OTP storage
const otpStore = {};

// Student Schema
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  ageGroup: String,
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit phone number!`,
    },
    required: [true, "Phone number is required"],
  },
  marks: { type: Number, default: 0 },
  isExamComplete: { type: Boolean, default: false },
});

const Student = mongoose.model("Student", studentSchema);

// MCQ Schema
const mcqSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const Mcq = mongoose.model("mcq", mcqSchema);
const GujaratiMcq = mongoose.model("gujarati_mcq", mcqSchema, "gujarati_mcq");
const HindiMcq = mongoose.model("hindi_mcq", mcqSchema, "hindi_mcq");

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Exam Portal Backend! API is working.");
});

// ✅ Registration API
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, ageGroup } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password || !ageGroup) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password,
      ageGroup,
      phoneNumber,
      isExamComplete: false,
    });
    await newStudent.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Registration Error:", error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists." });
    } else {
      res.status(400).json({ error: "Error saving student data" });
    }
  }
});

// ✅ Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.isExamComplete) {
      return res.status(403).json({ error: "You have already completed the exam." });
    }

    res.json({ message: "Login successful!", userId: user._id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Email Validation
app.post("/api/validate-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email not found." });
    }

    res.json({ message: "Email is valid." });
  } catch (error) {
    console.error("Error validating email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Password Reset
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOneAndUpdate({ email }, { password }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "Email not found." });
    }

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Send OTP
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code for Registration",
    text: `Your OTP is: ${otp}\n\nPlease enter this OTP to complete your registration. This code will expire in 2 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    otpStore[email] = otp;

    setTimeout(() => {
      delete otpStore[email];
      console.log(`OTP for ${email} expired and deleted.`);
    }, 2 * 60 * 1000);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Email not sent" });
  }
});

// ✅ Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email];
    res.json({ success: true, message: "OTP verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
});

// ✅ Fetch MCQs
app.get("/api/mcqs/:language", async (req, res) => {
  try {
    const { language } = req.params;
    let McqModel;

    if (language === "English") {
      McqModel = Mcq;
    } else if (language === "Gujarati") {
      McqModel = GujaratiMcq;
    } else if (language === "Hindi") {
      McqModel = HindiMcq;
    } else {
      return res.status(400).json({ error: "Invalid language selected" });
    }

    const mcqs = await McqModel.aggregate([{ $sample: { size: 60 } }]);
    res.json(mcqs);
  } catch (error) {
    console.error("Error fetching MCQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Submit Exam
app.post("/api/submit-exam", async (req, res) => {
  try {
    const { userId, answers, language } = req.body;
    let score = 0;
    let McqModel;

    if (language === "English") {
      McqModel = Mcq;
    } else if (language === "Gujarati") {
      McqModel = GujaratiMcq;
    } else if (language === "Hindi") {
      McqModel = HindiMcq;
    } else {
      return res.status(400).json({ error: "Invalid language selected" });
    }

    const mcqs = await McqModel.find({ _id: { $in: Object.keys(answers) } });

    mcqs.forEach((mcq) => {
      if (answers[mcq._id.toString()] === mcq.correctAnswer) {
        score += 1;
      }
    });

    await Student.findByIdAndUpdate(userId, {
      marks: score,
      isExamComplete: true,
    });

    res.json({ message: "Exam submitted successfully!", score });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ error: "Failed to submit exam" });
  }
});

// ✅ Patch Missing Field
app.get("/api/fix-missing-field", async (req, res) => {
  try {
    const result = await Student.updateMany(
      { isExamComplete: { $exists: false } },
      { $set: { isExamComplete: false } }
    );
    res.json({ message: `Patched ${result.modifiedCount} documents.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to patch documents" });
  }
});


// rozarpay-------------
app.post("/api/create-order", async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: 25000,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});
app.post("/api/send-receipt", async (req, res) => {
  const { name, email, phone, ageGroup, amount, transactionId } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "infogargas15@gmail.com",
      pass: "dpylpswjklvlpyhi", 
    },
  });

  const mailOptions = {
    from: '"Gargas" <infogargas15@gmail.com>',
    to: email,
    subject: "🧾 Gargas | Ramayan Championship Receipt",
    html: `
      <div style="font-family: Arial, sans-serif; border:1px solid #ccc; padding:20px; border-radius:8px; max-width:500px; margin:auto;">
        <h2 style="text-align:center; color:#2d3748;">🧾 Payment Receipt</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for registering for the <strong>Ramayan Championship</strong>. We have received your payment of <strong>₹${amount}</strong>.</p>

        <hr style="margin: 20px 0;" />

        <p><strong>📧 Email:</strong> ${email}</p>
        <p><strong>📱 Phone:</strong> ${phone}</p>
        <p><strong>🎯 Age Group:</strong> ${ageGroup}</p>
        <p><strong>💳 Payment ID:</strong> ${transactionId}</p>
        <p><strong>🕒 Status:</strong> <span style="color: green;">Paid</span></p>

        <hr style="margin: 20px 0;" />

        <p style="text-align:center;">This is an auto-generated receipt for your payment.<br/>If you didn’t initiate this, please contact <a href="mailto:infogargas15@gmail.com">infogargas15@gmail.com</a>.</p>
        <p style="text-align:center; font-size:14px; color:#777;">© 2025 Gargas Foundation</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending receipt email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});



// ✅ Razorpay Verify Payment
app.post("/api/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment verified successfully." });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature. Possible tampering!" });
  }
});
// Serve static files from React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler: for any request that doesn't match above, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// ✅ ✅ ✅ Add Keep-Alive /ping Route (NEW)
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});


// ✅ Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);