import React from "react";
import { motion } from "framer-motion";
import "./LogoSlider.css";


const logos = Array.from({ length: 48 }, (_, i) => `/images/${i + 1}.svg`);

const LogoSlider = () => {
  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="logo-slider">
      <motion.div
        className="logo-track"
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 80,
          ease: "linear",
        }}
        
        
      >
        {repeatedLogos.map((logo, index) => (
          <div className="logo-item" key={index}>
            <img src={logo} alt={`logo-${index}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoSlider;
