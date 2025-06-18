"use client";

import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Immediately visible components
import Hero from "@/components/Hero/Hero";

// Lazy load below-the-fold components
const AboutSection = dynamic(() => import("@/components/AboutSection/AboutSection"));
const ResultsSection = dynamic(() => import("@/components/ResultsSection/ResultsSection"));
const Work = dynamic(() => import("@/components/Work/Work"));
const FeatureSection = dynamic(() => import("@/components/FeatureSection/FeatureSection"));
const FeatureGridSection = dynamic(() => import("@/components/FeatureGridSection/FeatureGridSection"));
const LandinBenefits = dynamic(() => import("@/components/LandinBenefits/LandinBenefits"));
const LandinBenefitCards = dynamic(() => import("@/components/LandinBenefitCards/LandinBenefitCards"));
const PortfolioSection = dynamic(() => import("@/components/PortfolioSection/PortfolioSection"));
const OurServices = dynamic(() => import("@/components/OurServices/OurServices"));
const LaunchSection = dynamic(() => import("@/components/LaunchSection/LaunchSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection/FAQSection"));
const JoinUsNow = dynamic(() => import("@/components/JoinUsNow/JoinUsNow"));

const Home = () => {
  return (
    <>
      <Head>
        <title>
          MarQ Networks | AI-Driven Digital Growth Partner | SEO, CRM & Web Solutions
        </title>
        <meta
          name="description"
          content="Unlock scalable growth with MarQ Networks, your AI-driven partner for digital transformation. Specializing in advanced SEO audits, smart CRM automation, and custom website development—accelerate your business results today."
        />
      </Head>

      <div className="bg-black text-white min-h-[70vh] pt-2 text-center">
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
        <div className="text-left w-full">
          <FAQSection />
        </div>
        <JoinUsNow />
      </div>
    </>
  );
};

export default Home;
