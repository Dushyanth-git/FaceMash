import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Header = () => {
  return (
    <div className="header">
      <div className="upload">
      <Link to="/upload">Upload</Link>
      </div>
      <div className="logo">
        <h1>FaceMash</h1>
      </div>
      <div className="nav-items">
        <Link to="/Home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Header;
