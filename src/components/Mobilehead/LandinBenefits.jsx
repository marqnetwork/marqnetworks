"use client";

import React from "react";
import "./LandinBenefits.css";
import { motion } from "framer-motion";

const tags = [
  "AI-Powered UX",
  "Conversion-Focused UI",
  "Predictive Lead Scoring",
  "Headless E-Commerce Ready",
  "AI Performance Optimization",
  "SOC-2 Secure Compliance",
  "Listing Analytics + CRM Integration",
  "Future-Proof Code (React Native / Flutter)"
];

const LandinBenefits = () => {
  return (
    <section className="mobile-benefits">
      <div className="mobile-benefits__label">• MarQ Mobile Apps</div>

      <motion.h1
        className="mobile-benefits__title"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>We Don’t Just Design</span> <span>We Engineer AI-Powered Momentum.</span>
      </motion.h1>

      <h2 className="mobile-benefits__subtitle">
        If you can dream it, our AI-powered UX will make the app that moves the needle.
      </h2>

      <div className="mobile-benefits__tags">
        {tags.map((tag, index) => (
          <span key={index} className="mobile-benefits__tag">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default LandinBenefits;
