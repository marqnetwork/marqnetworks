import React from 'react';
import './TeamMembersSection.css';
import MarqButton from '../MarqButton/MarqButton';

const TeamMembersSection = () => {
  return (
    <section className="team-members">
      
      <div className="team-members__content">
        <span className="team-members__tag">• Team Members</span>

        <h2 className="team-members__headline">
          Meet the Team Engineering <br />
          <span>AI-Driven Momentum Every Day</span>
        </h2>

        <p className="team-members__description">
         Our growth-strategy consultants, AI-powered UX designers, and full-stack engineers <br /> bring passionate expertise and creativity to every project.
        </p>

        <div className="team-members__actions">
          <MarqButton className="team-members__button" />
        </div>

        {/* Optional SVG Decoration */}
        {/* 
        <div className="team__svg-wrapper">
          <img src="/images/resultleft.png" alt="Left Decoration" className="team__svg team__svg--left" />
          <img src="/images/resultright.png" alt="Right Decoration" className="team__svg team__svg--right" />
        </div>
        */}

      </div>
      
    </section>
  );
};

export default TeamMembersSection;
