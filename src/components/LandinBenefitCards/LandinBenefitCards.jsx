import React from 'react';
import './LandinBenefitCards.css';
import MarqButton from '../MarqButton/MarqButton'

const LandinBenefitCards = () => {
  return (
    <div className="benefit-wrapper">
      {/* Large Card */}
      <div className="benefit-card large">
        <img src="/images/submit.png" alt="Unlimited Requests" />
        <h3>Submit Unlimited Requests</h3>
         <div className="about__divider" />
        <p>
          Fire off as many tasks as you like—design, dev, or copy. Your dedicated pod works through them in your chosen priority, no tickets lost.
        </p>
        <div className="button-group">
   
      <MarqButton className="primary-btn"/>

          {/* <button className="secondary-btn3">What is Landin?</button> */}
        </div>
      </div>

      {/* Requests & Revisions */}
      <div className="benefit-card medium">
        <img src="/images/request.png" alt="Requests & Revisions" />
        <div className="card-header">
          <h4>Requests & Revisions</h4>
          <span className="pill">NEW</span>
        </div>
        <p>
          Every deliverable includes built-in feedback rounds. We refine fast, documenting changes so you see progress—not guesswork.
        </p>
      </div>

      {/* Quick Turnaround */}
      <div className="benefit-card small">
        <img src="/images/quick.png" alt="Quick Turnaround" />
        <div className="card-header">
          <h4> Lightning-Fast Turnaround</h4>
          
          <span className="pill">NEW</span>
          
        </div>
         <div className="about__divider" />
        <p>
         Our follow-the-sun workflow ships polished assets in a day or two, keeping your launches ahead of schedule.
        </p>
      </div>

      {/* Publish in Seconds */}
      <div className="benefit-card small">
        <img src="/images/publish.png" alt="Publish in Seconds" />
        <div className="card-header">
          <h4>  Worry-Free Pricing</h4>
        </div>
         <div className="about__divider" />
        <p>
          Flexible monthly plans cover strategy, design, and code. Cancel anytime, own every file—no hidden fees or hourly overages.
        </p>
      </div>

      {/* Worry-Free Pricing */}
      <div className="benefit-card smallx">
        <img src="/images/worry.png" alt="Worry-Free Pricing" />
        <div className="card-header">
          <h4> Off-Shore Excellence Hub</h4>
          <span className="pill">NEW</span>
        </div>
         <div className="about__divider" />
        <p>
         U.S.-friendly hours + global talent. Get senior expertise at 30-40 % savings, with an on-shore PM bridging every call.
        </p>
      </div>
    </div>
  );
};

export default LandinBenefitCards;
