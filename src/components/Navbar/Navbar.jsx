"use client";
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>

      {/* Hamburger Icon */}
      <div className="navbar__hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Navigation Links */}
      <ul className={`navbar__menu ${isMenuOpen ? 'navbar__menu--active' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/Portfolio">Portfolio</a></li>
        <li><a href="/Contact">Contact</a></li>
        <li><a href="/Faq">FAQ</a></li>
      </ul>

      {/* CTA Button */}
      <button className="navbar__button">Get in Touch</button>
    </nav>
  );
};

export default Navbar;
