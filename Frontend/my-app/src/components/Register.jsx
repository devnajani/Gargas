import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ageGroup: '',
    phoneNumber: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [otpValidationMessage, setOtpValidationMessage] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);

  // Enable Send OTP only if email is filled
  const isSendOtpDisabled = !formData.email;

  useEffect(() => {
    let interval;
    if (isOtpModalOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      closeOtpModal();
    }
    return () => clearInterval(interval);
  }, [isOtpModalOpen, timer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send OTP API
  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter your email to send OTP.");
      return;
    }
    try {
      const response = await fetch("https://gargas-1.onrender.com/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsOtpModalOpen(true);
        setTimer(120);
        setOtp(['', '', '', '', '', '']);
        setOtpValidationMessage('');
        setIsOtpValid(false);
        setOtpSent(true);
        toast.success("OTP sent successfully to your email.");
      } else {
        toast.error("Error: " + (data.message || "Failed to send OTP"));
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // OTP input logic
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP API
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setOtpValidationMessage('Please enter a valid 6-digit OTP.');
      setIsOtpValid(false);
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await fetch("https://gargas-1.onrender.com/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpValidationMessage("OTP Verified Successfully!");
        setIsOtpValid(true);
        toast.success("OTP Verified Successfully!");
        setTimeout(() => {
          closeOtpModal();
        }, 1000);
      } else {
        setOtpValidationMessage("Incorrect OTP. Please re-enter.");
        setIsOtpValid(false);
        toast.error("Incorrect OTP. Please re-enter.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpValidationMessage('Failed to verify OTP. Please try again.');
      setIsOtpValid(false);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(120);
    setOtpValidationMessage('');
    setIsOtpValid(false);
    await handleSendOtp();
  };

  const closeOtpModal = () => {
    setIsOtpModalOpen(false);
    setOtp(['', '', '', '', '', '']);
    setOtpValidationMessage('');
    // Do NOT reset isOtpValid here!
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Registration submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.ageGroup || !formData.phoneNumber) {
      toast.error("Please fill in all required fields!");
      return;
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits!");
      return;
    }
    if (!otpSent || !isOtpValid) {
      toast.error("Please verify your email with OTP before registering.");
      return;
    }

    try {
      const response = await fetch("https://gargas-1.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration Successful!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          ageGroup: "",
          phoneNumber: "",
        });
        setOtpSent(false);
        setIsOtpValid(false); // <-- Only reset here
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error! Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(/images/Main.png)` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] p-6 rounded-lg shadow-lg space-y-4 w-full max-w-4xl mx-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Register for Exam</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name Inputs */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[
                { label: 'First Name', name: 'firstName' },
                { label: 'Last Name', name: 'lastName' },
              ].map(({ label, name }) => (
                <div key={name} className="relative flex-1">
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                    required
                  />
                  <label htmlFor={name} className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                    {label}
                  </label>
                </div>
              ))}
            </div>

            {/* Email and OTP */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Please enter email"
                  className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                  required
                />
                <label htmlFor="email" className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                  Email
                </label>
              </div>
              <button
                type="button"
                className={`text-white px-6 py-2 rounded-full shadow-md transition duration-300 ${isSendOtpDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}`}
                onClick={handleSendOtp}
                disabled={isSendOtpDisabled}
              >
                Send OTP
              </button>
            </div>

            {/* Password */}
            <div className="relative flex-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Please enter password"
                className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                required
              />
              <label htmlFor="password" className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                Password
              </label>
              <div className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>

            {/* Phone */}
            <div className="relative flex-1">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) handleChange(e);
                }}
                placeholder="Please enter phone number"
                className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                maxLength="10"
                pattern="\d{10}"
                required
              />
              <label htmlFor="phoneNumber" className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                Phone Number
              </label>
            </div>

            {/* Age Group */}
            <div className="flex flex-1 items-center space-x-4">
              <label className="text-gray-800 font-semibold text-lg">Age Group:</label>
              {['6-16', '16+'].map((group) => (
                <label key={group} className="flex items-center space-x-2 text-lg">
                  <input
                    type="radio"
                    name="ageGroup"
                    value={group}
                    checked={formData.ageGroup === group}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-gray-500 focus:outline-none checked:bg-yellow-500 rounded-full"
                    required
                  />
                  <span className="text-gray-800">{group === '6-16' ? '6 to 16' : '16+'}</span>
                </label>
              ))}
            </div>

            <button
              className={`text-white px-6 py-2 rounded-full shadow-md transition duration-300 w-full ${
                isOtpValid &&
                formData.firstName &&
                formData.lastName &&
                formData.email &&
                formData.password &&
                formData.ageGroup &&
                /^\d{10}$/.test(formData.phoneNumber)
                  ? 'bg-yellow-500 hover:bg-yellow-400'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              type="submit"
              disabled={
                !isOtpValid ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.password ||
                !formData.ageGroup ||
                !/^\d{10}$/.test(formData.phoneNumber)
              }
            >
              Go to Payment
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
            <h3 className="text-xl font-bold text-center">Enter OTP</h3>
            <p className="text-center text-gray-600">Please enter the 6-digit OTP sent to your email.</p>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  ref={el => otpRefs.current[index] = el}
                  className="w-10 h-10 text-center border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                />
              ))}
            </div>
            {otpValidationMessage && (
              <p className={`text-center text-lg ${isOtpValid ? "text-green-600" : "text-red-600"}`}>
                {otpValidationMessage}
              </p>
            )}
            <div className="flex justify-between items-center">
              <button
                className="text-white px-4 py-2 rounded-full shadow-md bg-yellow-500 hover:bg-yellow-400"
                onClick={handleVerifyOtp}
              >
                Validate OTP
              </button>
              <button
                className="text-white px-4 py-2 rounded-full shadow-md bg-gray-500 hover:bg-gray-400"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            </div>
            <p className="text-center text-gray-600">Time remaining: {formatTimer()}</p>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
