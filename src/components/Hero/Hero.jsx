"use client";

import React, { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import "./Hero.css";

const LogoSlider = dynamic(() => import("../LogoSlider/LogoSlider"), {
  ssr: false,
});
const MarqButton = dynamic(() => import("../MarqButton/MarqButton"), {
  ssr: false,
});

const Hero = () => {
  const [animateHead, setAnimateHead] = useState(false);

 useEffect(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => setAnimateHead(true));
  } else {
    setTimeout(() => setAnimateHead(true), 300); // fallback
  }
}, []);


  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h2 className={`hero-heading ${animateHead ? "animate-heading" : ""}`}>
            <span className="heading-line">Premium Digital Partner  </span>
            <span className="heading-line">for Visionary Brands</span>
          </h2>

          <p className="hero__para">
            “We weave our 5-Pillar Service Stack—Strategy & Digital
            Transformation, Brand + Experience Design, Custom Software &
            Automation, Growth Marketing & Lead Gen, and our Off-Shore
            Excellence Hub—into one friction-free engine that helps ambitious
            companies launch faster and scale 40% smarter.”
          </p>

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
