"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";

const steps = [
  {
    title: "Hyper-Personalization at Scale",
    desc: "Our AI analyzes user behavior, location, and intent to serve the perfect message—across channels, in real time.",
    icon: "/images/hyper.png",
    image: "/images/p10.png",
  },
  {
    title: "Predictive Lead Scoring & Funnel Control",
    desc: "Know exactly who converts next. AI prioritizes your best leads and auto-optimizes funnel paths to reduce CAC.",
    icon: "/images/lead.png",
    image: "/images/p11.png",
  },
  {
    title: "Revolution: Marketing Without Guessing",
    desc: "Forget A/B testing fatigue. Your campaigns learn daily, adapt hourly, and outperform historically.",
    icon: "/images/market.png",
    image: "/images/p12.png",
  },
];

const Pillar4 = () => {
  return (
    <section className="solution-pillars">
      <div className="solution-pillars__right">
        <img src="/images/4.png" alt="UX Design Strategy" />
      </div>
      <div className="solution-pillars__left">
        <span className="solution-pillars__tag">• Pillar 04</span>

        <motion.h2
          className="solution-pillars__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Growth Marketing & Lead Gen
        </motion.h2>

        <p className="solution-pillars__description">
          Align teams, de-risk spend, and launch initiatives with a proven
          90-day execution map.
        </p>

        <ul className="solution-pillars__list">
          <li>SEO, paid ads, social & email</li>
          <li>CRM setup + nurture</li>
          <li>A1 & workflow transformation automations</li>
          <li>Data dashboards & analytics</li>
        </ul>
<div className="flex items-center justify-between">
        <MarqButton className="solution-pillars__cta-button" />
        <img src="/images/piller4logo.png" alt="logo" className="cta-logo" />
</div>
        <div className="solution-pillars__cards">
          {steps.map((step, index) => (
            <div className="pillar-card" key={index}>
              <div className="pillar-card__header">
                <img src={step.icon} alt="icon" className="pillar-card__icon" />
                <span className="pillar-card__arrow">↗</span>
              </div>

              <div className="pillar-card__body">
                <h3 className="pillar-card__title">{step.title}</h3>
                <p className="pillar-card__desc">{step.desc}</p>
              </div>

              <div className="pillar-card__image-container">
                <img
                  src={step.image}
                  alt="Pillar Visual"
                  className="pillar-card__image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillar4;
