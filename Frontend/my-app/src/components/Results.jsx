import React from "react";

const Results = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2D1E40]">
      <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] shadow-lg rounded-lg p-8 w-100 text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-wide">Results</h2>
        <p className="text-lg mb-6 text-gray-700">Your exam results are available below:</p>
        <button
          className="bg-gray-400 text-black px-6 py-2 rounded-full text-lg font-semibold shadow-md cursor-not-allowed"
          disabled
        >
          📥 Results will be uploaded soon
        </button>
      </div>
    </div>
  );
};

export default Results;