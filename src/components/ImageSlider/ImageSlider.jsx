"use client";

import React from "react";
import { motion } from "framer-motion";
import "./ImageSlider.css";

const images = [
  { src: "/images/slider1.png", alt: "Confident man walking through a neon-lit urban street in winter attire" },
  { src: "/images/slider2.png", alt: "Luxury black sports car with LED headlights parked in a high-tech garage" },
  { src: "/images/slider3.png", alt: "Confident young businesswoman smiling in a modern office setting" },
  { src: "/images/slider4.png", alt: "Futuristic electric vehicle charging under neon lights at night" },
  { src: "/images/slider5.png", alt: "Digital blue whale hovering over layered holographic data structures in ocean light beams" },
  { src: "/images/slider6.png", alt: "Futuristic urban alleyway with glowing digital panels and graffiti-covered brick walls" },
  { src: "/images/slider7.png", alt: "Close-up of an illuminated microchip labeled API on a glowing futuristic circuit board" },
  { src: "/images/slider8.png", alt: "Futuristic glowing growth chart showing exponential rise in user metrics across a cracked surface path" },
  { src: "/images/slider9.png", alt: "3D digital interface with floating data cubes and glowing green cyber grid for data processing or AI systems" },
  { src: "/images/slider10.png", alt: "Silhouette of a person using a futuristic transparent dashboard with digital data panels, overlooking a city skyline at night" },
];

// Split images into top and bottom rows
const topImages = images.slice(0, 5);
const bottomImages = images.slice(5);

const ImageSlider = () => {
  return (
    <section className="slider-section">
      {/* Row 1 — scroll left to right */}
      <motion.div
        className="slider-row"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...topImages, ...topImages].map((img, index) => (
          <div className="slider-image" key={`top-${index}`}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </motion.div>

      {/* Row 2 — scroll right to left */}
      <motion.div
        className="slider-row"
        animate={{ x: ["-100%", "0%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...bottomImages, ...bottomImages].map((img, index) => (
          <div className="slider-image" key={`bottom-${index}`}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ImageSlider;
