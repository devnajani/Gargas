import React from "react";

const Downloads = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2D1E40]">
      <div className="bg-gradient-to-b from-[#F5E6C6] to-[#EAD7A4] shadow-lg rounded-lg p-8 w-100 text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-wide">Download</h2>
        <p className="text-lg mb-6 text-gray-700">Download the sample paper below:</p>
        <a
          href="/sample-paper.pdf" // Replace with your actual file path
          download="Sample_Paper.pdf"
          className="bg-yellow-500 text-black px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-400 transition duration-300"
        >
          📥 Download Sample Paper
        </a>
      </div>
    </div>
  );
};

export default Downloads;
