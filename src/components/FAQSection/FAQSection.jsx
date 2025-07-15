"use client";

import React, { useState, useCallback } from "react";
import "./FAQSection.css";

const faqs = [
  {
    question: "What will my investment be—and what’s included?",
    answer:
      "Every build is quoted up-front, flat-fee. Packages start at $4.5K for conversion-focused Brand + UX and $7.5K for full-stack dev with AI workflow transformation services—covering research, strategy, design, code, QA, launch, and 30-day support."
  },
  {
    question: "How fast can we launch?",
    answer:
      "MVP websites—built with headless e-commerce code and an AI code assistant—ship in 15 business days. Full platforms land in 4–8 weeks (integration-dependent). Weekly sprints, same-day feedback loops, and a dedicated PM keep momentum high."
  },
  {
    question: "What kind of ROI have past clients seen?",
    answer:
      "GA Tax Lien Boot Camp → AI-powered CRM automation workflows packed 400 registrants per webinar and drove $3.9 M in sales. Customex e-commerce → 47 % rise in new customers within 60 days. Bond Interiors → 30 % lead-to-quote lift after a conversion-focused site + funnel overhaul."
  },
  {
    question: "How will we communicate across time?",
    answer:
      "Your core growth-strategy consultants work 9 AM–5 PM EST for real-time Slack & Zoom. A second offshore pod handles overnight production, so progress rolls 24/7 without you burning midnight oil."
  },
  {
    question: "Who owns the code, designs, and data?",
    answer:
      "You do—100 %. We transfer source files (Figma, Webflow, Git repo), admin credentials, and a plain-English license letter at hand-off. No lock-ins—ever."
  },
  {
    question: "What if I’m not happy with the final product?",
    answer:
      "Our 14-day money-back guarantee covers scope alignment and quality benchmarks. Missed expectations? You get a full refund—no legal gymnastics. We’ve issued refunds on fewer than 3 % of projects since 2016."
  }
];


const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="faq__section">
      {/* Header */}
      <header className="faq__intro">
        <span className="faq__tag">• How We Work?</span>
        <h2 className="faq__headline">
          Frequently <br />
          <span>Asked Questions</span>
        </h2>
        <p className="faq__description">
          Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
        </p>
      </header>

      {/* FAQ Items */}
      <div className="faq__list">
        {faqs.map(({ question, answer }, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className={`faq__item ${isOpen ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
              onKeyDown={(e) => e.key === "Enter" && toggleFAQ(index)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="faq__question">
                <span>{question}</span>
                <span className="faq__icon">{isOpen ? "−" : "+"}</span>
              </div>
              {isOpen && (
                <div id={`faq-answer-${index}`} className="faq__answer">
                  {answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
