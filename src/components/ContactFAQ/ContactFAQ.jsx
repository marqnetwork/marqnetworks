"use client";
import React, { useState } from 'react';
import '../FAQSection/FAQSection.css';

const faqs = [
  {
    question: "How does marQ work faster and safer than a typical agency?",
    answer: "We run parallel design/dev sprints on a 45-day go-live pledge. Every commit passes an automated QA pipeline (OWASP, Lighthouse > 90, unit tests) and a peer review by a senior US or GCC lead. You get launch-speed and Fed-contractor security controls (SOC-2 aligned checklists, zero data incidents to date)."
  },
  {
    question: "Who will I talk to day-to-day if the team is offshore?",
    answer: "You’re assigned a US-based (EST) or GCC-based product strategist who owns delivery. Behind them sits our Off-Shore Excellence Hub working EST overlap hours. Real-time Slack, weekly Loom demos, and an open ClickUp board mean you’ll never wonder “where are we?”"
  },
  {
    question: "What if my scope grows—do you scale with me?",
    answer: "Absolutely. Our 360° structure lets you bolt on extra “studios” (Growth Pod, Software House, Creative Logics) without re-signing contracts. We simply spin up sprint pods inside the same project space—your velocity scales, your management load doesn’t."
  },
  {
    question: "Can you integrate with the tools we already use?",
    answer: "Yes. From HubSpot, Zoho, Stripe and Zapier to bespoke APIs, our engineers specialise in “no-rip-and-replace” automation. We map your existing stack during discovery and layer in custom micro-services only where value > cost."
  },
  {
    question: "How is pricing structured—hourly, fixed, or retainer?",
    answer: "Most clients opt for a fixed-scope “Launch Sprint” (45 days, flat fee) followed by a flexible monthly optimisation retainer. That means clear costs up-front, then a predictable runway for new features and growth experiments. No hidden extras—ever."
  },
  {
    question: "We handle sensitive data. How do you protect IP & compliance?",
    answer: "NDAs at onboarding, least-privilege GitHub access, encrypted vaults for credentials, and region-specific hosting (AWS GovCloud, Azure UAE, etc.) keep IP safe. Our DevSecOps playbook meets GDPR, HIPAA and US FedRamp baseline."
  },
  {
    question: "What happens after launch—do you disappear?",
    answer: "Never. Every project rolls into 30-day “Relentless Improvement” cycles: data-driven tweaks, A/B tests, backlog grooming and quarterly roadmap resets. You’ll have fresh analytics and a next-sprint plan in your inbox each month."
  },
  {
    question: "Why choose marQ over hiring in-house?",
    answer: "A single marQ sprint pod gives you strategist, PM, UI/UX, full-stack dev, QA and growth marketer—talent that would cost 6-7× in salaries. Plus, you’re live in weeks, not quarters, and you can scale resources up or down without HR overhead."
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
        <h2>
          Frequently<br />
          <span>Asked Questions</span>
        </h2>
        <p>
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
