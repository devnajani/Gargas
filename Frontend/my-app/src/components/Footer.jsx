import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] text-gray-900 py-12 shadow-inner border-t border-gray-300">
      {/* Header Section */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-gray-800">Dharmik Wisdom</h2>
        <p className="text-sm sm:text-md italic font-semibold text-gray-700 opacity-90 mt-2">
          "ॐ सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः॥"
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
        {/* Footer Logo */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <img
            src="/images/footer_icon.png"
            alt="Divine Symbol"
            className="w-24 sm:w-28 h-24 sm:h-28 drop-shadow-lg rounded-full"
          />
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center sm:items-center space-y-4 text-gray-800">
          <p className="flex items-start sm:items-center space-x-3 text-sm sm:text-base">
            <FaMapMarkerAlt className="text-lg text-red-600 mt-1 sm:mt-0" />
            <span className="font-medium text-left">
              SHOP NO 4, Life plus, JAY SOCIETY COMPLEX, NEAR, Gandhi Baug Rd, Mani Nagar, Amreli, Gujarat 365601
            </span>
          </p>
          <p className="flex items-center space-x-3 text-sm sm:text-base">
            <FaPhoneAlt className="text-lg text-green-600" />
            <span className="font-medium">+91 9408624869</span>
          </p>
          <p className="flex items-center space-x-3 text-sm sm:text-base">
            <FaEnvelope className="text-lg text-blue-600" />
            <span className="font-medium">infogargas15@gmail.com</span>
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center sm:items-end space-y-4 justify-center">
          <p className="text-base sm:text-lg font-medium text-gray-800">Support & Follow Us</p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/gargas/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-600 ransition-all flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
            >
              <FaFacebook className="text-lg sm:text-xl" />
            </a>
            <a
              href="https://www.instagram.com/gargas_official"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-600 transition-all flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
            >
              <FaInstagram className="text-lg sm:text-xl" />
            </a>
            <a
              href="mailto:infogargas15@gmail.com"
              className="p-3 rounded-full border border-gray-600  transition-all flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
            >
              <FaEnvelope className="text-lg sm:text-xl" />
            </a>
            <a
              href="https://www.youtube.com/@gargas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-600  transition-all flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
            >
              <FaYoutube className="text-lg sm:text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-sm text-gray-600 border-t border-gray-400 w-full text-center pt-4 px-4">
        © 2025 Gargas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;