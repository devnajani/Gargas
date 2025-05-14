import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExamLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [forgotOtp, setForgotOtp] = useState(['', '', '', '', '', '']);
  const [isForgotOtpModalOpen, setIsForgotOtpModalOpen] = useState(false);
  const [forgotOtpTimer, setForgotOtpTimer] = useState(120);
  const [forgotOtpValidationMessage, setForgotOtpValidationMessage] = useState("");
  const [isForgotOtpValid, setIsForgotOtpValid] = useState(false);
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const forgotOtpRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isForgotOtpModalOpen && forgotOtpTimer > 0) {
      interval = setInterval(() => {
        setForgotOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (forgotOtpTimer === 0) {
      closeForgotOtpModal();
    }
    return () => clearInterval(interval);
  }, [isForgotOtpModalOpen, forgotOtpTimer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://gargas-1.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        toast.success("Login successful!");
        navigate("/instructions");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error! Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.error("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      toast.error("Invalid email address.");
      return;
    }

    try {
      const response = await fetch("https://gargas-1.onrender.com/api/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsEmailValid(true);
        toast.success("Email validated.");
      } else {
        toast.error(data.error || "Email not found.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error! Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    try {
      const response = await fetch("https://gargas-1.onrender.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, password: newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successfully.");
        setForgotPasswordModal(false);
        setForgotEmail("");
        setNewPassword("");
        setIsEmailValid(false);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error! Please try again.");
    }
  };

  const handleSendForgotOtp = async () => {
    if (!forgotEmail) {
      toast.error("Please enter your email to send OTP.");
      return;
    }
    try {
      const response = await fetch("https://gargas-1.onrender.com/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsForgotOtpModalOpen(true);
        setForgotOtpTimer(120);
        setForgotOtp(['', '', '', '', '', '']);
        setForgotOtpValidationMessage('');
        setIsForgotOtpValid(false);
        setForgotOtpSent(true);
        toast.success("OTP sent successfully to your email.");
      } else {
        toast.error("Error: " + (data.message || "Failed to send OTP"));
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleForgotOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...forgotOtp];
    newOtp[index] = value;
    setForgotOtp(newOtp);
    if (value && index < 5) {
      forgotOtpRefs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      forgotOtpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyForgotOtp = async () => {
    const enteredOtp = forgotOtp.join('');
    if (enteredOtp.length !== 6) {
      setForgotOtpValidationMessage('Please enter a valid 6-digit OTP.');
      setIsForgotOtpValid(false);
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await fetch("https://gargas-1.onrender.com/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        setForgotOtpValidationMessage("OTP Verified Successfully!");
        setIsForgotOtpValid(true);
        toast.success("OTP Verified Successfully!");
        setTimeout(() => {
          closeForgotOtpModal();
          setIsEmailValid(true); // Allow password reset after OTP
        }, 1000);
      } else {
        setForgotOtpValidationMessage("Incorrect OTP. Please re-enter.");
        setIsForgotOtpValid(false);
        toast.error("Incorrect OTP. Please re-enter.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setForgotOtpValidationMessage('Failed to verify OTP. Please try again.');
      setIsForgotOtpValid(false);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleResendForgotOtp = async () => {
    setForgotOtp(['', '', '', '', '', '']);
    setForgotOtpTimer(120);
    setForgotOtpValidationMessage('');
    setIsForgotOtpValid(false);
    await handleSendForgotOtp();
  };

  const closeForgotOtpModal = () => {
    setIsForgotOtpModalOpen(false);
    setForgotOtp(['', '', '', '', '', '']);
    setForgotOtpValidationMessage('');
    // Do NOT reset isForgotOtpValid here!
  };

  const formatForgotOtpTimer = () => {
    const minutes = Math.floor(forgotOtpTimer / 60);
    const seconds = forgotOtpTimer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Main.png')" }}
    >
      <ToastContainer />
      <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Exam Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {[{ label: "Email", name: "email", type: "email" }].map(
              ({ label, name, type = "text", ...rest }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg bg-transparent"
                    style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
                    required
                    {...rest}
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full"
                  >
                    {label}
                  </label>
                </div>
              )
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Please enter password"
                className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg bg-transparent"
                style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
                required
              />
              <label
                htmlFor="password"
                className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full"
              >
                Password
              </label>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                style={{ fontSize: "1.5rem" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-orange-600 mt-6"
          >
            Start Exam
          </button>

          <div className="mt-4 text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setForgotPasswordModal(true);
              }}
              className="text-blue-500 text-sm hover:underline cursor-pointer"
            >
              Forgot Password
            </a>
          </div>
        </form>
      </div>

      {forgotPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-center mb-4">Reset Password</h3>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-500 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg bg-transparent"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
            />
            {!isEmailValid && (
              <button
                onClick={handleSendForgotOtp}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-orange-600 mb-4"
              >
                Send OTP
              </button>
            )}
            {isEmailValid && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg bg-transparent"
                  style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 flex items-center justify-center"
                  style={{ fontSize: "1.5rem", height: "100%" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            )}
            <div className="flex justify-end space-x-2 mt-6">
              {isEmailValid ? (
                <button
                  onClick={handleResetPassword}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Reset Password
                </button>
              ) : null}
              <button
                onClick={() => {
                  setForgotPasswordModal(false);
                  setForgotEmail("");
                  setNewPassword("");
                  setIsEmailValid(false);
                  setIsForgotOtpModalOpen(false);
                  setForgotOtp(['', '', '', '', '', '']);
                  setForgotOtpValidationMessage('');
                  setIsForgotOtpValid(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
          {/* OTP Modal for Forgot Password */}
          {isForgotOtpModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
                <h3 className="text-xl font-bold text-center">Enter OTP</h3>
                <p className="text-center text-gray-600">Please enter the 6-digit OTP sent to your email.</p>
                <div className="flex justify-center space-x-2">
                  {forgotOtp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleForgotOtpChange(e.target.value, index)}
                      ref={el => forgotOtpRefs.current[index] = el}
                      className="w-10 h-10 text-center border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                    />
                  ))}
                </div>
                {forgotOtpValidationMessage && (
                  <p className={`text-center text-lg ${isForgotOtpValid ? "text-green-600" : "text-red-600"}`}>
                    {forgotOtpValidationMessage}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <button
                    className="text-white px-4 py-2 rounded-full shadow-md bg-yellow-500 hover:bg-yellow-400"
                    onClick={handleVerifyForgotOtp}
                  >
                    Validate OTP
                  </button>
                  <button
                    className="text-white px-4 py-2 rounded-full shadow-md bg-gray-500 hover:bg-gray-400"
                    onClick={handleResendForgotOtp}
                  >
                    Resend OTP
                  </button>
                </div>
                <p className="text-center text-gray-600">Time remaining: {formatForgotOtpTimer()}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamLogin;
