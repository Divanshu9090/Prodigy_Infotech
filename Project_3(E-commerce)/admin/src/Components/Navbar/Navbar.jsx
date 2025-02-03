import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo.png";
import navProfile from "../../assets/profile.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" style={{width: '8rem', height : '5rem'}} />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
