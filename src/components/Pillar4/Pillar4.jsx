"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";

const steps = [
  {
    title: "User-Centered Design",
    desc: "Craft delightful experiences with user flows, wireframes, and component libraries.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  },
  {
    title: "Product-Led Growth Assets",
    desc: "We turn insights into high-converting UIs, landing pages, and onboarding flows.",
    icon: "/images/solutionlogo.png",
    image: "/images/Villa.png"
  }
];

const Pillar4 = () => {
  return (
    <section className="solution-pillars">
      <div className="solution-pillars__left">
        <span className="solution-pillars__tag">• Pillar 04</span>

        <motion.h2
          className="solution-pillars__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Product & UX Design
        </motion.h2>

        <p className="solution-pillars__description">
          We bring design systems, data, and behavioral science together to create experiences people love.
        </p>

        <ul className="solution-pillars__list">
          <li>UX audits & research</li>
          <li>Design systems & wireframes</li>
          <li>Conversion-focused landing pages</li>
          <li>Prototyping & motion design</li>
          <li>Onboarding & growth flows</li>
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
        <img src="/images/pillar1img.png" alt="UX Design Strategy" />
      </div>
    </section>
  );
};

export default Pillar4;
