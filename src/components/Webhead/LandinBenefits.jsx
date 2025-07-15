"use client";

import React from "react";
import "../Mobilehead/LandinBenefits.css";
import { motion } from "framer-motion";

const tags = [
  "Built-In AI Wins",
  "Conversion-Focused UX/UI",
  "AI Performance Optimization",
  "AI-Ready Content Blocks",
  "SEO & Schema Optimized",
  "Headless Ecommerce Next.js",
  "AI-Powered GDPR/SOC-2 Compliance",
  "CRM + Predictive Lead Scoring",
  "45-Day Launch Guarantee"
];



const LandinBenefits = () => {
  return (
    <section className="mobile-benefits">
      <div className="mobile-benefits__label">• MarQ Websites
</div>

      <motion.h1
        className="mobile-benefits__title"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>We Don’t Just Code</span> <span>We Craft AI Revenue Engines.</span>
      </motion.h1>

      <h2 className="mobile-benefits__subtitle">
        From first click to final checkout, our headless, conversion-focused stack sells 24/7 so you don’t have to.
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
