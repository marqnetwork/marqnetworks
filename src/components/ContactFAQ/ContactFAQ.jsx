"use client";
import React, { useState } from 'react';
import '../FAQSection/FAQSection.css';

const faqs = [
  {
    question: "How does MarQ work faster and safer than a typical agency?",
    answer:
      "Our AI workflow transformation roadmap runs parallel design/dev sprints on a 45-day go-live pledge. Every commit passes an AI code-assistant pipeline (OWASP, Lighthouse > 90, unit tests) and peer review by a senior U.S. or GCC lead. Net result: launch speed plus Fed-grade, AI-powered GDPR/SOC-2 compliance—zero incidents to date."
  },
  {
    question: "Who will I talk to day-to-day if the team is offshore?",
    answer:
      "A U.S-based or GCC-based growth-strategy consultant owns delivery. Behind them, our 24/7 Off-Shore Excellence Hub works EST-overlap hours. Real-time Slack, weekly Loom demos, and an open ClickUp board mean you’ll never wonder “where are we?”"
  },
  {
    question: "What if my scope grows—do you scale with me?",
    answer:
      "Absolutely. Our 360° stack lets you bolt on extra studios—Growth Pod, Software House, Creative Logics—without new contracts. We spin up AI workflow sprint pods inside the same project space, so velocity scales while management load doesn’t."
  },
  {
    question: "Can you integrate with the tools we already use?",
    answer:
      "Yes. From HubSpot, Zoho, Stripe, and Zapier to bespoke APIs, our engineers specialise in headless, no-rip-and-replace automation. We map your stack during discovery and insert custom micro-services only where value > cost."
  },
  {
    question: "How is pricing structured—hourly, fixed, or retainer?",
    answer:
      "Most clients choose a fixed-scope “Launch Sprint” (45 days, flat fee) followed by a flexible AI-powered optimisation retainer. Clear costs up-front, predictable runway for new features and growth experiments—no hidden extras."
  },
  {
    question: "We handle sensitive data. How do you protect IP & compliance?",
    answer:
      "AI-powered GDPR/SOC-2 compliance automation, NDAs, least-privilege GitHub, encrypted vaults, and region-specific hosting (AWS GovCloud, Azure UAE). Our DevSecOps playbook meets GDPR, HIPAA, and U.S. FedRAMP baselines."
  },
  {
    question: "What happens after launch—do you disappear?",
    answer:
      "Never. Projects roll into 30-day Relentless Improvement cycles: predictive lead-scoring tweaks, A/B tests, backlog grooming, and quarterly roadmap resets. Fresh analytics plus a next-sprint plan land in your inbox each month."
  },
  {
    question: "Why choose MarQ over hiring in-house?",
    answer:
      "A single MarQ sprint pod—strategist, PM, AI-powered UX, full-stack dev, QA, growth marketer—would cost 6-7× in salaries in-house. You’re live in weeks, not quarters, and you scale resources minus HR overhead."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="faq__section">
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
              <div className="faq__answer">
                {answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
