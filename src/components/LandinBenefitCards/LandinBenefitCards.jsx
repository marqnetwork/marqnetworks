import React from 'react';
import './LandinBenefitCards.css';
import MarqButton from '../MarqButton/MarqButton';

const LandinBenefitCards = () => {
const smallCards = [
  {
    img: '/images/quick.png',
    title: 'Lightning-Fast AI Turnaround',
    badge: true,
    desc: 'AI workflow transformation services plus a follow-the-sun process ship polished assets in 1–2 days—keeping your launches ahead of schedule.',
    alt: 'Global delivery model enabling 24/7 production flow—assets shipped in 1–2 days using follow-the-sun workflow'
  },
  {
    img: '/images/publish.png',
    title: 'Conversion-Focused Pricing',
    badge: false,
    desc: 'Flexible monthly plans cover conversion-focused website design, strategy, and code. Cancel anytime, own every file—no hidden fees or hourly overages.',
    alt: 'Transparent monthly pricing for strategy, design, and code—cancel anytime, no hidden fees'
  },
  {
    img: '/images/worry.png',
    title: 'Off-Shore Growth Hub',
    badge: true,
    desc: 'U.S.-friendly hours + global talent—guided by growth strategy consultants—for senior expertise at 30–40 % savings, with an on-shore PM bridging every call.',
    size: 'smallx',
    alt: 'Global team delivery model with U.S.-aligned hours and senior offshore talent'
  },
];


  return (
    <div className="benefit-wrapper">
      {/* Large Card */}
      <div className="benefit-card large">
        <img src="/images/submit.png" alt="Visualizing unlimited creative and dev requests—handled by MarQ’s agile pod system" />
        <h3>Submit Unlimited AI-Driven Requests</h3>
        <div className="about__divider" />
        <p>
          Fire off design, dev, or copy tasks powered by our AI workflow transformation services. Your dedicated pod works through them in priority order—no tickets lost.
        </p>
        <div className="button-group">
          <MarqButton className="primary-btn" />
        </div>
      </div>

      {/* Medium Card */}
      <div className="benefit-card medium">
        <img src="/images/request.png" alt="Smart feedback system for fast revisions—layered UI showing real-time change tracking" />
        <div className="card-header">
          <h4>AI-Powered Requests & Revisions</h4>
          <span className="pill">NEW</span>
        </div>
        <p>
           Every deliverable loops through AI heatmap user testing and built-in feedback rounds—so you see measured progress, not guesswork.
        </p>
      </div>

      {/* Small Cards */}
      {smallCards.map(({ img, title, badge, desc, size ,alt}, index) => (
        <div key={index} className={`benefit-card ${size || 'small'}`}>
          <img src={img} alt={alt} />
          <div className="card-header">
            <h4>{title}</h4>
            {badge && <span className="pill">NEW</span>}
          </div>
          <div className="about__divider" />
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
};

export default LandinBenefitCards;
