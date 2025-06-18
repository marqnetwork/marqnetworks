"use client";

import React from "react";
import "./PortfolioSection.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";
import StackingNewCard from "@/components/StackingCardsNew/stackingnewCard";

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
          <span>That Accelerate Digital Growth.</span>
        </motion.h2>

        {/* Description */}
        <p className="portfolio__description">
          From SaaS scale-ups and e-commerce launches to government-ready solutions,
          each case study proves how our cross-disciplinary team turns complexity
          into measurable results.
        </p>

        {/* Decorative Images */}
        <div className="portfolio__decoration-wrapper">
          <img
            src="/images/resultleft.png"
            alt="Left Decoration"
            className="portfolio__decoration portfolio__decoration--left"
          />
          <img
            src="/images/resultright.png"
            alt="Right Decoration"
            className="portfolio__decoration portfolio__decoration--right"
          />
        </div>

        {/* CTA */}
        <div className="portfolio__actions">
          <MarqButton className="portfolio__button" />
        </div>

        {/* Project Cards */}
        <div className="portfolio__stacking">
          <StackingNewCard />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
