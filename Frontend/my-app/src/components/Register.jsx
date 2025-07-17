import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.ageGroup
    ) {
      toast.error("Please fill all details before payment.");
      return;
    }

    try {
      const response = await fetch("https://gargas-1.onrender.com/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 250 }),
      });

      const order = await response.json();

      const options = {
        key: "rzp_live_IRl0nV0JgZFIVC",
        amount: order.amount,
        currency: "INR",
        name: "Ramayan Championship",
        description: "Exam Registration Fee",
        order_id: order.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        handler: async function (response) {
          try {
            const registerRes = await fetch("https://gargas-1.onrender.com/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...formData, paymentId: response.razorpay_payment_id }),
            });

            const data = await registerRes.json();
            console.log("Register API Response:", data);

            if (registerRes.ok) {
              toast.success("Registration Successful!");
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                ageGroup: '',
                phoneNumber: '',
              });
            } else {
              toast.error("Registration failed: " + (data.message || data.error || "Unknown error"));
            }
          } catch (err) {
            console.error("Error saving registration after payment:", err);
            toast.error("Error saving registration after payment.");
          }
        },
        modal: {
          ondismiss: function () {
            toast.warn("Payment cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Failed to initiate payment:", err);
      toast.error("Failed to initiate payment.");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(/images/Main.png)` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] p-6 rounded-lg shadow-lg space-y-4 w-full max-w-4xl mx-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Register for Ramayana Exam</h2>
          <p className="text-center text-sm text-gray-600 mb-6">If any kind of help required, please call 9408624869</p>

          <form className="space-y-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[{ label: 'First Name', name: 'firstName' }, { label: 'Last Name', name: 'lastName' }].map(({ label, name }) => (
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
                required
              />
              <label htmlFor="phoneNumber" className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                Phone Number
              </label>
            </div>

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
              type="button"
              onClick={handlePayment}
              className={`text-white px-6 py-2 rounded-full shadow-md transition duration-300 w-full ${
                formData.firstName &&
                formData.lastName &&
                formData.email &&
                formData.password &&
                formData.ageGroup &&
                /^\d{10}$/.test(formData.phoneNumber)
                  ? 'bg-yellow-500 hover:bg-yellow-400'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
