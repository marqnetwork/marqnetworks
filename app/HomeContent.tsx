
"use client";

import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import ResultsSection from "@/components/ResultsSection/ResultsSection";
import Work from "@/components/Work/Work";
import FeatureSection from "@/components/FeatureSection/FeatureSection";
import FeatureGridSection from "@/components/FeatureGridSection/FeatureGridSection";
import LandinBenefits from "@/components/LandinBenefits/LandinBenefits";
import LandinBenefitCards from "@/components/LandinBenefitCards/LandinBenefitCards";
import OurServices from "@/components/OurServices/OurServices";
import PortfolioSection from "@/components/PortfolioSection/PortfolioSection";
import LaunchSection from "@/components/LaunchSection/LaunchSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import JoinUsNow from "@/components/JoinUsNow/JoinUsNow";


const Home = () => {
  

  return (
    <>
      <main className="bg-black text-white min-h-[70vh] pt-2 text-center">
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
      </main>
    </>
  );
};

export default Home;
