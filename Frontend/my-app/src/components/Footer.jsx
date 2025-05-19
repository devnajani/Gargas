import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] text-gray-900 py-12 shadow-inner border-t border-gray-300">
      {/* Header Section */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl font-bold tracking-wide text-gray-800">Dharmik Wisdom</h2>
        <p className="text-md italic font-semibold text-gray-700 opacity-90 mt-2">
          "ॐ सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः॥"
        </p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left items-center sm:items-start">
        {/* Footer Logo */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <img
            src="/images/footer_icon.png"
            alt="Divine Symbol"
            className="w-28 h-28 drop-shadow-lg rounded-full"
          />
        </div>

        {/* Contact Information (Centered) */}
        <div className="flex flex-col items-center sm:items-center space-y-4 text-gray-800">
          <p className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-lg text-red-600" />
            <span className="font-medium">
              SHOP NO 4, Life plus, JAY SOCIETY COMPLEX, NEAR, Gandhi Baug Rd, Mani Nagar, Amreli, Gujarat 365601
            </span>
          </p>
          <p className="flex items-center space-x-3">
            <FaPhoneAlt className="text-lg text-green-600" />
            <span className="font-medium">+91 9408624869</span>
          </p>
          <p className="flex items-center space-x-3">
            <FaEnvelope className="text-lg text-blue-600" />
            <span className="font-medium">infogargas15@gmail.com</span>
          </p>
        </div>

        {/* Social Media Links (Right Aligned) */}
        <div className="flex flex-col items-center sm:items-end space-y-4">
          <p className="text-lg font-medium text-gray-800">Follow Us</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-3 rounded-full border border-gray-600 hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center w-12 h-12"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full border border-gray-600 hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center w-12 h-12"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="mailto:infogargas15@gmail.com"
              className="p-3 rounded-full border border-gray-600 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center w-12 h-12"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-sm text-gray-600 border-t border-gray-400 w-full text-center pt-4 px-4">
    
      </div>
    </footer>
  );
};

export default Footer;