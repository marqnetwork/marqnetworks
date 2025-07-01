"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "./Hero.css";

// Lazy load LogoSlider and MarqButton
const LogoSlider = dynamic(() => import("../LogoSlider/LogoSlider"), {
  ssr: false,
});
const MarqButton = dynamic(() => import("../MarqButton/MarqButton"), {
  ssr: false,
});

const Hero = () => {
  const headingVariant = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
        <h2 className="hero-heading">
  <motion.span
    className="heading-line"
    initial="initial"
    animate="animate"
    variants={headingVariant}
  >
    Premium Digital Partner
  </motion.span>
  <motion.span
    className="heading-line"
    initial="initial"
    animate="animate"
    variants={headingVariant}
    transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
  >
    for Visionary Brands
  </motion.span>
</h2>


          <motion.p
            initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            “We weave our 5-Pillar Service Stack—Strategy & Digital
            Transformation, Brand + Experience Design, Custom Software &
            Automation, Growth Marketing & Lead Gen, and our Off-Shore
            Excellence Hub—into one friction-free engine that helps ambitious
            companies launch faster and scale 40 % smarter.”
          </motion.p>

          <div className="hero__buttons">
            <MarqButton className="primary-btn-hero" />
            <a href="/Solution" className="secondary-btn2">
              Explore the Stack
            </a>
          </div>

          <div className="hero__divider" />
          <LogoSlider />
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
