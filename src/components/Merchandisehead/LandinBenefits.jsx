"use client";

import React from "react";
import "../Mobilehead/LandinBenefits.css";
import { motion } from "framer-motion";

const tags = [
  "AI Concept-to-Prototype",
  "Photo-Real Mockups",
  "AI-Accelerated CAD",
  "AR/VR Previews",
  "Manufacture-Ready Files",
  "Conversion-Focused Packaging",
  "Marketing Renders",
  "Faster Approvals"
];





const LandinBenefits = () => {
  return (
    <section className="mobile-benefits">
      <div className="mobile-benefits__label">• MarQ Product Studio

</div>

      <motion.h1
        className="mobile-benefits__title"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>We Don’t Just Model</span> <span>We Materialize AI Ideas.</span>
      </motion.h1>

      <h2 className="mobile-benefits__subtitle">
       If you can picture it, our AI concept-to-prototype pipeline turns it into a market-ready product.
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
