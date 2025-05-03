import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamInstructions = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };

  const handleStartExam = () => {
    if (agreed) {
      navigate("/mcq"); // Redirect to MCQ page
    } else {
      alert("Please agree to the instructions before starting the exam.");
    }
  };

  return (
    <div 
      className="flex justify-center items-center h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('./images/Main.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-4">Exam Instructions</h2>
        <div className="text-gray-800 space-y-3 text-md">
          <p>1. The exam duration is <strong>60 minutes</strong>.</p>
          <p>2. No switching tabs, copy-pasting, or external help is allowed.</p>
          <p>3. Every question has <strong>four options</strong>, select one correct answer.</p>
          <p>4. The timer starts when you begin the exam and <strong>auto-submits</strong> upon completion.</p>
          <p>5. Your answers will be automatically saved as you proceed.</p>
          <p>6. If the system detects unusual activity, your exam may be terminated.</p>
        </div>
        
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={agreed}
              onChange={handleAgreeChange}
              className="mr-2 w-5 h-5"
            />
            <span className="text-gray-900 text-md">I have read and agree to the instructions.</span>
          </label>
        </div>
        
        <button
          onClick={handleStartExam}
          disabled={!agreed}
          className={`mt-4 w-full p-2 rounded text-white text-lg ${
            agreed ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Start Exam
        </button> 
      </div>
    </div>
  );
};

export default ExamInstructions;