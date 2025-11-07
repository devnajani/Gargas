import React from "react";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate('/examlogin');
  };
  const handlenoexam = () => {
alert("📣 Coming Soon! Get ready for Sanatan Dham's biggest championship — stay tuned and take the challenge soon!");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="bg-[#2D1E40] p-6 rounded-lg shadow-lg text-center max-w-md border border-yellow-500">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Ramayana Exam</h2>
        
        <div className="relative">
          <img
            src="/images/ramayana.png" 
            alt="Ramayana Exam"
            className="w-full h-64 object-cover rounded-lg border-2 border-yellow-500"
          />
        </div>

        {/* ✅ Properly Positioned Start Button */}
        <div className="mt-6">
          <button
            className="bg-yellow-500 text-black px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-400 transition duration-300"
            // onClick={handleStartExam}
            onClick={handlenoexam}
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exam;
