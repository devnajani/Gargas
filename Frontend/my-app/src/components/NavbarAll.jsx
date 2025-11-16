import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarAll = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
<nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${scrolled ? "py-4 bg-yellow-600/70" : "py-6 bg-gradient-to-b from-yellow-500/90 to-transparent"}`}>
        
        <div className="container mx-auto flex items-center justify-between px-6 md:px-12 transition-all duration-300">
          
          {/* Logo - Hidden when scrolling on laptop and tablet screens */}
<div className={`transition-opacity duration-300 ${scrolled ? "opacity-100 md:opacity-0" : "opacity-100"}`}>
  <Link to="/" className="flex items-center space-x-2">
    <img 
      src="/logo.png" 
      alt="Logo" 
      className="w-16 h-16 object-cover rounded-full shadow-lg border-2 border-yellow-500 transition-transform duration-300 hover:scale-110" 
    />
    <span className="text-2xl font-bold text-white">Gargas</span> {/* Added Gargas */}
  </Link>
</div>

          {/* Hamburger Menu Button */}
          <button 
            className="md:hidden text-white text-3xl focus:outline-none" 
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          {/* Desktop Navigation Links */}
          {/* <ul className={`hidden md:flex md:space-x-8 text-xl font-bold text-white transition-all duration-300 
            ${scrolled ? "mx-auto" : ""}`}>
            {["Home", "About", "Results", "Exam", "Downloads", "Contact", "Register"].map((item, index) => (
              <li key={index} className="hover:text-yellow-300 transition duration-300">
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
              
            ))}
          </ul> */}
        </div>

        {/* Mobile Menu - Slide in from Left */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-yellow-900 text-white transform transition-transform duration-300 ease-in-out 
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>

          {/* Close Button */}
          <button 
            className="text-2xl absolute top-4 right-4 text-[#3B2F2F] focus:outline-none px-3 py-1 rounded-md hover:bg-[#2A1F1F] transition duration-300" 
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>

          {/* Mobile Menu Options */}
          <ul className="mt-16 space-y-6 px-6 text-xl font-bold"> {/* Increased text size */}
            {["Home", "About", "Results", "Exam", "Downloads", "Contact", "Register"].map((item, index) => (
              <li key={index} className="border-b border-yellow-500 pb-2 hover:text-yellow-300 transition duration-300">
                <Link to={`/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
  );
};

export default NavbarAll;