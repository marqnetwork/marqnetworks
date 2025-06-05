"use client";
import React from "react";
import "./Hero.css";
import LogoSlider from "../LogoSlider/LogoSlider";
import { motion } from "framer-motion";
import MarqButton from '../MarqButton/MarqButton'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Premium Digital Partner <br />
            <span> for Visionary Brands</span>
          </motion.h1>

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
     
             <MarqButton  className="primary-btn-hero"/>

            {/* <button className="secondary-btn2">Explore the Stack</button> */}
            <a href="/Solution" className="secondary-btn2">
  Explore the Stack
</a>
          </div>
          <LogoSlider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
