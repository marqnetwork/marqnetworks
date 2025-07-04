"use client";

import React from "react";
import "./LandinBenefits.css";
import { motion } from "framer-motion";
import Link from "next/link";

const benefitTags = [
 "Built-In Wins",
  "Conversion-Focused UI / UX",
  "Lightning-Fast Core Web Vitals",
  "AI-Ready Content Blocks",
  "SEO & Schema Optimised",
  "WordPress / Headless / Next.js",
  "Secure, GDPR / CCPA Compliant",
  "CRM + Funnel Integration",
  "45-Day Launch Guarantee"
];


const LandinBenefits = () => {
  return (
    <section className="benefits__section">
      <div className="benefits__label">• MarQ Websites</div>

      <motion.h1
        className="benefits__heading"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>We Don’t Just Code</span> <span>We Craft Revenue Engines.</span>
      </motion.h1>

      <h2 className="benefits__subheading">
       From first click to final checkout, your site works 24/7 so you don’t have to.
      </h2>

      <div className="benefits__tags">
        {benefitTags.map((tag, index) => (
          <span key={index} className="benefit__tag">
            {tag}
          </span>
        ))}

        
      </div>
    </section>
  );
};

export default LandinBenefits;
