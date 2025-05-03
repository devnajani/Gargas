import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
  
    // Open Gmail compose in browser with clean formatting
    const gmailBody = `Hello Gargas Team,\n\n${message}\n\nRegards,\n${name}\n${email}`;
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=infogargas15@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(gmailBody)}`;
  
    // Open Gmail in new tab (works on desktop + mobile browser)
    window.open(gmailURL, "_blank");
  
    // Reset the form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  
    
  

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/Main.png')" }}>
      <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-wide">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Subject', name: 'subject', type: 'text' },
            { label: 'Message', name: 'message', type: 'textarea' },
          ].map(({ label, name, type = 'text', ...rest }) => (
            <div key={name} className="relative">
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={`Please enter ${label.toLowerCase()}`}
                  className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg bg-transparent"
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                  rows="4"
                  required
                  {...rest}
                  onPaste={(e) => e.preventDefault()} // Disable pasting
                  onCopy={(e) => e.preventDefault()}  // Disable copying
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={`Please enter ${label.toLowerCase()}`}
                  className="w-full px-4 py-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#3B3D40] text-lg bg-transparent"
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                  required
                  {...rest}
                  onPaste={(e) => e.preventDefault()} // Disable pasting
                  onCopy={(e) => e.preventDefault()}  // Disable copying
                />
              )}
              <label htmlFor={name} className="absolute left-2.5 top-3.5 text-gray-900 text-lg transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left bg-white px-1 rounded-full">
                {label}
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-orange-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
