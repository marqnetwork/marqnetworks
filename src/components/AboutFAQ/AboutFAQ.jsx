"use client";
import React, { useState } from "react";
import "../FAQSection/FAQSection.css";

const faqs = [
  {
    question: "Will I be dealing with an overseas team only?",
    answer:
      "No. You get a hybrid squad: senior consultants in the USA & GCC for strategy/oversight plus our Off-Shore Excellence Hub for 24/7 production—one Slack channel, one PM.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Our 45-Day Go-Live Pledge covers most web / funnel / app scopes. A signed roadmap sets the date; automated QA & peer-reviews keep us on track.",
  },
  {
    question: "What ROI can I realistically expect?",
    answer:
      "We define success metrics up-front (leads, conversion %, cost-per-acquisition). Average clients hit a 30–50% uplift in 90 days—backed by data dashboards you can check any time.",
  },
  {
    question: "How do you keep my data secure?",
    answer:
      "marQ follows SOC-2–aligned checklists, encrypted repos, role-based access, and Fed-contractor controls. Zero incidents since launch.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project rolls into 30-day optimisation sprints—A/B tweaks, new features, growth loops—so the product compounds results, not collects dust.",
  },
  {
    question: "Is marQ more expensive than hiring in-house?",
    answer:
      "You get a full 360° stack (strategy, design, code, growth) for 30–40% less than piecing together freelancers or FTEs—without the HR overhead or skill gaps.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq__section">
      {/* Left Column - Intro */}
      <div className="faq__intro">
        <span className="faq__tag">• How We Work?</span>
        <h2 className="faq__headline">
          Frequently<br />
          <span>Asked Questions</span>
        </h2>
        <p className="faq__description">
          Have questions? Our FAQ section has you covered with quick answers
          to the most common inquiries.
        </p>
      </div>

      {/* Right Column - Accordion */}
      <div className="faq__list">
        {faqs.map(({ question, answer }, index) => (
          <div
            key={index}
            className={`faq__item ${activeIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleFAQ(index);
            }}
          >
            <div className="faq__question">
              <span>{question}</span>
              <span className="faq__icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq__answer">{answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
