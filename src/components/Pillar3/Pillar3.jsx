"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";
import MarqButton from '../MarqButton/MarqButton';

const steps = [
  {
    title: "AI Code That Thinks Ahead",
    desc:
      "An AI code assistant writes, reviews, and optimises code—detecting bugs and inefficiencies before they ship with AI performance optimisation for web applications.",
    icon: "/images/code.png",
    iconAlt:
      "Green circle icon with double angle brackets, representing coding and forward-thinking development.",
    image: "/images/p7.png",
    imageAlt:
      "Futuristic hand interacting with glowing code on a digital screen, depicting AI-assisted coding and bug detection."
  },
  {
    title: "Smart Integrations & Automation",
    desc:
      "We wire headless e-commerce code, AI-powered CRM automation workflows, and voice assistants into learning loops—so every workflow adapts in real time.",
    icon: "/images/smart.png",
    iconAlt:
      "Green circle icon with connected nodes symbolizing automation and smart system integrations.",
    image: "/images/p8.png",
    imageAlt:
      "Digital robot face beside glowing icons for AI, microphone, and cloud, representing smart integrations and automation."
  },
  {
    title: "Self-Evolving Platforms",
    desc:
      "Guided by growth-strategy consultants, your systems launch with AI workflow transformation built-in—learning, adapting, and scaling without guesswork.",
    icon: "/images/soft.png",
    iconAlt:
      "Green circle icon with a gear and circuit design, symbolizing intelligent platform evolution.",
    image: "/images/p9.png",
    imageAlt:
      "Digital tree growing from a circuit board beside a glowing cube, illustrating self-evolving AI platforms."
  }
];


const Pillar3 = () => {
  return (
    <section className="solution-pillars">
      <div className="solution-pillars__left">
        <span className="solution-pillars__tag">• Pillar 03</span>

        <motion.h2
          className="solution-pillars__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Custom Software & Automation
        </motion.h2>

        <p className="solution-pillars__description">
           Align teams, de-risk spend, and launch initiatives with an AI code-assistant-powered 90-day execution map.
        </p>

        <ul className="solution-pillars__list">
            <li>API, ERP & CRM integrations</li>
  <li>Headless e-commerce code</li>
  <li>AI code assistant & RPA automation</li>
  <li>Cloud migration + AI performance optimisation</li>
  <li>Funnel architecture & predictive CRO</li>
        </ul>

        <div className="solution-pillars__cta-row">
          <MarqButton className="solution-pillars__cta-button" />
          <img src="/images/piller3logo.png" alt="MarQ Software House logo—your partner for custom software, DevOps, and AI automation" className="cta-logo" />
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
        <img src="/images/3.png" alt="Enterprise leaders aligning on CRM and AI automation strategy during a MarQ software delivery sprint" />
      </div>
    </section>
  );
};

export default Pillar3;
