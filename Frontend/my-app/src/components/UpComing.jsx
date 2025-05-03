import React from "react";
import { useNavigate } from 'react-router-dom';

const UpComing = () => {
  const navigate = useNavigate();
  const exams = [
    { id: 1, name: "Mahabharata", image: "/images/mahabharata.png" },
    { id: 2, name: "Ramayana", image: "/images/ramayana.png" },
    { id: 3, name: "Indian History", image: "/images/indian_history.png" },
    { id: 4, name: "Hanuman Chalisa", image: "/images/hanuman_chalisa.png" }
  ];

  return (
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
            {exam.name === "Ramayana" ? (
              <button
                className="mt-4 px-6 py-3 bg-yellow-500 text-gray-900 rounded-full text-lg shadow-md hover:bg-yellow-400 hover:shadow-lg transition duration-300"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            ) : (
              <button
                className="mt-4 px-6 py-3 bg-[#F8E0A6] text-gray-900 rounded-full text-lg shadow-md cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpComing;
