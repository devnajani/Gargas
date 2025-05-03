import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAll from "./NavbarAll";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

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

  // Automatically hide the popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const exams = [
    { id: 1, name: "Mahabharata", image: "/images/mahabharata.png" },
    { id: 2, name: "Ramayana", image: "/images/ramayana.png" },
    { id: 3, name: "Indian History", image: "/images/indian_history.png" },
    { id: 4, name: "Hanuman Chalisa", image: "/images/hanuman_chalisa.png" }
  ];

  return (
    <>
      {/* Background Blur and Popup */}
      {showPopup && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="relative w-72 h-72 bg-gradient-to-br from-yellow-300 to-orange-400 text-brown-900 rounded-full shadow-2xl flex flex-col items-center justify-center text-center px-6 py-4">
      
      {/* Close Button */}
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-2.5 right-3 text-brown-800 text-2xl font-bold hover:text-white hover:bg-brown-600 w-8 h-8 flex items-center justify-center rounded-full transition"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Cute Welcome Message */}
      <h2 className="text-xl font-extrabold mb-2">🌸 Namaste! 🌸</h2>
      <h2 className="text-xl font-extrabold mb-2">Welcome to Gargas</h2>
      <p className="text-md font-medium leading-relaxed">
        You're entering a sacred space of wisdom and light.  
        <br /> Let Dharma guide your journey 
      </p>
    </div>
  </div>
)}

      {/* Navbar */}
      <NavbarAll />

      {/* Hero Section */}
      <div className="relative h-screen">
        <img 
          src="/images/Main.png" 
          alt="Spiritual Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
      </div>

      {/* Sanskrut Section */}
      <section className="bg-[#F8E0A6] py-16 text-center text-[#3E2723]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold tracking-widest drop-shadow-lg">
            धर्मो रक्षति रक्षितः
          </h2>
          <p className="mt-4 text-2xl italic tracking-wider opacity-90 drop-shadow-md">
            "धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः।  
            तस्माद्धर्मो न हन्तव्यः मा नो धर्मो हतोऽवधीत्॥"
          </p>
          <div className="mt-6 w-24 h-1 bg-[#A67C52] mx-auto"></div>
        </div>
      </section>

      {/* Dharma Exams Section */}
      <section className="py-20 bg-gradient-to-b from-[#2C1D27] via-[#382F46] to-[#2C1D27] text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-6 tracking-wider">
          Dharma Exams
        </h2>
        <p className="text-lg text-yellow-200 italic mb-10">
          "धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः। तस्माद्धर्मो न हन्तव्यः मा नो धर्मो हतोऽवधीत्॥"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-[#3B2F2F] border border-yellow-500 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
              <img src={exam.image} alt={exam.name} className="w-32 h-32 mx-auto rounded-full shadow-md border-4 border-yellow-500" />
              <h3 className="text-2xl font-semibold mt-4 text-yellow-300">{exam.name}</h3>
              <button
                className="mt-4 px-6 py-3 bg-yellow-500 text-gray-900 rounded-full text-lg shadow-md hover:bg-yellow-400 hover:shadow-lg transition duration-300"
                onClick={() => navigate('/upcoming')}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
