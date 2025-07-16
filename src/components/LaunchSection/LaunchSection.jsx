"use client";

import React from "react";
import "./LaunchSection.css";
import { motion } from "framer-motion";
import ImageSlider from "../ImageSlider/ImageSlider";
import MarqButton from "../MarqButton/MarqButton";

const motionSettings = {
  initial: { x: -20, opacity: 0.6, filter: "blur(4px)" },
  whileInView: { x: 0, opacity: 1, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: "easeOut" },
  viewport: { once: true, amount: 0.5 },
};

const LaunchSection = () => {
  return (
    <section className="launch">
      <div className="launch__content">
        {/* Label */}
        <span className="launch__tag">• Launch Your Site</span>

        {/* Heading */}
        <motion.h2 className="launch__headline" {...motionSettings}>
          Trusted AI Launch Partner <br />
          <span>for Startups & Agencies</span>
        </motion.h2>

        {/* Subheading */}
        <p className="launch__description">
           We fast-track your digital launch—from AI workflow  transformation strategy and 
          conversion-focused <br /> design to headless e-commerce code and growth—so you’re live in weeks, not months.
        </p>

        {/* CTA Button */}
        <div className="launch__actions">
          <MarqButton className="launch__button" />
        </div>

        {/* Decorative SVGs */}
        <div className="launch__svg-wrapper">
          <img
            src="/images/resultleft.png"
            alt="Abstract dark green diagonal shape with curved top-left corner"
            className="launch__svg launch__svg--left"
            loading="lazy"
          />
          <img
            src="/images/resultright.png"
            alt="Abstract dark green diagonal shape with curved top-right corner"
            className="launch__svg launch__svg--right"
            loading="lazy"
          />
        </div>

        {/* Slider Component */}
        <ImageSlider />
      </div>
    </section>
  );
};

export default LaunchSection;
