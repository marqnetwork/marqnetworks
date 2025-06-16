import React from "react";
import { motion } from "framer-motion";
import "./LogoSlider.css";

// Load 1.svg to 48.svg from /images/
const logos = Array.from({ length: 48 }, (_, i) => `/images/${i + 1}.svg`);

const LogoSlider = () => {
  const repeatedLogos = [...logos, ...logos, ...logos]; // to create infinite loop effect

  return (
    <div className="logo-slider">
      <motion.div
        className="logo-track"
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
        style={{ x: 0 }}
        
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
