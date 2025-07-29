import React from "react";
import MarqButton from "../MarqButton/MarqButton";
import LogoSlider from "../LogoSlider/LogoSlider";
import "./Hero.css";



const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h2 className="hero-heading">
            <span className="heading-line visible">AI-Driven Digital Growth </span>
            <span className="heading-line visible">Partner for Visionary Brands</span>
          </h2>

          <p className="hero__para">
            “Strategy, design, code, and growth—engineered as one seamless stack. From AI-driven digital transformation consultancy and branding to custom software development and funnel marketing with CRM automation, MarQ Networks turns clicks into revenue for scaling teams across the U.S. & GCC.
            <br/>
            <br />
             Think of us as your all-in-one branding agency for startups, custom dev shop, and funnel marketing agency—powered by AI. Our 5-Pillar Service Stack (Strategy & Digital Transformation Brand + Experience Design Custom Software & Automation Growth Marketing & Lead Gen Off-Shore Excellence Hub) delivers launch-ready products in ≤45 days, trims costs up to 40 %, and compounds growth with AI-powered CRM workflow automation. Let’s build smarter, faster, together.”
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
