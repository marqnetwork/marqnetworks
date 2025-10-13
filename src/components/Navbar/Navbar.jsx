"use client";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MarqButton from "../MarqButton/MarqButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleResources = () => setResourcesOpen(!resourcesOpen);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resourcesOpen && !event.target.closest('.navbar__dropdown')) {
        setResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [resourcesOpen]);

  // Inject chat widget + React scripts
  useEffect(() => {
    const reactScript = document.createElement("script");
    reactScript.src =
      "https://unpkg.com/react@18/umd/react.production.min.js";
    reactScript.crossOrigin = "anonymous";
    document.head.appendChild(reactScript);

    const reactDOMScript = document.createElement("script");
    reactDOMScript.src =
      "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js";
    reactDOMScript.crossOrigin = "anonymous";
    document.head.appendChild(reactDOMScript);

    const widgetScript = document.createElement("script");
    widgetScript.id = "24-7-agent";
    widgetScript.src = "https://widget.aiteamforce.com/widget.js";
    widgetScript.setAttribute("data-user-id", "688a37fd02ce2ed1a2f131ac");
    document.head.appendChild(widgetScript);

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

  // Inject JSON-LD Structured Data
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.marqnetworks.com/#organization",
          "name": "MarQ Networks",
          "alternateName": "marQ Networks",
          "url": "https://www.marqnetworks.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.marqnetworks.com/images/logo.svg"
          },
          "description":
            "AI-driven digital growth partner for branding, custom software, SEO audits, and CRM automation.",
          "email": "info@marqnetworks.com",
          "telephone": "+923338683688",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "14/B Civil Line Ali Park",
            "addressLocality": "Sialkot",
            "addressCountry": "PK"
          },
          "sameAs": [
            "https://x.com/MarqNetworks",
            "https://www.instagram.com/marqnetworksofficial",
            "https://www.youtube.com/channel/UC1RxV5Vh7-4dF1AFHDJBxcQ"
          ],
          "founder": {
            "@type": "Person",
            "name": "Rameez Javed"
          },
          "areaServed": ["US", "AE", "PK", "Global"],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "info@marqnetworks.com",
              "telephone": "+923338683688",
              "availableLanguage": ["en"]
            }
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.marqnetworks.com/#website",
          "url": "https://www.marqnetworks.com/",
          "name": "MarQ Networks",
          "publisher": {
            "@id": "https://www.marqnetworks.com/#organization"
          },
          "inLanguage": "en"
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
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
            <li className="navbar__dropdown">
          <a href="#" onClick={(e) => {e.preventDefault(); toggleResources();}}>
            Resources {resourcesOpen ? '▲' : '▼'}
          </a>
          <ul className={`navbar__dropdown-menu ${resourcesOpen ? 'navbar__dropdown-menu--active' : ''}`}>
            <li><a href="/qr-code-scanner">QR Scanner</a></li>
            <li><a href="/qr-generator">QR Generator</a></li>
            <li><a href="/link-shortener">Link Shortener</a></li>
          </ul>
        </li>
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
