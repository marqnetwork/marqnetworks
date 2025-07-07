"use client";

import React from "react";
import "../Mobilehead/LandinBenefits.css";
import { motion } from "framer-motion";

const tags = [
  "Strategic Content Calendars",
  "On-Brand Reels, Shorts & Carousels",
  "AI-Driven Topic & Trend Mining",
  "Paid-Ad Funnel Alignment",
  "LinkedIn + IG + TikTok Specialists",
  "Community Management & Support",
  "CRM & Email List Sync",
  "Real-Time Analytics Dashboards"
];



const LandinBenefits = () => {
  return (
    <section className="mobile-benefits">
      <div className="mobile-benefits__label">• MarQ Social Media

</div>

      <motion.h1
        className="mobile-benefits__title"
        initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span>We Don’t Just Post</span> <span>We Ignite Conversations.</span>
      </motion.h1>

      <h2 className="mobile-benefits__subtitle">
        Turn every scroll into a story, every like into lasting revenue.
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
