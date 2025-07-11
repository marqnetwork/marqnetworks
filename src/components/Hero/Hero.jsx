import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "./Hero.css";

// SSR now enabled
const LogoSlider = dynamic(() => import("../LogoSlider/LogoSlider"));
const MarqButton = dynamic(() => import("../MarqButton/MarqButton"));

const Hero = () => {
  const [animateHead, setAnimateHead] = useState(false);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    if (!isMobile) {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => setAnimateHead(true));
      } else {
        setTimeout(() => setAnimateHead(true), 300);
      }
    } else {
      setAnimateHead(true); // render immediately on mobile
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h2 className={`hero-heading ${animateHead ? "animate-heading" : ""}`}>
            <span className="heading-line">Premium Digital Partner</span>
            <span className="heading-line">for Visionary Brands</span>
          </h2>

          <p className="hero__para">
            “We weave our 5-Pillar Service Stack—Strategy & Digital
            Transformation, Brand + Experience Design, Custom Software & Automation, Growth Marketing & Lead Gen, and our Off-Shore
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

export default Hero; // no need for memo now
