"use client";

import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Immediate load component
import Hero from "@/components/Hero/Hero";

// Lazy-loaded components
const AboutSection = dynamic(
  () => import("@/components/AboutSection/AboutSection")
);
const ResultsSection = dynamic(
  () => import("@/components/ResultsSection/ResultsSection")
);
const Work = dynamic(() => import("@/components/Work/Work"));
const FeatureSection = dynamic(
  () => import("@/components/FeatureSection/FeatureSection")
);
const FeatureGridSection = dynamic(
  () => import("@/components/FeatureGridSection/FeatureGridSection")
);
const LandinBenefits = dynamic(
  () => import("@/components/LandinBenefits/LandinBenefits")
);
const LandinBenefitCards = dynamic(
  () => import("@/components/LandinBenefitCards/LandinBenefitCards")
);
const PortfolioSection = dynamic(
  () => import("@/components/PortfolioSection/PortfolioSection")
);
const OurServices = dynamic(
  () => import("@/components/OurServices/OurServices")
);
const LaunchSection = dynamic(
  () => import("@/components/LaunchSection/LaunchSection")
);
const FAQSection = dynamic(() => import("@/components/FAQSection/FAQSection"));
const JoinUsNow = dynamic(() => import("@/components/JoinUsNow/JoinUsNow"));

const Home = () => {
  const title =
    "MarQ Networks | AI-Driven Digital Growth Partner | SEO, CRM & Web Solutions";
  const description =
    "Unlock scalable growth with MarQ Networks, your AI-driven partner for digital transformation. Specializing in advanced SEO audits, smart CRM automation, and custom website development—accelerate your business results today.";

  return (
    <>
      {/* <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://marqnetworks.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://marqnetworks.com/og-image.jpg"
        />{" "}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://marqnetworks.com/og-image.jpg"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}

    <Head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://marqnetworks.com" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://marqnetworks.com/images/og-image.png" />
  <meta property="og:site_name" content="MarQ Networks" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:updated_time" content="2025-06-24T00:00:00Z" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://marqnetworks.com/images/og-image.png" />

  <link rel="canonical" href="https://marqnetworks.com" />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MarQ Networks",
        "url": "https://marqnetworks.com",
        "logo": "https://marqnetworks.com/logo.png",
        "sameAs": ["https://www.linkedin.com/company/marqnetworks"],
        "description": description,
      }),
    }}
  />
</Head>



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
