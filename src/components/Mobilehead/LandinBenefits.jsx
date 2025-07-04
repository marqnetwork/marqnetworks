"use client";

import React from "react";
import "./LandinBenefits.css";
import { motion } from "framer-motion";

const tags = [
  "Faster Time-to-App Store",
  "AI-Driven Personalization",
  "Conversion-Focused UX",
  "Scalable Cloud Back-End",
  "Secure & Compliant",
  "SEO-Ready App Store",
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
        <span>We Don’t Just Design</span> <span>We Engineer Momentum.</span>
      </motion.h1>

      <h2 className="mobile-benefits__subtitle">
        If you can dream it, we’ll make the app that moves the needle.
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
