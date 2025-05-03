import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mcq = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour timer
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(true); // Show language modal initially
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedLanguage) {
      fetch(`http://localhost:5000/api/mcqs/${selectedLanguage}`)
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((error) => console.error(error));

      // Timer countdown
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageModal(false); // Close the modal
  };

  const handleOptionSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
    setReviewQuestions((prev) => prev.filter((i) => i !== currentIndex));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch("http://localhost:5000/api/submit-exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, answers, language: selectedLanguage }), // Send selected language as part of the payload
    });

    const data = await response.json();
    setShowThankYouModal(true);
  };

  const toggleReview = (index) => {
    setReviewQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="relative flex h-screen">
      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('./images/Main.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(5px)',
            }}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg text-center backdrop-blur-md w-[90%] max-w-[500px] mx-auto">
            <h2 className="text-2xl font-bold mb-4">Select Your Language</h2>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => handleLanguageSelect("Hindi")}
                className={`p-2 rounded border-2 text-lg w-[30%] ${
                  selectedLanguage === "Hindi"
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-red-500 border-red-500"
                }`}
              >
                Hindi
              </button>
              <button
                onClick={() => handleLanguageSelect("Gujarati")}
                className={`p-2 rounded border-2 text-lg w-[30%] ${
                  selectedLanguage === "Gujarati"
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-orange-500 border-orange-500"
                }`}
              >
                Gujarati
              </button>
              <button
                onClick={() => handleLanguageSelect("English")}
                className={`p-2 rounded border-2 text-lg w-[30%] ${
                  selectedLanguage === "English"
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-red-500 border-red-500"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Exam Content */}
      {!showLanguageModal && (
        <>
          {/* Left Side: Question Navigation */}
          <div className={`w-1/4 p-4 border-r ${showThankYouModal ? "blur-sm" : ""}`}>
            <h2 className="text-xl font-bold mb-4">Questions</h2>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-full ${
                    answers[questions[index]?._id]
                      ? "bg-green-500 text-white"
                      : reviewQuestions.includes(index)
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200"
                  } ${currentIndex === index ? "border-2 border-yellow-500" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Buttons Container */}
            <div className="flex space-x-4 mt-4">
              {/* Mark as Review Button */}
              <button
                onClick={() => toggleReview(currentIndex)}
                className={`w-[48%] p-2 rounded ${
                  reviewQuestions.includes(currentIndex)
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-400"
                }`}
              >
                {reviewQuestions.includes(currentIndex) ? "Unmark Review" : "Mark as Review"}
              </button>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-[48%] p-2 bg-green-500 text-white font-bold rounded"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Right Side: MCQs */}
          <div className={`w-3/4 p-6 ${showThankYouModal ? "blur-sm" : ""}`}>
            {questions.length > 0 && (
              <>
                <h3 className="text-lg font-semibold">{`Q${currentIndex + 1}. ${
                  questions[currentIndex]?.question
                }`}</h3>
                <div className="mt-4 space-y-2">
                  {questions[currentIndex]?.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        handleOptionSelect(questions[currentIndex]?._id, option)
                      }
                      className={`block w-full p-2 border rounded ${
                        answers[questions[currentIndex]?._id] === option
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                className={`px-4 py-2 rounded ${
                  currentIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
                }
                className={`px-4 py-2 rounded ${
                  currentIndex === questions.length - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                disabled={currentIndex === questions.length - 1}
              >
                Next
              </button>
            </div>

            {/* Timer */}
            <div className="mt-4 text-right text-lg font-semibold text-red-600">
              Time Left: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? "0" : ""}
              {timeLeft % 60}
            </div>
          </div>

          {/* Thank You Modal */}
          {showThankYouModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center border-4 border-yellow-500 w-[90%] max-w-[600px] mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-yellow-500">Thank You!</h2>
                <p className="text-lg mb-4">
                  Your exam has been submitted successfully.
                </p>
                <p className="text-lg mb-4">
                  कृतज्ञो भव! धन्यवादः पुनः आगच्छतु! (Be grateful! Thank you, come again!)
                </p>
                <button
                  onClick={() => navigate("/home")}
                  className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Mcq;
