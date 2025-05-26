"use client";

import React from "react";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import ResultsSection from "@/components/ResultsSection/ResultsSection";
import Work from "@/components/Work/Work";
import FeatureSection from "@/components/FeatureSection/FeatureSection";
import FeatureGridSection from "@/components/FeatureGridSection/FeatureGridSection";
import LandinBenefits from "@/components/LandinBenefits/LandinBenefits";
import PortfolioSection from "@/components/PortfolioSection/PortfolioSection";
import OurServices from "@/components/OurServices/OurServices";
import LaunchSection from "@/components/LaunchSection/LaunchSection";
import JoinUsNow from "@/components/JoinUsNow/JoinUsNow";
import FAQSection from "@/components/FAQSection/FAQSection";
import LandinBenefitCards from "@/components/LandinBenefitCards/LandinBenefitCards";



const Home = () => {
  return (
    <div
      className=" bg-black text-white min-h-[70vh] pt-2 text-center">
      <Hero />
      <AboutSection />
      <ResultsSection />
      <Work />
      <FeatureSection />
      <FeatureGridSection />
      <LandinBenefits />
      <LandinBenefitCards />
      <PortfolioSection />
      <OurServices />
      <LaunchSection />
      <div style={{ textAlign: "left", width: "100%" }}>
        <FAQSection />
      </div>
      <JoinUsNow />
    </div>
  );
};

export default Home;
