"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";
const steps = [
  {
    title: "AI Sprint Automation & Smart Allocation",
    desc:
      "An AI workflow transformation roadmap dynamically adjusts sprint tasks, predicts blockers, and allocates global team members by skill and velocity.",
    icon: "/images/sprintt.png",
    iconAlt:
      "Green circle icon with a white branching node symbol, representing agile sprint management and intelligent team coordination.",
    image: "/images/p13.png",
    imageAlt:
      "Glowing green digital interface showing calendar, location, and AI brain icons—representing smart sprint planning and team task allocation."
  },
  {
    title: "AI-Driven Quality Assurance",
    desc:
      "Every commit, test, and deployment is watched by an AI code assistant with AI performance optimization—catching issues long before humans do.",
    icon: "/images/real.png",
    iconAlt:
      "Green circle icon with branching node symbol representing automated AI workflows and quality monitoring systems.",
    image: "/images/p14.png",
    imageAlt:
      "Green glowing shield icon with the text 'QUALITY ASSURANCE' displayed below, symbolizing AI-driven real-time testing and deployment monitoring."
  },
  {
    title: "Borderless Delivery, One AI Brain",
    desc:
      "Guided by growth-strategy consultants, our global pods use AI workflow transformation services to work ahead of the clock—seamless, smart, and superior.",
    icon: "/images/brain.png",
    iconAlt:
      "Green circular icon with a stylized brain and circuit pattern symbolizing unified AI intelligence for global teamwork.",
    image: "/images/Villa.png",
    imageAlt:
      "Green glowing AI symbol beside a highlighted code command 'generateUserResponse', suggesting smart global automation through code."
  }
];



const Pillar5 = () => {
  return (
    <section className="solution-pillars" id="offshore-excellence">
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
          Align teams, de-risk spend, and launch initiatives with a growth-strategy-consultant-led AI workflow transformation roadmap—live in 90 days.
        </p>

        <ul className="solution-pillars__list">
           <li>EST-aligned growth-strategy PM</li>
  <li>24/7 design / dev velocity via AI workflow transformation</li>
  <li>Flat-rate or fixed-bid pods with 30–40 % cost savings</li>
  <li>45-day website guarantee backed by an AI code assistant</li>
        </ul>

        <div className="solution-pillars__cta-row">
          <MarqButton className="solution-pillars__cta-button" />
          <img src="/images/piller5logo.png" alt="Offshore Excellence Hub logo—MarQ’s global delivery model for rapid, cost-effective execution" className="cta-logo" />
        </div>

        <div className="solution-pillars__cards">
          {steps.map((step, index) => (
            <div className="pillar-card" key={index}>
              <div className="pillar-card__header">
                <img src={step.icon} alt={step.iconAlt} className="pillar-card__icon" />
                <span className="pillar-card__arrow">↗</span>
              </div>

              <div className="pillar-card__body">
                <h3 className="pillar-card__title">{step.title}</h3>
                <p className="pillar-card__desc">{step.desc}</p>
              </div>

              <div className="pillar-card__image-container">
               <img src={step.image} alt={step.imageAlt} className="pillar-card__image" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="solution-pillars__right">
        <img src="/images/5.png" alt="Offshore delivery model optimized for speed, pricing, and 24/7 execution via global delivery pods" />
      </div>
    </section>
  );
};

export default Pillar5;
