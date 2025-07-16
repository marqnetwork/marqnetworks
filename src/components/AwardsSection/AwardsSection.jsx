import React from 'react';
import './AwardsSection.css';

// Proof-of-Performance Badges
const proofCards = [
  {
    id: 1,
    logo: '/images/award1.png',
    alt: 'Rain cloud icon above text committing to 45-day product launch timeline with automated QA and peer review support',
    title: '45-Day AI Launch Pledge',
    subtitle: 'AI Workflow Speed',
    badge: '45 d',
    description:
      'AI workflow transformation roadmap ships MVPs live in ≤ 45 days, backed by automated QA & peer reviews.'
  },
  {
    id: 2,
    logo: '/images/award2.png',
    alt: 'Abstract unified tech icon above text offering end-to-end consultancy, design, development, and offshore delivery through a single project manager',
    title: '360° Stack, One Growth PM',
    subtitle: 'Strategy ➜ Headless Scale',
    badge: '5 studios',
    description:
      'End-to-end consultancy, headless e-commerce code, and AI-powered UX under one contract.'
  },
  {
    id: 3,
    logo: '/images/award3.png',
    alt: 'Pictogram of a fast-moving figure representing global sprint teams working across time zones with senior US and GCC leads',
    title: 'Borderless Talent',
    subtitle: 'Off-Shore Excellence',
    badge: '24 / 7',
    description:
      'Growth-strategy consultants lead EST-overlap sprints with US & GCC seniors steering quality.'
  },
  {
    id: 4,
    logo: '/images/award4.png',
    alt: 'Shield icon symbolizing SOC-2 aligned security, encrypted pipelines, and flawless audit controls',
    title: 'Security & Trust',
    subtitle: 'AI-Driven Compliance',
    badge: '0 incidents',
    description:
      'AI-powered GDPR/SOC-2 compliance automation ensures encrypted pipelines and flawless audits.'
  }
];

// Core values
const coreValues = [
  'AI-Powered Impact',
  '360° AI Thinking',
  'Radical Transparency',
  'Build Fast, Build Right',
  'Borderless Talent',
  'Security & Trust',
  'Relentless Improvement'
];


const AwardsSection = () => {
  return (
    <section className="awards">
      {/* Left Column */}
      <div className="awards__left">
        <span className="awards__tag">• Proof, Not Promises</span>
        <h2>
          What Makes <br />
          <span>AI-Powered MarQ Different</span>
        </h2>
        <p>
          Seven core values, one 360° AI-driven delivery model, zero excuses.  
From discovery to scale, every MarQ project runs on the same AI workflow transformation playbook.
        </p>
        <ul className="awards__list">
          {coreValues.map((value, idx) => (
            <li key={idx}>{value}</li>
          ))}
        </ul>
      </div>

      {/* Right Column - Cards */}
      <div className="awards__grid">
        {proofCards.map(({ id, logo,alt, title, subtitle, description }) => (
          <div key={id} className="award__card">
            <img src={logo} alt={alt} className="award__logo" />
            <div className="award__info">
              <h4>{title}</h4>
              <p>{subtitle}</p>
            </div>
            <p className="award__desc">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;
