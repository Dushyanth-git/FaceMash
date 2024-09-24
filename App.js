import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./src/Header";
import Upload from "./src/Upload";
import Home from "./src/Home";
import About from "./src/About";
import Contact from "./src/Contact";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Default route for Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
