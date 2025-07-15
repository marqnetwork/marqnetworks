import React from 'react';
import '../ExplorePortfolio/ExplorePortfolio.css';

const ExplorePortfolio = () => (
  <section className="explore-section">
    <div className="explore-container">
      <div className="explore-tag">
        <span className="year">2025</span>
        <span className="tag-text">Let’s Build Together</span>
      </div>

      <h1 className="explore-heading">
        Questions? Ideas?<br />
        <span>Let’s Talk.</span>
      </h1>

      <p className="explore-subtext">
        Whether you're validating an idea, need growth-strategy consultants to rescue a live project, or want an AI workflow transformation second opinion,
        the marQ Networks team is here—on EST hours, ready to dive in.
      </p>

      {/* <div className="explore-buttons">
        <button className="about__button">Book a Discovery Call</button>
      </div> */}
    </div>
  </section>
);

export default ExplorePortfolio;
