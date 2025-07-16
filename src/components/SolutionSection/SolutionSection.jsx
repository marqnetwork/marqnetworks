"use client";
import React from 'react';
import './SolutionSection.css';
import MarqButton from '../MarqButton/MarqButton';

const SolutionSection = () => {
  return (
    <section
      className="sectionsolution"
      // style={{ backgroundImage: `url(/images/solutionbg.png)` }}
    >
      <div className="solution-container">
        {/* Tag */}
        <div className="solution-tag">
          <span className="solution-year">2025</span>
          <span className="solution-tag-text">Our Solution</span>
        </div>

        {/* Headings */}
        <h1 className="solution-heading">
          Discover <span>marQ Solutions</span><br />
          Where AI Challenges <span>Meet Clarity.</span>
        </h1>

        {/* Subtext */}
        <p className="solution-subtext">
         Dive deep into our AI workflow transformation approach to turning growth challenges into<br className="solution-break" />
          conversion-focused solutions—guided by innovation, strategy, and speed.
        </p>

        {/* Buttons */}
        <div className="solution-buttons">
          <MarqButton className="solution-btn primary" />
          <button className="solution-btn secondary">See How We Solve</button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
