import React from "react";
import { motion } from "framer-motion";
import "./LogoSlider.css";


const logos = Array.from({ length: 48 }, (_, i) => `/images/${i + 1}.svg`);

const LogoSlider = () => {
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="logo-slider">
      <motion.div
        className="logo-track"
        animate={{ x: "-170%" }}
        transition={{
          repeat: Infinity,
          duration: 70,
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
