"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";

const steps = [
  {
    title: "AI-Powered Hyper-Personalization",
    desc:
      "AI-powered CRM automation workflows analyze behavior, location, and intent—serving the perfect message across channels in real time.",
    icon: "/images/hyper.png",
    iconAlt:
      "Green circle icon with a stylized arrow encircling a dot, symbolizing dynamic AI personalization.",
    image: "/images/p10.png",
    imageAlt:
      "Futuristic human head with digital interface, charts, and a glowing dot—illustrating AI-driven hyper-personalization."
  },
  {
    title: "Predictive Lead Scoring & Funnel Control",
    desc:
      "AI predictive lead scoring via CRM pinpoints your best prospects, while AI funnel optimization with predictive modeling slashes CAC.",
    icon: "/images/lead.png",
    iconAlt:
      "Green circle icon with vertical bar chart, symbolizing analytics and funnel performance tracking.",
    image: "/images/p11.png",
    imageAlt:
      "AI chip connected to user icons and a glowing funnel diagram, visualizing automated lead scoring and conversion tracking."
  },
  {
    title: "Marketing Without Guesswork",
    desc:
      "Lead generation services for B2B learn daily—using AI email subject-line generators and adaptive content to outperform yesterday’s results.",
    icon: "/images/market.png",
    iconAlt:
      "Green circle icon with a white megaphone, representing AI-powered marketing and campaign messaging.",
    image: "/images/p12.png",
    imageAlt:
      "Neon green AI symbol in front of a bar graph and pie chart, with data points and trend lines showing adaptive marketing insights."
  }
];


const Pillar4 = () => {
  return (
    <section className="solution-pillars">
      <div className="solution-pillars__right">
        <img src="/images/4.png" alt="MarQ growth team reviewing organic traffic, sales metrics, and funnel data to optimize lead gen" />
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
           Align teams, de-risk spend, and launch initiatives with an AI-powered CRM automation roadmap—live in 90 days.
        </p>

        <ul className="solution-pillars__list">
           <li>SEO, paid ads, social & AI email subject-line generators</li>
  <li>AI-powered CRM automation & nurture flows</li>
  <li>AI predictive lead scoring & workflow-transformation automations</li>
  <li>Data dashboards, funnel optimisation & predictive analytics</li>
        </ul>

        <div className="solution-pillars__cta-row">
          <MarqButton className="solution-pillars__cta-button" />
          <img src="/images/piller4logo.png" alt="MarQ Growth Pod logo—your partner for B2B lead generation and performance marketing" className="cta-logo" />
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
    </section>
  );
};

export default Pillar4;
