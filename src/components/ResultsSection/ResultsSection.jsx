"use client";

import React from "react";
import "./ResultsSection.css";
import { motion } from "framer-motion";
import InfiniteCardsSlider from "../InfiniteCardsSlider/InfiniteCardsSlider";
import MarqButton from "../MarqButton/MarqButton";

// Animation config outside JSX
const headlineMotion = {
  initial: { x: -20, opacity: 0.6, filter: "blur(4px)" },
  whileInView: { x: 0, opacity: 1, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: "easeOut" },
  viewport: { once: true, amount: 0.5 },
};

const ResultsSection = () => {
  return (
    <section className="results" aria-labelledby="results-heading">
      <div className="results__content">
        <span className="results__tag">• Results</span>

        <motion.h2
          id="results-heading"
          className="results__headline"
          {...headlineMotion}
        >
          Delivering Tangible Results
          <br />
          <span>That Propel Your Success</span>
        </motion.h2>

        <p className="results__description">
          At MarQ Networks, every pixel and line of code is measured by the
          numbers it moves. Here’s a snapshot of brands we’ve elevated—across
          strategy, design, and tech.
        </p>

        <div className="results__actions">
          <MarqButton className="results__button" />
        </div>

        <div className="results__svg-wrapper" aria-hidden="true">
          <img
            src="/images/resultleft.png"
            alt=""
            className="results__svg results__svg--left"
            loading="lazy"
            width="240"
            height="auto"
          />
          <img
            src="/images/resultright.png"
            alt=""
            className="results__svg results__svg--right"
            loading="lazy"
            width="240"
            height="auto"
          />
        </div>

        <InfiniteCardsSlider />
      </div>
    </section>
  );
};

export default ResultsSection;
