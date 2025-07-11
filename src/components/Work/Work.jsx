"use client";

import React, { useRef } from "react";
import "./Work.css";
import { motion, useScroll, useTransform } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";

const steps = [
  {
    title: "Kickoff",
    subtitle: "Stage 1",
    desc: "Deep-dive workshop to unpack goals, users, budget, and KPIs. Includes competitive audit + quick-win matrix and a 90-day execution roadmap with timelines & owners.",
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
    desc: "This is where the magic happens—design, build, and iterate using agile sprints. We collaborate closely with you to translate ideas into reality.",
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
    desc: "We deploy to your preferred stack (AWS, Vercel, Shopify, HubSpot). Includes hand-over call, step-by-step playbooks, and 30-day post-launch support.",
    icon: "/images/Handoff.png",
    actions: [
      "✔ Stress-free go-live",
      "✔ You own 100% of IP & files",
      "✔ Optional growth retainer"
    ]
  },
  {
    title: "Result",
    subtitle: "Stage 4",
    desc: "Most MarQ projects move from kickoff to live launch in ≤ 45 days—saving clients 40% in cost and months in opportunity loss.",
    icon: "/images/resultt.png",
    actions: [
      "✔ 45-day delivery",
      "✔ 40% cost saving",
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
          We’ve battle-tested a three-stage framework that eliminates guesswork,
          keeps you in the loop, and gets your product in market faster.
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
