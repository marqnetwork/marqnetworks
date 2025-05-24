"use client";

import React from "react";
import '../../components/SolutionPillars/SolutionPillars.css'
import { motion } from "framer-motion";

const steps = [
  {
    title: "Growth Marketing & GTM Strategy",
    desc: "Launch, test, and scale your product with proven paid, organic, and partnership playbooks.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  },
  {
    title: "Data-Driven Campaigns",
    desc: "We build attribution-ready campaigns across search, social, and outbound channels.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  },
    {
    title: "Data-Driven Campaigns",
    desc: "We build attribution-ready campaigns across search, social, and outbound channels.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  }
];

const Pillar2 = () => {
  return (
    <section className="solution-pillars">
      <div className="solution-pillars__left">
        <span className="solution-pillars__tag">• Pillar 02</span>

        <motion.h2
          className="solution-pillars__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Brand + Experience Design
        </motion.h2>

        <p className="solution-pillars__description">
         Align teams, de-risk spend, and launch initiatives with a proven 90-day execution map.
        </p>

        <ul className="solution-pillars__list">
          <li>UX/UI for web, SaaS, mobile</li>
          <li>High-conversion sites & e-commerce</li>
          <li>Motion, 3-D & interactive content</li>
          <li>Web / mobile / SaaS builds</li>
          <li>Brand identity & guidelines</li>
        </ul>

        <button className="solution-pillars__cta-button">Book an Appointment</button>
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
        <img src="/images/pillar2img.png" alt="Growth Strategy" />
      </div>
    </section>
  );
};

export default Pillar2;
