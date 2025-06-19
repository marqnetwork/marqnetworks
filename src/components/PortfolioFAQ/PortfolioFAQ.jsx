"use client";
import React, { useState } from 'react';
import '../FAQSection/FAQSection.css';

const faqs = [
  {
    question: "Will I have a U.S.-based point of contact, or only an offshore team?",
    answer: "Both. You get a senior PM in the U.S. and a real-time Slack channel to our 24/7 Off-Shore Excellence Hub. One team, no hand-off gaps."
  },
  {
    question: "How does the 45-day Launch Guarantee actually work?",
    answer: "We time-box design + dev sprints and run automated QA daily. If we miss the 45-day live date, you receive a 15% credit—no fine print."
  },
  {
    question: "What kind of ROI can I expect vs. hiring an in-house crew?",
    answer: "Most clients save 30–50% on build costs while shipping 2× faster. See GA Tax Lien Bootcamp (400 webinar leads/15 days) or Excelous (0 data incidents at half typical spend)."
  },
  {
    question: "How do you keep our data and IP secure?",
    answer: "Fed-contractor controls, SOC-2-aligned checklists, encrypted repos, NDAs for every sprint member. Zero security incidents since 2014."
  },
  {
    question: "Can we start small and scale later?",
    answer: "Absolutely. Engage one studio (e.g., MarQ Creative Logics for UI/UX) or plug into the full 360° stack as your needs grow—same PM, one contract."
  },
  {
    question: "What happens after launch—do you disappear?",
    answer: "Never. We schedule 30-day optimisation cycles by default: data review → growth backlog → next sprint. That’s how clients keep compounding results."
  },
  {
    question: "Which tech stacks do you support?",
    answer: "React / Next.js, Laravel, Flutter, Shopify, WordPress, Zapier/Make, AI APIs (OpenAI, Vertex), and cloud on AWS, Azure, or GCC-hosted as required."
  },
  {
    question: "How do we get started today?",
    answer: "Click “Book an Appointment,” choose a 15-min slot, and you’ll receive a pre-call questionnaire so we can jump straight into value, not discovery."
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
          Have questions? Our FAQ section has you covered with quick answers
          to the most common inquiries.
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
