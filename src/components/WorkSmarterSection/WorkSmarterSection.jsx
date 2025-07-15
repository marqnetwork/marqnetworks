import React from "react";
import './WorkSmarterSection.css';
import MarqButton from '../MarqButton/MarqButton';

const WorkSmarterSection = () => {
  return (
    <section className="work-smarter">
      
      {/* Content Block */}
      <div className="work-smarter__content">
        <span className="work-smarter__tag">• About marQ</span>
        
        <h2 className="work-smarter__headline">
          Work Smarter <br />
          Scale Faster <br />
          <span>Every AI Minute Counts.</span>
        </h2>

        <h4>AI-Guided From Vision to Launch</h4>
        <p className="work-smarter__description">
         We map every milestone—strategy, sprints, QA, and go-live—through an AI workflow transformation roadmap, so you stay focused on growth, not guesswork.

        </p>

        <h4>Support That Never Sleeps</h4>
        <p className="work-smarter__description">
          Post-launch, our growth-strategy consultants and 24/5 offshore pods ship continuous improvements while you sleep, ensuring momentum never stalls.
        </p>

        <div className="work-smarter__actions">
          <MarqButton className="work-smarter__button" />
          <div className="work-smarter__rating">
            <span className="work-smarter__stars">★★★★★</span>
            <span className="work-smarter__reviews">900+ client ratings</span>
          </div>
        </div>
      </div>

      {/* Image Block */}
      <div className="work-smarter__image">
        <img src="/images/work smarter.png" alt="Global delivery team executing late-night milestones to help clients scale faster" />
      </div>
      
    </section>
  );
};

export default WorkSmarterSection;
