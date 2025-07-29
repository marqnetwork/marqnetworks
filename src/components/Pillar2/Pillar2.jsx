"use client";

import React from "react";
import "../../components/SolutionPillars/SolutionPillars.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";
const steps = [
  {
    title: "AI Heatmap-Optimized Designs",
    desc:
      "With AI heatmap user testing and AI-powered UX/UI design tools, we craft interfaces that self-optimize in real time—adapting automatically to every user touchpoint.",
    icon: "/images/Design.png",
    iconAlt:
      "Green circle icon with a white sparkle or magic wand symbol, representing smart, adaptive design powered by AI.",
    image: "/images/p4.png",
    imageAlt:
      "Neon green wireframe of web UI components with dotted arrows and behavior flow patterns, symbolizing AI-driven adaptive interfaces."
  },
  {
    title: "Generative Branding & 3D Assets",
    desc:
      "Human creativity meets AI-powered UX/UI design tools—producing scalable, conversion-focused design systems and 3-D assets that evolve at the speed of culture.",
    icon: "/images/Generative.png",
    iconAlt:
      "Green circle icon with a white hexagon and intersecting lines, symbolizing structure and generative design systems.",
    image: "/images/p5.png",
    imageAlt:
      "3D-rendered image featuring the text 'Generative Branding 3D' glowing in neon green, surrounded by abstract shapes and gradients."
  },
  {
    title: "Living, Conversion-Focused Brands",
    desc:
      "Forget static style guides—AI heatmap insights turn your visual identity into a living, self-improving brand that drives conversion-focused design at scale.",
    icon: "/images/Revolution.png",
    iconAlt:
      "Green circle icon with two merging shapes, symbolizing transformation and dynamic brand identity.",
    image: "/images/p6.png",
    imageAlt:
      "3D illustration of glowing cubes with dynamic brand logos, showcasing the transformation of brand identity through intelligent design."
  }
];


const Pillar2 = () => {
  return (
    <section className="solution-pillars" id="creative-logics">
      <div className="solution-pillars__right">
        <img src="/images/2.png" alt="Brand + UX team co-creating a high-conversion design system during a UI/UX strategy sprint" />
      </div>

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
           Align teams, de-risk spend, and launch initiatives with a 90-day, conversion-focused, AI-powered UX roadmap.
        </p>

        <ul className="solution-pillars__list">
           <li>AI-powered UX/UI for web, SaaS & mobile</li>
  <li>Conversion-focused websites & headless e-commerce</li>
  <li>Motion, 3-D & interactive content with AI heatmap insights</li>
  <li>Web / mobile / SaaS builds optimised by an AI code assistant</li>
  <li>Brand identity & guidelines validated by AI heatmap user testing</li>
        </ul>

        <div className="solution-pillars__cta-row">
          <MarqButton className="solution-pillars__cta-button" />
          <img src="/images/piller2logo.png" alt="MarQ Creative Logics logo—your branding agency for tech and startup innovation" className="cta-logo" />
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

export default Pillar2;
