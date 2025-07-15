"use client";
import React from "react";
import "./AboutSection.css";
import { motion } from "framer-motion";
import MarqButton from "../MarqButton/MarqButton";

const AboutSection = () => {
  return (
    <div className="container">
      <section className="about">
        {/* Left Content */}
        <div className="about__content">
          <span className="about__tag">• About MarQ</span>

          <motion.h2
            className="about__headline"
            initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
            whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Building Stronger Brands
            <br />
            <span>Creating Lasting Impact.</span>
          </motion.h2>

          <p className="about__description">
            On-demand strategy, design, and tech—growth plans engineered to elevate 
            <br />
            brands without agency bloat.
          </p>

          <div className="about__divider" />

          {/* Stats */}
          <div className="about_icons">
            <div className="about__description-wrapper">
              <img
                src="/images/abouticon.png"
                alt="Revenue Growth Icon"
                className="about__icon"
              />
              <p className="about__description">
                Helped clients leap from $0 → $750 K using go-to-market strategy within 12 months
              </p>
            </div>
            <div className="about__description-wrapper">
              <img
                src="/images/abouticon.png"
                alt="Customer Growth Icon"
                className="about__icon"
              />
              <p className="about__description">
                Delivered 52 % lift in new-customer growth with AI-powered CRM workflows
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="about__actions">
            <MarqButton className="about__button" />
            <div className="about__rating">
              <span className="stars">★★★★★</span>
              <span className="reviews">Rated 200+ USA & GCC brands worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="about__image">
          <img src="/images/about.png" alt="Visualizing AI-powered growth strategy through a futuristic business dashboard" />
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
