import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Results from "./components/Results";
import Downloads from "./components/Downloads";
import Contact from "./components/Contact";
import Register from "./components/Register";
import NavbarAll from "./components/NavbarAll";
import Footer from "./components/Footer";
import UpComing from "./components/UpComing";
import Exam from "./components/Exam";
import ExamLogin from "./components/ExamLogin";
import ExamInstructions from "./components/ExamInstructions";
import Mcq from "./components/Mcq";
import "./App.css";

const Layout = () => {
  const location = useLocation();
  
  // Paths where navbar and footer should be hidden
  const hideNavbarFooter = ["/instructions", "/mcq"].some((path) => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally hide Navbar */}
      {!hideNavbarFooter && <NavbarAll />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<Results />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/upcoming" element={<UpComing />} />
          <Route path="/examlogin" element={<ExamLogin />} />
          <Route path="/instructions" element={<ExamInstructions />} />
          <Route path="/mcq" element={<Mcq />} />
        </Routes>
      </div>

      {/* Conditionally hide Footer */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
