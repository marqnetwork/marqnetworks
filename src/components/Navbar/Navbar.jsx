'use client';
import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/images/logo.svg" alt="Logo" />
      </div>

      {/* Hamburger / Cross Icon */}
      <div
        className={`navbar__hamburger ${isMenuOpen ? "is-open" : ""}`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? "✕" : "☰"}
      </div>

      {/* Mobile Navigation */}
      <ul className={`navbar__menu ${isMenuOpen ? "navbar__menu--active" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/Solution">Solutions</a></li>
        <li><a href="/Portfolio">Portfolio</a></li>
        <li><a href="/Contact">Contact</a></li>
        <li className="navbar__button-wrapper mobile-only">
          <a
            href="https://marqnetworks.zohobookings.com/#/business-consultation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="navbar__button">Meet MarQ Networks</button>
          </a>
        </li>
      </ul>

      {/* Desktop Button */}
      <a
        href="https://marqnetworks.zohobookings.com/#/business-consultation"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar__button desktop-only"
      >
        Meet MarQ Networks
      </a>
    </nav>
  );
};

export default Navbar;
