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

  // Inject chat widget and React scripts
  useEffect(() => {
    // React
    const reactScript = document.createElement("script");
    reactScript.src = "https://unpkg.com/react@18/umd/react.production.min.js";
    reactScript.crossOrigin = "anonymous";
    document.head.appendChild(reactScript);

    const reactDOMScript = document.createElement("script");
    reactDOMScript.src = "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js";
    reactDOMScript.crossOrigin = "anonymous";
    document.head.appendChild(reactDOMScript);

    // Widget
    const widgetScript = document.createElement("script");
    widgetScript.id = "24-7-agent";
    widgetScript.src = "https://widget.aiteamforce.com/widget.js";
    widgetScript.setAttribute("data-user-id", "688a37fd02ce2ed1a2f131ac");
    document.head.appendChild(widgetScript);

    // Initialization after load
    const initScript = () => {
      if (typeof window.initializeChatWidget === "function") {
        window.initializeChatWidget();
      }
    };
    window.addEventListener("load", initScript);

    return () => {
      window.removeEventListener("load", initScript);
    };
  }, []);

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
        className={`navbar__menu ${isMenuOpen ? "navbar__menu--active" : ""}`}
      >
        <li><a href="/">Home</a></li>
        <li><a href="/about-digital-growth-agency">About</a></li>
        <li><a href="/digital-growth-solutions">Solutions</a></li>
        <li><a href="/project-case-studies">Portfolio</a></li>
        <li><a href="/blog">Blogs</a></li>
        <li><a href="/contact-marq-networks">Contact</a></li>
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

export default Navbar;
