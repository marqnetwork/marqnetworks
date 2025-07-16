"use client";
import React, { useState } from 'react';
import '../FAQSection/FAQSection.css';

const faqs = [
  {
    question: "Will I have a U.S.-based point of contact, or only an offshore team?",
    answer:
      "Both. A senior growth-strategy consultant in the U.S. leads strategy, while our 24/7 Off-Shore Excellence Hub—powered by AI workflow transformation services—handles production in a single Slack channel, no hand-off gaps."
  },
  {
    question: "How does the 45-day Launch Guarantee actually work?",
    answer:
      "We time-box design + dev sprints, use an AI code assistant and automated QA daily. Miss the 45-day live date? You receive a 15 % credit—no fine print."
  },
  {
    question: "What kind of ROI can I expect vs. hiring an in-house crew?",
    answer:
      "Clients typically save 30–50 % on build costs and ship 2× faster. GA Tax Lien Boot Camp used AI-powered CRM automation workflows to net 400 webinar leads in 15 days; Excelus hit 0 data incidents at half the usual spend."
  },
  {
    question: "How do you keep our data and IP secure?",
    answer:
      "AI-powered GDPR/SOC-2 compliance automation, encrypted repos, Fed-contractor controls, and NDAs for every sprint member. Zero security incidents since 2014."
  },
  {
    question: "Can we start small and scale later?",
    answer:
      "Absolutely. Engage one studio—say, headless e-commerce code from MarQ Software House—or plug into the full 360° stack as you grow. Same PM, one contract."
  },
  {
    question: "What happens after launch—do you disappear?",
    answer:
      "Never. We book 30-day optimisation cycles by default: data review → predictive lead-scoring backlog → next sprint. That’s how results keep compounding."
  },
  {
    question: "Which tech stacks do you support?",
    answer:
      "React / Next.js, Laravel, Flutter, Shopify, WordPress, Zapier/Make, AI APIs (OpenAI, Vertex), plus AI performance optimisation on AWS, Azure, or GCC-hosted clouds."
  },
  {
    question: "How do we get started today?",
    answer:
      "Click “Book an Appointment,” pick a 15-min slot, and complete our AI workflow questionnaire so we dive straight into value—not basic discovery."
  }
];


const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq__section">
      {/* Left Content */}
      <div className="faq__intro">
        <span className="faq__tag">• How We Work?</span>
        <h2 className="faq__headline">
          Frequently<br />
          <span>Asked Questions</span>
        </h2>
        <p className="faq__description">
            Curious about our AI workflow transformation process? Browse the FAQ for fast answers to your most common questions.

        </p>
      </div>

      {/* Accordion */}
      <div className="faq__list">
        {faqs.map(({ question, answer }, index) => (
          <div
            key={index}
            className={`faq__item ${activeIndex === index ? 'open' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq__question">
              <span>{question}</span>
              <span className="faq__icon">{activeIndex === index ? '−' : '+'}</span>
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
