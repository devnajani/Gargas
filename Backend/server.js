const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Student Schema
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  ageGroup: String,
  houseNo: String,
  society: String,
  street: String,
  landmark: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  marks: { type: Number, default: 0 },
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

// Register API
app.post("/api/register", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(400).json({ error: "Error saving student data" });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({ message: "Login successful!", userId: user._id });
});

// Validate Email API
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

// Reset Password API
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Email not found." });
    }

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch MCQs
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

// Submit Exam
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

    await Student.findByIdAndUpdate(userId, { marks: score });

    res.json({ message: "Exam submitted successfully!", score });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ error: "Failed to submit exam" });
  }
});

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
