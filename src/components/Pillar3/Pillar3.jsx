"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Enterprise-Level Engineering",
    desc: "We deliver scalable web apps, AI tools, and API systems using best-in-class stacks.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  },
  {
    title: "Custom Integrations & DevOps",
    desc: "From backend infra to third-party APIs, we make tech work seamlessly across your ecosystem.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  },
  {
    title: "Custom Integrations & DevOps",
    desc: "From backend infra to third-party APIs, we make tech work seamlessly across your ecosystem.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
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
          Full-Stack Engineering & DevOps
        </motion.h2>

        <p className="solution-pillars__description">
          Build secure, scalable software with AI, custom APIs, and modern infrastructure.
        </p>

        <ul className="solution-pillars__list">
          <li>React & Next.js frameworks</li>
          <li>Custom AI & automation tools</li>
          <li>Backend APIs & database design</li>
          <li>DevOps & cloud architecture</li>
          <li>QA, CI/CD & performance tuning</li>
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
        <img src="/images/pillar1img.png" alt="Engineering Strategy" />
      </div>
    </section>
  );
};

export default Pillar3;
