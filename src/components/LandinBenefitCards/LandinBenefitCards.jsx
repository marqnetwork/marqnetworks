import React from 'react';
import './LandinBenefitCards.css';
import MarqButton from '../MarqButton/MarqButton';

const LandinBenefitCards = () => {
  const smallCards = [
    {
      img: '/images/quick.png',
      title: 'Lightning-Fast Turnaround',
      badge: true,
      desc: 'Our follow-the-sun workflow ships polished assets in a day or two, keeping your launches ahead of schedule.',
      alt:'Global delivery model enabling 24/7 production flow—assets shipped in 1–2 days using follow-the-sun workflow'
    },
    {
      img: '/images/publish.png',
      title: 'Worry-Free Pricing',
      badge: false,
      desc: 'Flexible monthly plans cover strategy, design, and code. Cancel anytime, own every file—no hidden fees or hourly overages.',
      alt:'Transparent monthly pricing for strategy, design, and code—cancel anytime, no hidden fees'
    },
    {
      img: '/images/worry.png',
      title: 'Off-Shore Excellence Hub',
      badge: true,
      desc: 'U.S.-friendly hours + global talent. Get senior expertise at 30–40% savings, with an on-shore PM bridging every call.',
      size: 'smallx',
      alt:'Global team delivery model with U.S.-aligned hours and senior offshore talent'
    },
  ];

  return (
    <div className="benefit-wrapper">
      {/* Large Card */}
      <div className="benefit-card large">
        <img src="/images/submit.png" alt="Visualizing unlimited creative and dev requests—handled by MarQ’s agile pod system" />
        <h3>Submit Unlimited Requests</h3>
        <div className="about__divider" />
        <p>
          Fire off as many tasks as you like—design, dev, or copy. Your dedicated pod works through them in your chosen priority, no tickets lost.
        </p>
        <div className="button-group">
          <MarqButton className="primary-btn" />
        </div>
      </div>

      {/* Medium Card */}
      <div className="benefit-card medium">
        <img src="/images/request.png" alt="Smart feedback system for fast revisions—layered UI showing real-time change tracking" />
        <div className="card-header">
          <h4>Requests & Revisions</h4>
          <span className="pill">NEW</span>
        </div>
        <p>
          Every deliverable includes built-in feedback rounds. We refine fast, documenting changes so you see progress—not guesswork.
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
