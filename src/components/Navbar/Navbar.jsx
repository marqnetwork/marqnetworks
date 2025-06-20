"use client";
import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // <div className="bg-[#000]">
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/images/logo.svg" alt="MarQ Networks logo—AI-driven digital growth partner for visionary brands" />
        <div>
          <ul
            className={`navbar__menu ${
              isMenuOpen ? "navbar__menu--active" : ""
            }`}
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/About">About</a>
            </li>
            <li>
              <a href="/Solution">Solutions</a>
            </li>
            <li>
              <a href="/Portfolio">Portfolio</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
           
          </ul>
        </div>
      </div>

      {/* Hamburger Icon */}
      <div className="navbar__hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Navigation Links */}

      {/* CTA Button */}
      <a
        href="https://marqnetworks.zohobookings.com/#/business-consultation"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="navbar__button">Meet MarQ Networks</button>
      </a>
    </nav>
    // </div>
  );
};

export default Navbar;
