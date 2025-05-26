import React from 'react';
import './ExplorePortfolio.css';

const ExplorePortfolio = () => {
  return (
    <section className="explore-section">
      <div className="explore-container">
        {/* Tag */}
        <div className="explore-tag">
          <span className="year">2025</span>
          <span className="tag-text">Let’s Build Together</span>
        </div>

        {/* Headings */}
        <h1 className="explore-heading">
         Questions? Ideas?<br /> <span>Let’s Talk.</span>
        </h1>

        {/* Subtext */}
        <p className="explore-subtext">
         Whether you’re validating an idea, need a rescue squad for a live project, or just want a second opinion,<br className="break" />
         the marQ Networks team is here—on EST hours, ready to dive in.
        </p>

        {/* Buttons */}
        <div className="explore-buttons">
         <button  className="about__button">Book a Discovery Call</button>
        </div>

        
      </div>
    </section>
  );
};

export default ExplorePortfolio;
