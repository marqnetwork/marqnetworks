"use client";
import React, { useState } from 'react';
import '../FAQSection/FAQSection.css';

const faqs = [
  // 🧠 MarQ Consultancy
  {
    question: "What does a growth strategy consultant do?",
    answer:
      "A growth strategy consultant pinpoints untapped markets, builds an AI workflow transformation roadmap, and rolls out data-driven tactics that accelerate sustainable revenue growth."
  },
  {
    question: "How can AI improve my business roadmap?",
    answer:
      "AI uncovers hidden insights, forecasts trends, and automates decision-making to deliver a faster, smarter AI business roadmap and go-to-market strategy."
  },

  // 🎨 MarQ Creative Logics
  {
    question: "Why is branding important for startups?",
    answer:
      "Partnering with a specialized branding agency for startups builds instant trust, attracts investors, and positions you to win in crowded markets from day one."
  },
  {
    question: "What is emotional branding, and how does it work?",
    answer:
      "Emotional branding experts align visuals, messaging, and UX with core human emotions—turning casual users into lifelong advocates."
  },

  // 💻 MarQ Software House
  {
    question: "What is custom software development?",
    answer:
      "A custom software development company designs digital solutions around your unique workflows, boosting efficiency and cutting tech bloat."
  },
  {
    question: "What are the benefits of a headless ecommerce solution?",
    answer:
      "Using headless ecommerce developers unlocks lightning-fast performance, design freedom, and seamless app integrations for modern shopping experiences."
  },

  // 📈 MarQ Growth Pod
  {
    question: "What is a funnel marketing agency?",
    answer:
      "A funnel marketing agency architects entire customer journeys—from awareness to conversion—to lift leads, sales, and lifetime value."
  },
  {
    question: "How does AI-powered lead generation work?",
    answer:
      "AI-powered lead generation services for B2B use predictive models to score prospects, automate outreach, and optimize funnels in real time—slashing acquisition costs."
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
