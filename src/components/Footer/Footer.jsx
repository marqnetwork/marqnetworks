'use client';

import React from "react";
import "./Footer.css";
import MarqButton from "../MarqButton/MarqButton";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="footer_content">
        <div className="flex justify-between w-full gap-10 footer__top">
          {/* Left */}
          <div className="w-[30%] ">
            <img
              src="/images/logo.png"
              alt="MarQ Networks logo—AI-driven digital growth partner for visionary brands"
              className="footer__logo"
            />
            <h2 className="text-[20px] ">
              Made remotely, delivered globally Powered by relentless curiosity
            </h2>
            <p className="text_footer" >
              Operating 24/7 from our EST-aligned off-shore hub and US/GCC
              leadership teams
            </p>
            <div className="footer__subscribe">
              <input
                type="email"
                placeholder="Your work e-mail…"
                autoComplete="off"
              />
              
              <MarqButton />
            </div>
          </div>
          {/* <div className="footer__left"></div> */}

          {/* Middle */}
          <div className="footer__middle">
            <h4>Quick Links</h4>
           <ul>
  <li><a href="/">Home</a></li>
  <li><a href="/About">About</a></li>
  <li><a href="/Solution">Solution</a></li>
  <li><a href="/Portfolio">Portfolio</a></li>
  <li><a href="/Contact">Contact</a></li>
</ul>

          </div>

          {/* Right */}
          <div className="footer__right">
            <div className="footer__right-top">
              <div className="footer__social-sales">
                <h4>Social</h4>
                <ul>
                  <li>
                    <a href="http://linkedin.com/company/marqnetwork">
                      {" "}
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="https://x.com/MarqNetworks">X (Twitter)</a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/marqnetworksofficial">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UC1RxV5Vh7-4dF1AFHDJBxcQ">
                      Youtube
                    </a>
                  </li>
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
