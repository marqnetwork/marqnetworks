"use client";

import React from "react";
import "./PortfolioSection.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";


const PortfolioSection = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        {/* Tag Line */}
        <span className="portfolio__tag">• Portfolio</span>

        {/* Headline */}
        <motion.h2
          className="portfolio__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Our Selected Projects
          <br />
          <span>That Accelerate AI-Driven Digital Growth.</span>
        </motion.h2>

        {/* Description */}
        <p className="portfolio__description">
            From SaaS scale-ups and headless e-commerce launches to government-ready AI workflow transformations,
  each case study proves how our cross-disciplinary team turns complexity into measurable results.
        </p>

        {/* Decorative Images */}
        <div className="portfolio__decoration-wrapper" aria-hidden="true">
          <img
            src="/images/resultleft.png"
            alt="Abstract dark green diagonal shape with curved top-left corner"
            className="portfolio__decoration portfolio__decoration--left"
          />
          <img
            src="/images/resultright.png"
            alt="Abstract dark green diagonal shape with curved top-right corner"
            className="portfolio__decoration portfolio__decoration--right"
          />
        </div>

        {/* CTA */}
        <div className="portfolio__actions">
          <MarqButton className="portfolio__button" />
        </div>

        
      </div>
    </section>
  );
};

export default PortfolioSection;
