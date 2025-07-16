import React from 'react';
import './ExplorePortfolio.css';

const ExplorePortfolio = () => {
  return (
    <section className="explore-section">
      <div className="explore-container">

        <div className="explore-tag">
          <span className="year">2025</span>
          <span className="tag-text">Signature Showcase</span>
        </div>

        <h1 className="explore-heading">
          See What Happens<br />
          <span>When AI × Craft × Code Collide.</span>
        </h1>

        <p className="explore-subtext">
         From pre-seed disruptors to Fortune-listed giants, our 360° AI workflow transformation studios turn bold concepts<br className="break" />
           into conversion-focused products that ship, scale & sell.
        </p>

        {/* <div className="explore-buttons">
          <button className="about__button">Start Your Own Case Study</button>
        </div> */}

      </div>
    </section>
  );
};

export default ExplorePortfolio;
