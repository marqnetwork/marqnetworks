"use client";

import React from "react";
import "./LandinBenefits.css";
import { motion } from "framer-motion";
import Link from "next/link";

const benefitTags = [
  "AI-Powered UX",
  "Conversion-Focused",
  "Lightning-Fast Loading",
  "SEO-Ready",
  "Headless Customizable",
  "Scalable Architecture",
  "High Engagement",
  "Predictive Lead Scoring",
  "Secure Compliance",
  "User-Friendly"
];


const LandinBenefits = () => {
  return (
    <section className="benefits__section">
      <div className="benefits__label">• MarQ Benefits</div>

      <motion.h1
        className="benefits__heading"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>We Don’t Just Design</span> <span>We Engineer Conversion-Focused Growth.</span>
      </motion.h1>

      <h2 className="benefits__subheading">
        If you can dream it, AI-powered UX will move the needle.
      </h2>

      <div className="benefits__tags">
        {benefitTags.map((tag, index) => (
          <span key={index} className="benefit__tag">
            {tag}
          </span>
        ))}

        <Link href="/Contact" passHref>
          <button className="benefits__cta" aria-label="Contact MarQ Networks">
            Contact Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LandinBenefits;
