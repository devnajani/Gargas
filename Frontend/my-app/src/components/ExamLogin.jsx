import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const ExamLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

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
        navigate("/instructions");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error! Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      alert("Invalid email address.");
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
      } else {
        alert(data.error || "Email not found.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error! Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Please enter a new password.");
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
        alert("Password reset successfully.");
        setForgotPasswordModal(false);
        setForgotEmail("");
        setNewPassword("");
        setIsEmailValid(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error! Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Main.png')" }}
    >
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
                style={{ fontSize: "1.5rem" }} // Adjust the size of the icon
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
              {!isEmailValid ? (
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Validate Email
                </button>
              ) : (
                <button
                  onClick={handleResetPassword}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Reset Password
                </button>
              )}
              <button
                onClick={() => {
                  setForgotPasswordModal(false);
                  setForgotEmail("");
                  setNewPassword("");
                  setIsEmailValid(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamLogin;
