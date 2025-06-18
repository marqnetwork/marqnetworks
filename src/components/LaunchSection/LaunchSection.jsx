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
        {/* Tag */}
        <span className="launch__tag">• Launch Your Site</span>

        {/* Animated Headline */}
        <motion.h2 className="launch__headline" {...motionSettings}>
          Trusted Launch Partner <br />
          <span>For Startups And Agencies</span>
        </motion.h2>

        {/* Description */}
        <p className="launch__description">
          We fast-track your digital launch—from strategy and design to code and <br />
          growth—so you’re live in weeks, not months.
        </p>

        {/* CTA */}
        <div className="launch__actions">
          <MarqButton className="launch__button" />
        </div>

        {/* Decorative Images */}
        <div className="launch__svg-wrapper">
          <img
            src="/images/resultleft.png"
            alt="Decorative Left Graphic"
            className="launch__svg launch__svg--left"
            loading="lazy"
          />
          <img
            src="/images/resultright.png"
            alt="Decorative Right Graphic"
            className="launch__svg launch__svg--right"
            loading="lazy"
          />
        </div>

        {/* Image Slider */}
        <ImageSlider />
      </div>
    </section>
  );
};

export default LaunchSection;
