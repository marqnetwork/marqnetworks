"use client";

import React from "react";
import "./FeatureSection.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";

// Animation config
const fadeInLeft = {
  initial: { x: -20, opacity: 0.6, filter: "blur(4px)" },
  whileInView: { x: 0, opacity: 1, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: "easeOut" },
  viewport: { once: true, amount: 0.5 }
};

const FeatureSection = () => {
  return (
    <section className="feature" aria-labelledby="feature-heading">
      <div className="feature__content">
        <span className="feature__tag">• Features</span>

        <motion.h2
          className="feature__headline"
          id="feature-heading"
          initial={fadeInLeft.initial}
          whileInView={fadeInLeft.whileInView}
          transition={fadeInLeft.transition}
          viewport={fadeInLeft.viewport}
        >
          Unlimited AI-Powered Design Features,<br />
          <span>Delivered Instantly!</span>
        </motion.h2>

        <p className="feature__description">
          Six conversion-focused power-ups turn every MarQ Networks<br />
          project into measurable growth.
        </p>

        <div className="feature__actions">
          <MarqButton className="feature__button" />
        </div>
      </div>

      {/* Decorative SVGs */}
      <div className="feature__svg-wrapper" aria-hidden="true">
        <img
          src="/images/resultleft.png"
          alt="Abstract dark green diagonal shape with curved top-left corner"
          className="feature__svg feature__svg--left"
          loading="lazy"
          width="300"
          height="auto"
        />
        <img
          src="/images/resultright.png"
          alt="Abstract dark green diagonal shape with curved top-right corner"
          className="feature__svg feature__svg--right"
          loading="lazy"
          width="300"
          height="auto"
        />
      </div>
    </section>
  );
};

export default FeatureSection;
