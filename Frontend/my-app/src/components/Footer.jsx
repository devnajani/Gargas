import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] text-gray-900 py-8 text-center shadow-inner">
      <div className="container mx-auto">
        {/* Footer Logo */}
        <img 
          src="/images/footer_icon.png" 
          alt="Divine Symbol"
          className="mx-auto w-14 h-14 mb-4"
        />

        {/* Footer Title */}
        <p className="text-xl font-bold tracking-wide">Dharmik Wisdom</p> 

        {/* Sanskrit Shloka */}
        <p className="text-md italic font-semibold opacity-80 my-2">
          "ॐ सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः॥"
        </p>

        {/* Contact Information */}
        <div className="text-md">
          <p className="mt-2">
            📍 <span className="font-medium">Address:</span> 108 Divine Path, Varanasi, India
          </p>
          <p className="mt-1">
            📞 <span className="font-medium">Phone:</span> +91 98765 43210
          </p>
          <p className="mt-1">
            📧 <span className="font-medium">Email:</span> contact@dharmikwisdom.com
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-sm opacity-70">
          © 2025 Dharmik Wisdom. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
