import React from 'react';
import './AboutUsSection.css';
import MarqButton from '../MarqButton/MarqButton';
import Link from "next/link";


const AboutSection = () => {
  return (
    <section className="deep-dive-section">
      <div className="deep-dive-container">

        {/* Tag */}
        <div className="deep-dive-tag">
          <span className="year">2025</span>
          <span className="tag-text">About marQ</span>
        </div>

        {/* Headings */}
        <h1 className="deep-dive-heading">
           Meet <span>marQ Networks Where</span><br />
   <span>AI-Driven Vision</span> Turns Into <span>Velocity.</span>
        </h1>

        {/* Subtext */}
        <p className="deep-dive-subtext">
          Pull back the curtain on the strategists, engineers, and creatives turning complex growth puzzles into <br className="break" />
            elegant,conversion-focused solutions through AI workflow transformation—one launch at  time.
        </p>

        {/* Buttons */}
        <div className="deep-dive-buttons">
          <MarqButton className="btn primaryabout" />
          <Link href="/digital-growth-solutions#software-house">
  <button className="btn secondary">Explore Our Services</button>
</Link>

        </div>

        {/* Image */}
        <div className="deep-dive-image">
          <img src="/images/about2.png" alt="About marQ" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
