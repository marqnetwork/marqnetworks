'use client';

import React from "react";
import "./Footer.css";
// import MarqButton from "../MarqButton/MarqButton";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="footer_content">
        <div className="footer__top">
          {/* Left */}
          <div className="footer__column">
            <img
              src="/images/logo.png"
              alt="MarQ Networks logo—AI-driven digital growth partner for visionary brands"
              className="footer__logo"
            />
            <h2 className="footer__headline">
              Made remotely, delivered globally. Powered by relentless curiosity.
            </h2>
            <p className="text_footer">
              Operating 24/7 from our EST-aligned off-shore hub and US/GCC
              leadership teams
            </p>
            <div className="footer__subscribe">
              <input
                type="email"
                placeholder="Your work e-mail…"
                autoComplete="off"
              />
              
              <button className="submit">Submit</button>
              <Link href="/digital-growth-solutions#consultancy" className="footer__link-pillars">
    Explore MarQ Consultancy
  </Link>
            </div>
          </div>

          {/* Middle */}
          <div className="new_div">
          <div className="footer__column footer__middle">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about-digital-growth-agency">About</a></li>
              <li><a href="/digital-growth-solutions">Solution</a></li>
              <li><a href="/project-case-studies">Portfolio</a></li>
              <li><a href="/blog">Blogs</a></li>
              <li><a href="/contact-marq-networks">Contact</a></li>
            </ul>
          </div>

          {/* Right */}
          <div className="footer__column footer__right">
            <div className="footer__right-top">
              <div className="footer__social-sales">
                <h4>Social</h4>
                <ul>
  <li>
    <a href="http://linkedin.com/company/marqnetwork" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </li>
  <li>
    <a href="https://x.com/MarqNetworks" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
  </li>
  <li>
    <a href="https://www.instagram.com/marqnetworksofficial" target="_blank" rel="noopener noreferrer">Instagram</a>
  </li>
  <li>
    <a href="https://www.youtube.com/channel/UC1RxV5Vh7-4dF1AFHDJBxcQ" target="_blank" rel="noopener noreferrer">Youtube</a>
  </li>
</ul>

              </div>

              {/* <div className="footer__video-wrapper">
                <div className="footer__sales">Sales – 7,360,109</div>
                <div className="video__container"></div>
              </div> */}
            </div>
          </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 marQ Networks. All rights reserved. </p>
          <div className="footer__links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
