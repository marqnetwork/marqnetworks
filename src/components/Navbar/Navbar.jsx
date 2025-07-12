"use client";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MarqButton from "../MarqButton/MarqButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar__logo">
        <img
          src="/images/logo.svg"
          alt="MarQ Networks logo—AI-driven digital growth partner for visionary brands"
        />
      </div>

      {/* Center: Menu */}
      <ul
        className={`navbar__menu ${
          isMenuOpen ? "navbar__menu--active" : ""
        }`}
      >
        <li><a href="/">Home</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/Solution">Solutions</a></li>
        <li><a href="/Portfolio">Portfolio</a></li>
            <li>
              <a href="/story">Story</a>
            </li>
        <li><a href="/Contact">Contact</a></li>
      </ul>

      {/* Right: Hamburger & Button */}
      <div className="navbar__right">
        <div className="navbar__hamburger" onClick={toggleMenu}>
          {isMenuOpen ? "×" : "☰"}
        </div>
        
          <MarqButton className="navbar__button" />
        
      </div>
    </nav>
  );
};

export default Navbar;
