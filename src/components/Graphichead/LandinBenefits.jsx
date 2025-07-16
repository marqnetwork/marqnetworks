"use client";

import React from "react";
import "../Mobilehead/LandinBenefits.css";
import { motion } from "framer-motion";

const tags = [
  "Conversion-Focused Flyers",
  "Full Brand & UX Kits",
  "Print-Ready CMYK Proofs",
  "AI Heatmap-Tested Layouts",
  "Cross-Channel Headless Assets",
  "Color-True Proofs",
  "White-Label Friendly",
  "DAM Asset Handoff",
  "AI-Ready E-Books"
];




const LandinBenefits = () => {
  return (
    <section className="mobile-benefits">
      <div className="mobile-benefits__label">• MarQ Brand Collateral

</div>

      <motion.h1
        className="mobile-benefits__title"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>From Pixels to Paper</span> <span>We Build AI-Ready Brands You Can Hold.</span>
      </motion.h1>

      <h2 className="mobile-benefits__subtitle">
         Business cards to billboards, every AI heatmap-tested touchpoint stays unmistakably you.
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
