import React from "react";
import dynamic from "next/dynamic";
import "./Hero.css";

// Enable SSR
const LogoSlider = dynamic(() => import("../LogoSlider/LogoSlider"));
const MarqButton = dynamic(() => import("../MarqButton/MarqButton"));

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">

          {/* ⛔️ Remove animation on initial render */}
          <h2 className="hero-heading">
            <span className="heading-line visible">Premium Digital Partner</span>
            <span className="heading-line visible">for Visionary Brands</span>
          </h2>

          {/* ✅ This will now render immediately */}
          <p className="hero__para">
            “We weave our 5-Pillar Service Stack—Strategy & Digital
            Transformation, Brand + Experience Design, Custom Software &
            Automation, Growth Marketing & Lead Gen, and our Off-Shore
            Excellence Hub—into one friction-free engine that helps ambitious
            companies launch faster and scale 40% smarter.”
          </p>

          <div className="hero__buttons">
            <MarqButton className="primary-btn-hero" />
            <a href="/Solution" className="secondary-btn2">Explore the Stack</a>
          </div>

          <div className="hero__divider" />
          <LogoSlider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
