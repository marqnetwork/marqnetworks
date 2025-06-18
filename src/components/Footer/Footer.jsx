import React from "react";
import "./Footer.css";
import MarqButton from "../MarqButton/MarqButton";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="footer_content">
        <div className="flex justify-between w-full gap-10 footer__top">
          {/* Left */}
          <div className="w-[40%] ">
            <img
              src="/images/logo.png"
              alt="marqnetworks logo"
              className="footer__logo"
            />
            <p>
              Made remotely, delivered globally Powered by relentless curiosity
            </p>
            <p>
              Operating 24/7 from our EST-aligned off-shore hub and US/GCC
              leadership teams
            </p>
            <div className="footer__subscribe">
              <input
                type="email"
                placeholder="Your work e-mail…"
                autoComplete="off"
              />
              {/* <button>Keep Me in the Loop</button> */}
              <MarqButton />
            </div>
          </div>
          {/* <div className="footer__left"></div> */}

          {/* Middle */}
          <div className="footer__middle">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Solution</li>
              <li>Portfolio</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Right */}
          <div className="footer__right">
            <div className="footer__right-top">
              <div className="footer__social-sales">
                <h4>Social</h4>
                <ul>
                  <li>LinkedIn</li>
                  <li>X (Twitter)</li>
                  <li>Instagram</li>
                  <li>Youtube</li>
                </ul>
              </div>

              <div className="footer__video-wrapper">
                <div className="footer__sales">Sales – 7,360,109</div>
                <div className="video__container"></div>
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
