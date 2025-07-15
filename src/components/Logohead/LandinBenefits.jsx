"use client";

import React from "react";
import "../Mobilehead/LandinBenefits.css";
import { motion } from "framer-motion";
const tags = [
  "AI Instant Recognition",
  "Cross-Platform Headless Ready",
  "AI Variant Testing",
  "Pixel & Vector Perfect",
  "Trademark-Safe",
  "AI Style-Guide Included",
  "Print & Digital Kits"
];




const LandinBenefits = () => {
  return (
    <section className="mobile-benefits">
      <div className="mobile-benefits__label">• Logo Lab

</div>

      <motion.h1
        className="mobile-benefits__title"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>We Don’t Just Sketch Logos</span> <span>We Forge AI Brand DNA.</span>
      </motion.h1>

      <h2 className="mobile-benefits__subtitle">
       From concept sprints to AI variant testing, our Logo Lab crafts timeless, conversion-focused identities built to win trust and own mind-share.
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
