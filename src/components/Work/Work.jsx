"use client";

import React, { useRef } from "react";
import "./Work.css";
import { motion, useScroll, useTransform } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";

const steps = [
  {
    title: "Kickoff",
    subtitle: "Stage 1",
    desc:
      "Deep-dive workshop to unpack goals, users, budget, and KPIs—powered by AI workflow transformation services. Includes competitive audit, quick-win matrix, and a 90-day go-to-market roadmap with timelines & owners.",
    icon: "/images/Kickoff.png",
    actions: [
      "✔ Crystal-clear scope",
      "✔ Fixed milestones & cost",
      "✔ Slack/ClickUp access on Day 1"
    ]
  },
  {
    title: "Execution",
    subtitle: "Stage 2",
    desc:
      "Design, build, and iterate in agile sprints—fuelled by an AI code assistant and AI performance optimization for web applications to deliver production-ready features fast.",
    icon: "/images/Execution.png",
    actions: [
      "✔ Agile sprints",
      "✔ Real-time updates",
      "✔ Continuous optimization"
    ]
  },
  {
    title: "Launch & Handoff",
    subtitle: "Stage 3",
    desc:
      "One-click deploy to your stack (AWS, Vercel, Shopify, HubSpot) plus lead generation services for B2B playbooks, hand-over call, and 30-day AI-powered CRM automation support.",
    icon: "/images/Handoff.png",
    actions: [
      "✔ Stress-free go-live",
      "✔ You own 100 % of IP & files",
      "✔ Optional growth retainer"
    ]
  },
  {
    title: "Result",
    subtitle: "Stage 4",
    desc:
      "Most MarQ projects launch within 45 days—saving clients 40 % in cost and months in opportunity loss, all under the guidance of growth strategy consultants.",
    icon: "/images/resultt.png",
    actions: [
      "✔ 45-day delivery",
      "✔ 40 % cost saving",
      "✔ Faster time to market"
    ]
  }
];

// Reusable animation config
const fadeIn = {
  initial: { x: -20, opacity: 0.6, filter: "blur(4px)" },
  whileInView: { x: 0, opacity: 1, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: "easeOut" },
  viewport: { once: true, amount: 0.5 }
};

const Work = () => {
  const containerRef = useRef(null);

  return (
    <section className="work" ref={containerRef} aria-labelledby="work-title">
      {/* Left Content */}
      <div className="work__left">
        <span className="work__tag">• How We Work?</span>

        <motion.h2 className="work__headline" id="work-title" {...fadeIn}>
          We Streamline <br /> Every Step <br />
          <span>From Idea to Impact</span>
        </motion.h2>

        <motion.p className="work__description" {...fadeIn}>
        We’ve battle-tested a three-stage AI workflow transformation framework that eliminates guesswork, keeps you in the loop, and gets your product to market faster.
        </motion.p>

        {/* Steps Section */}
        <div className="work__steps">
          {steps.map((step, index) => {
            const cardRef = useRef(null);
            const { scrollYProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "end start"]
            });

            const scale = useTransform(scrollYProgress, [0, 0.7, 0.6], [0.95, 1.05, 0.95]);

            return (
              <motion.div
                key={step.title}
                ref={cardRef}
                className="step-card"
                style={{ scale }}
              >
                <div className="step-card__top">
                  <div className="step-card__icon">
                    <img src={step.icon} alt={`${step.title} Icon`} />
                  </div>
                  <span className="step-card__badge">{step.subtitle}</span>
                </div>

                <h3 className="step-card__title">{step.title}</h3>
                <div className="about__divider" />
                <p className="step-card__desc">{step.desc}</p>

                <div className="step-card__actions">
                  {step.actions.map((action, i) => (
                    <span key={i} className="step-card__action">
                      {action}
                    </span>
                  ))}
                </div>

                {index === steps.length - 1 && (
                  <MarqButton className="work__cta-button"  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Image */}
      <div className="work__right">
        <img src="/images/work.png" alt="Founder-focused execution path—every step mapped from idea to launch with clarity and speed" />
      </div>
    </section>
  );
};

export default Work;
