"use client";

import React from "react";
import "./SolutionPillars.css";
import { motion } from "framer-motion";
import MarqButton from '../MarqButton/MarqButton'

const steps = [
  {
    title: "Predictive Planning, Not Just Projections",
    desc: "Our AI models simulate market shifts and customer behavior to build roadmaps that evolve in real-time—not static documents.",
    icon: "/images/solutionlogo.png",
    image: "/images/p1.png"
  },
  {
    title: "Faster, Sharper Diagnostics",
    desc: "AI audits your funnels, operations, and cost centers to pinpoint leaks, missed revenue, and inefficiencies in days—not months.",
    icon: "/images/solutionlogo.png",
    image: "/images/p2.png"
  },
   {
    title: "Revolution: The End of Guesswork",
    desc: "Strategy becomes science. With every project, we lead clients into a future where data writes the playbook.",
    icon: "/images/solutionlogo.png",
    image: "/images/p3.png"
  }
];

const SolutionPillars = () => {
  return (
    <section className="solution-pillars">
      <div className="solution-pillars__left">
        <span className="solution-pillars__tag">• Pillar 01</span>

        <motion.h2
          className="solution-pillars__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Strategy & Digital Transformation
        </motion.h2>

        <p className="solution-pillars__description">
          Align teams, de-risk spend, and launch initiatives with a proven 90-day execution map.
        </p>

        <ul className="solution-pillars__list">
          <li>Vision & road-mapping</li>
          <li>Tech / security audits</li>
          <li>AI & workflow transformation</li>
          <li>Change-management playbooks</li>
          <li>Brand identity & guidelines</li>
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
        <img src="/images/pillar1img.png" alt="Strategy Meeting" />
      </div>
    </section>
  );
};

export default SolutionPillars;
