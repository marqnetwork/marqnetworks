"use client";
import React, { useState } from "react";
import "../FAQSection/FAQSection.css";

const faqs = [
  {
    question: "Will I be dealing with an overseas team only?",
    answer:
      "No. You get a hybrid squad: senior growth-strategy consultants in the USA & GCC for oversight plus our Off-Shore Excellence Hub—powered by AI workflow transformation services—for 24/7 production through one Slack channel and one PM."
  },
  {
    question: "How fast can we launch?",
    answer:
      "Our 45-Day Go-Live Pledge—driven by an AI workflow transformation roadmap, an AI code assistant, and automated QA—covers most web / funnel / app scopes. A signed roadmap sets the date; peer reviews keep us on track."
  },
  {
    question: "What ROI can I realistically expect?",
    answer:
      "We define success metrics up-front (leads, conversion %, cost-per-acquisition). Thanks to AI-powered CRM automation workflows and conversion-focused design, clients average a 30–50 % uplift in 90 days—visible in real-time dashboards."
  },
  {
    question: "How do you keep my data secure?",
    answer:
      "MarQ runs AI-powered GDPR/SOC-2 compliance automation, encrypted repos, role-based access, and Fed-contractor controls—zero incidents since launch."
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project moves into 30-day optimisation sprints—A/B tweaks, predictive lead scoring, and new features—so the product compounds results instead of collecting dust."
  },
  {
    question: "Is marQ more expensive than hiring in-house?",
    answer:
      "You get a full 360° AI stack—strategy, conversion-focused design, headless e-commerce code, and growth—for 30–40 % less than piecing together freelancers or FTEs, minus HR overhead and skill gaps."
  }
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
