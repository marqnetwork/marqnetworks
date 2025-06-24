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

    {/* old */}
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

    {/* <Head>
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
</Head> */}



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
