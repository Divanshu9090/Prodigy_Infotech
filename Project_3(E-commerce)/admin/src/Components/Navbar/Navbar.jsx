import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo.png";
import navProfile from "../../assets/profile.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" style={{width: '6rem', height : '5rem'}} />
      <img src={navProfile} alt="" className="nav-profile" style={{width: '3rem', height : '3rem'}} />
    </div>
  );
};

export default Navbar;
