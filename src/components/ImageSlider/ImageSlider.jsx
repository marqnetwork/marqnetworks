"use client";

import React from "react";
import { motion } from "framer-motion";
import "./ImageSlider.css";

const images = [
  "/images/slider1.jpg",
  "/images/slider2.png",
  "/images/slider3.png",
  "/images/slider4.jpg",
  "/images/slider5.png",
  "/images/slider6.png",
  "/images/slider7.png",
  "/images/slider8.png",
  "/images/slider9.jpg",
  "/images/slider10.jpg",
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
            <img src={img} alt={`top-slide-${index}`} />
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
            <img src={img} alt={`bottom-slide-${index}`} />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ImageSlider;
