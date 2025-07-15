import React from "react";
import "./FeatureGridSection.css";

const cards = [
  {
    id: 1,
    icon: "/images/revenue.png",
    name: "Boost Your Revenue",
    label: "Predictive AI Funnels",
    description:
      "AI funnel optimization with predictive modeling adds 20–40% new revenue—no extra ad spend required.",
    pro: true
  },
  {
    id: 2,
    icon: "/images/assets.png",
    name: "Customisable Assets",
    label: "Edit • Re-use • Scale",
    description:
      "Built by headless ecommerce developers—100 % Figma + dev files so you can swap colors, copy, or layouts in minutes and stay on brand.",
    pro: false
  },
  {
    id: 3,
    icon: "/images/bug.png",
    name: "Bug-Free Development",
    label: "AI Code Assistant QA",
    description:
      "Rigorous QA plus an AI code assistant keep your codebase lightning-fast and crash-proof from Day 1.",
    pro: false
  },
  {
    id: 4,
    icon: "/images/award.png",
    name: "Award-Winning Design",
    label: "AI-Powered UX/UI",
    description:
      "Visual systems refined with AI heatmap user testing and AI-powered UX/UI design tools—making your brand impossible to ignore.",
    pro: false
  },
  {
    id: 5,
    icon: "/images/fastdev.png",
    name: "Lightning-Fast Delivery",
    label: "AI Workflow Speed",
    description:
      "AI workflow transformation services compress task turnaround to 2–3 biz days—launch campaigns while others are still mocking up.",
    pro: true
  },
  {
    id: 6,
    icon: "/images/mobile.png",
    name: "Mobile-First Builds",
    label: "Performance Optimised",
    description:
      "AI performance optimization for web applications boosts mobile conversions by up to 35 % across every device.",
    pro: false
  }
];


const FeatureGridSection = () => {
  return (
    <section className="feature__section">
      <div className="feature__grid">
        {cards.map(({ id, icon, name, label, description, pro }) => (
          <div key={id} className="feature__card">
            <div className="feature__top">
              <img src={icon} alt={name} className="feature__icon" />
              <span className="feature__arrow">↗</span>
            </div>

            <div className="feature__title">
              <h4>{name}</h4>
              {pro && <span className="feature__badge">PRO</span>}
            </div>

            <p className="feature__label">{label}</p>
            <div className="about__divider" />
            <p className="feature__desc">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGridSection;
