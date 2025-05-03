import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ageGroup: '',
    houseNo: '',
    society: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.ageGroup) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await fetch("https://gargas-1.onrender.com/api/register", 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful!");

        // Reset form fields after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          ageGroup: "",
          houseNo: "",
          society: "",
          street: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error! Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(/images/Main.png)` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] p-6 rounded-lg shadow-lg space-y-4 w-full max-w-4xl mx-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Register for Exam</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[ 
                { label: 'First Name', name: 'firstName' },
                { label: 'Last Name', name: 'lastName' },
              ].map(({ label, name, type = 'text', ...rest }) => (
                <div key={name} className="relative flex-1">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg"
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                    required
                    {...rest}
                  />
                  <label htmlFor={name} className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[ 
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Password', name: 'password', type: 'password' },
              ].map(({ label, name, type = 'text', ...rest }) => (
                <div key={name} className="relative flex-1">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg"
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                    required
                    {...rest}
                  />
                  <label htmlFor={name} className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                    {label}
                  </label>
                </div>
              ))}
            </div> 

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Please enter password"
                  className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg"
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                  required
                />
                <label htmlFor="password" className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                  Password
                </label>
                <div
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} {/* Adjusted icon size */}
                </div>
              </div>

              <div className="flex flex-1 items-center space-x-4">
                <label className="text-gray-800 font-semibold text-lg">Age Group:</label> {/* Label for Age Group */}
                <label className="flex items-center space-x-2 text-lg">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="6-16"
                    checked={formData.ageGroup === "6-16"}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-gray-500  focus:outline-none appearance-none checked:bg-yellow-500 rounded-full" 
                    required
                  />
                  <span className="text-gray-800">6 to 16</span>
                </label>
                <label className="flex items-center space-x-2 text-lg">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="16+"
                    checked={formData.ageGroup === "16+"}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-gray-500 focus:outline-none appearance-none checked:bg-yellow-500 rounded-full" 
                    required
                  />
                  <span className="text-gray-800">16+</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[ 
                { label: 'House/Flat No.', name: 'houseNo' },
                { label: 'Society/Apartment Name', name: 'society' },
              ].map(({ label, name, type = 'text', ...rest }) => (
                <div key={name} className="relative flex-1">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter your ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg"
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                    required
                    {...rest}
                  />
                  <label htmlFor={name} className="rounded-full absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1">
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[ 
                { label: 'Street Name / Locality', name: 'street' },
                { label: 'Landmark (Optional)', name: 'landmark' },
              ].map(({ label, name, type = 'text', ...rest }) => (
                <div key={name} className="relative flex-1">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter your ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg"
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                    required
                    {...rest}
                  />
                  <label htmlFor={name} className="rounded-full absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1">
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[ 
                { label: 'City', name: 'city' },
                { label: 'Pincode/ZIP Code', name: 'pincode', type: 'number', pattern: '\\d{6}', title: 'Pincode must be exactly 6 digits', minLength: 6, maxLength: 6, onKeyDown: (e) => e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === '-' ? e.preventDefault() : null },
              ].map(({ label, name, type = 'text', ...rest }) => (
                <div key={name} className="relative flex-1">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter your ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg"
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                    required
                    {...rest}
                  />
                  <label htmlFor={name} className="rounded-full absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1">
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {[ 
                { label: 'State', name: 'state' },
                { label: 'Country', name: 'country' },
              ].map(({ label, name, type = 'text', ...rest }) => (
                <div key={name} className="relative flex-1">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Please enter your ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg"
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                    required
                    {...rest}
                  />
                  <label htmlFor={name} className=" rounded-full absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1">
                    {label}
                  </label>
                </div> 
              ))}
            </div>

            <button
              className="text-white px-6 py-2 rounded-full shadow-md transition duration-300 w-full bg-yellow-500 hover:bg-yellow-400"
              type="submit"
            >
              Go to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

