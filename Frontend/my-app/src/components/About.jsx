import React from "react";
import NavbarAll from "./NavbarAll";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavbarAll />
      <section className="relative bg-[#F8E0A6] text-[#3E2723]">
        {/* Hero Section with Uploaded Image */}
        <div className="relative w-full h-[500px] overflow-hidden">
          <img
            src="/images/Main.png"
            alt="About Us Decorative"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">About Us</h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Introduction */}
          <div className="container mx-auto px-4 py-10 text-center">
            <h2 className="text-4xl font-bold tracking-wide">Introduction</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
              Gargas is an educational platform dedicated to spreading the timeless wisdom of Sanatan Dharma through engaging and interactive learning experiences. Our goal is to reconnect individuals with the rich spiritual, moral, and philosophical heritage of India. By offering knowledge in the form of quizzes, courses, and live sessions, Gargas creates a modern space to explore the depth of ancient Indian scriptures and values.
            </p>
            <div className="mt-6 w-24 h-1 bg-[#A67C52] mx-auto"></div>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-b from-[#2C1D27] via-[#382F46] to-[#2C1D27] py-16 text-yellow-300">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold">Our Vision</h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
                At Gargas, our vision is to bring the powerful teachings of Sanatan Dharma to everyone in a way that’s simple, meaningful, and modern. We dream of creating a community where people respect and follow truth, tradition, and inner growth, learn timeless values, and connect ancient wisdom with today’s lifestyle using digital tools.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
              At Gargas, our mission is to inspire and share the wisdom of Sanatan Dharma to help people live better, more meaningful lives. We aim to offer easy-to-follow courses on sacred texts and teachings, provide live sessions with knowledgeable mentors, and create fun, interactive quizzes to make spiritual knowledge practical and useful for everyone.
            </p>
          </div>

          {/* Future Scope */}
          <div className="bg-gradient-to-b from-[#2C1D27] via-[#382F46] to-[#2C1D27] py-16 text-yellow-300">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-6">Future Scope</h2>
              <div className="max-w-3xl mx-auto">
                <ul className="mt-4 text-lg leading-relaxed list-disc list-inside text-center">
                  <li>Structured courses on sacred texts such as Ramayan, Mahabharat, Rudri, and more.</li>
                  <li>Live lectures, discussions, and Q&A sessions with knowledgeable speakers.</li>
                  <li>MCQ-based exams to reinforce learning and promote healthy competition.</li>
                  <li>National-level competitions with rankings, rewards, and recognition.</li>
                  <li>Certification programs to acknowledge learners’ progress and dedication.</li>
                  <li>Collaborations with spiritual institutions to enhance content authenticity.</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Sacred Wisdom */}
          <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-4xl font-bold">Sacred Wisdom</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto italic">
              "धर्मो रक्षति रक्षितः। य: धर्मेण प्रतिष्ठितं सर्वं जगत: पालयेत्। धर्मस्य त्राणं शरणं शान्तिं प्रियतमा: शृणु। धर्मेणैव सदा य: प्रियतमा: प्रपद्यते॥"
            </p>
            <p className="mt-4 text-lg max-w-3xl mx-auto">
              <strong>Translation:</strong> "Dharma protects those who protect it. He who upholds Dharma, the entire world remains protected. Dharma is the refuge, the peace, and the ultimate protector of those who seek it. One who surrenders to Dharma will always find the highest peace and protection."
            </p>
          </div>

          {/* Call-to-Action */}
          <div className="bg-gradient-to-b from-[#2C1D27] via-[#382F46] to-[#2C1D27] text-center py-16 text-yellow-300">
            <h2 className="text-3xl font-bold">Join Our Spiritual Journey</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg">
              Explore our Dharma exams, scriptures, and historical insights. Connect with like-minded individuals and embrace the teachings of ancient wisdom.
            </p>
            <div className="mt-6">
              <button
                className="mt-4 px-6 py-3 bg-yellow-500 text-gray-900 rounded-full text-lg shadow-md hover:bg-yellow-400 hover:shadow-lg transition duration-300"
                onClick={() => navigate('/upcoming')}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;