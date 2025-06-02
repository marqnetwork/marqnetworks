"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";
import MarqButton from '../MarqButton/MarqButton'

const steps = [
  {
    title: "AI Tools & Assistants",
    desc: "We build internal and customer-facing AI agents that automate decisions, support, and creation.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  },
  {
    title: "Automation Workflows",
    desc: "Streamline ops with backend bots, Zapier/Make integrations, and custom APIs.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  },
   {
    title: "Automation Workflows",
    desc: "Streamline ops with backend bots, Zapier/Make integrations, and custom APIs.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  }
];

const Pillar5 = () => {
  return (
    <section className="solution-pillars">
      <div className="solution-pillars__left">
        <span className="solution-pillars__tag">• Pillar 05</span>

        <motion.h2
          className="solution-pillars__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Off-Shore Excellence Hub (operating model)
        </motion.h2>

        <p className="solution-pillars__description">
          Align teams, de-risk spend, and launch initiatives with a proven 90-day execution map.
        </p>

      <ul className="solution-pillars__list">
  <li>EST-aligned project manager</li>
  <li>24/7 design / dev velocity</li>
  <li>Flat-rate or fixed-bid pods</li>
  <li>45-day website guarantee</li>
</ul>


        
        <MarqButton className="solution-pillars__cta-button"/>
        <p className="solution-pillars__footer">MarQ Consultancy</p>

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

      <div className="solution-pillars__right">
        <img src="/images/pillar5img.png" alt="AI & Automation" />
      </div>
    </section>
  );
};

export default Pillar5;
