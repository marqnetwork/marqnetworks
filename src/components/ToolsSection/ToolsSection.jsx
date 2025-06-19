import React from 'react';
import './ToolsSection.css';
import MarqButton from '../MarqButton/MarqButton';

const ToolsSection = () => {
  return (
    <section className="tools">
      <div className="tools__content">
        <span className="tools__tag">• Tools</span>

        <h2 className="tools__headline">
          Our Proven Tech Arsenal<br />
          <span>Tailored to Every Business Stage</span>
        </h2>

        <p className="tools__description">
          From idea to enterprise rollout, MarQ Networks selects the perfect stack<br />
          so your strategy, design, code, growth, and scale run on best-in-class tools.
        </p>

        <div className="tools__actions">
          <MarqButton className="tools__button" />
        </div>
      </div>

      {/* Decorative SVGs (optional, for future use) */}
      {/*
      <div className="feature__svg-wrapper">
        <img
          src="/images/resultleft.png"
          alt="Left Decoration"
          className="feature__svg feature__svg--left"
        />
        <img
          src="/images/resultright.png"
          alt="Right Decoration"
          className="feature__svg feature__svg--right"
        />
      </div>
      */}
    </section>
  );
};

export default ToolsSection;
