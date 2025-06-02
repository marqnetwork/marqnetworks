"use client";

import React from 'react';
import './PortfolioSection.css'; 
import { motion } from "framer-motion";
import StackingCards from '../Stack';
import MarqButton from '../MarqButton/MarqButton'

const PortfolioSection = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__content">

        
        <span className="portfolio__tag">• Portfolio</span>

        <motion.h2 className="portfolio__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
  whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.5 }}>
          Our Selected Projects<br />
          <span>That Accelerate Digital Growth.</span>
        </motion.h2>

        <p className="portfolio__description">
       From SaaS scale-ups and e-commerce launches to government-ready solutions, each case   <br />
    study   proves how our cross-disciplinary team turns complexity into measurable results.
        </p>
      <div className="portfolio__decoration-wrapper"> 
  <img src="/images/resultleft.png" alt="Left Decoration" className="portfolio__decoration portfolio__decoration--left" />
  <img src="/images/resultright.png" alt="Right Decoration" className="portfolio__decoration portfolio__decoration--right" />
</div>


        <div className="portfolio__actions">
          {/* <button className="portfolio__button">View Full Portfolio</button> */}
          <MarqButton className="portfolio__button"/>
        </div>

        
  <br />
  <br />
 <StackingCards/>
        
      </div>
    </section>
  );
};

export default PortfolioSection;
