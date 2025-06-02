"use client";
import React from 'react'; 
import './FeatureSection.css';
import { motion } from "framer-motion";
import MarqButton from '../MarqButton/MarqButton'


const FeatureSection = () => {
  return (
    <section className="feature">
      {/* Left Side - Text Content */}
      <div className="feature__content">
        <span className="feature__tag">• Features</span>

        <motion.h2 className="feature__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
  whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.5 }}>
        Unlimited Design Features<br />
          <span>Delivered In A Second!</span>
        </motion.h2>

        <p className="feature__description">
        Six power-ups that turn every MarQ Networks<br />
        project into measurable growth
        </p>

        <div className="feature__actions">
  
<MarqButton className="feature__button"/>


        </div>
        </div>

          <div className="feature__svg-wrapper">
    <img src="/images/resultleft.png" alt="Left Decoration" className="feature__svg feature__svg--left" />
    <img src="/images/resultright.png" alt="Right Decoration" className="feature__svg feature__svg--right" />
  </div>
     
    </section>
    
  );
};

export default FeatureSection;
