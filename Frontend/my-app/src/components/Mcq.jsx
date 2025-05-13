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
      fetch(`https://gargas-1.onrender.com/api/mcqs/${selectedLanguage}`)
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
    const response = await fetch("https://gargas-1.onrender.com/api/submit-exam", {
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
    <>
      <style>
        {`
          .no-select, .no-select * {
            user-select: none !important;
            -webkit-user-select: none !important;
            -ms-user-select: none !important;
            -moz-user-select: none !important;
            -webkit-touch-callout: none !important;
          }
        `}
      </style>
      <div
        className="no-select relative flex flex-col h-screen"
        onCopy={e => e.preventDefault()}
        onCut={e => e.preventDefault()}
        onContextMenu={e => e.preventDefault()}
        onSelectStart={e => e.preventDefault()}
        onTouchStart={e => e.preventDefault()}
      >
        {/* Timer */}
        <div className="w-full text-center py-2 bg-gray-100 text-lg font-semibold text-red-600">
          Time Left: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </div>

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
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => handleLanguageSelect("Hindi")}
                  className={`p-2 rounded border-2 text-lg ${
                    selectedLanguage === "Hindi"
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-red-500 border-red-500"
                  }`}
                >
                  Hindi
                </button>
                <button
                  onClick={() => handleLanguageSelect("Gujarati")}
                  className={`p-2 rounded border-2 text-lg ${
                    selectedLanguage === "Gujarati"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-orange-500 border-orange-500"
                  }`}
                >
                  Gujarati
                </button>
                <button
                  onClick={() => handleLanguageSelect("English")}
                  className={`p-2 rounded border-2 text-lg ${
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
            {/* Question Section */}
            <div className="flex-1 p-4">
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
            </div>

            {/* Navigation Section */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
              {/* Question Numbers */}
              <div className="flex overflow-x-auto space-x-2 mb-4">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`w-[60px] h-[60px] flex items-center justify-center rounded-lg border ${
                      answers[questions[index]?._id]
                        ? "bg-green-500 text-white"
                        : reviewQuestions.includes(index)
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200"
                    } ${currentIndex === index ? "border-2 border-yellow-500" : ""}`}
                    onClick={() => setCurrentIndex(index)}
                    style={{ minWidth: "60px", minHeight: "60px" }} // Ensure consistent size
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4">
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
                <button
                  onClick={handleSubmit}
                  className="w-[48%] p-2 bg-green-500 text-white font-bold rounded"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </>
        )}

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
      </div>
    </>
  );
};

export default Mcq;