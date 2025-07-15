import React from "react";
import "./InfiniteCardsSlider.css";

const cards = [
  {
    header: "Excelus (Gov-IT)",
    subHeader: "AI Workflow Transformation",
    blurb:
      "Hardened infra via AI workflow transformation services—zero audit findings and 70% faster speed.",
    stats: ["100% Compliance Pass", "70% Faster Load"],
    image: "/images/Gov-IT.png",
    alt: "MarQ’s federal IT overhaul with 100% compliance pass and 70% faster load time for secure infrastructure"
  },
  {
    header: "GA Tax Lien Boot Camp",
    subHeader: "AI-Powered CRM Funnel",
    blurb:
      "Packed webinars using AI-powered CRM automation workflows, upselling a $3,999 boot camp.",
    stats: ["37% Webinar→Sale Rate", "$3.2M Pipeline"],
    image: "/images/GA Tax.png",
    alt: "High-converting webinar funnel leading to live bootcamp sales—37% close rate and $3.2M pipeline"
  },
  {
    header: "JeCouturier",
    subHeader: "Headless E-Com Build",
    blurb:
      "Headless ecommerce developers launched bespoke suit store—full funnel, CRM, and automation.",
    stats: ["4× Online Sales", "65% Repeat Orders"],
    image: "/images/JeCouturier.png",
    alt: "Tailored e-commerce success story—bespoke suit store with CRM, automation, and 4× online sales"
  },
  {
    header: "Luna Health",
    subHeader: "AI-Optimized Tele-Health MVP",
    blurb:
      "AI performance optimization for web applications sped adoption—MVP to market in 90 days.",
    stats: ["45K App Downloads"],
    image: "/images/LunaHealth.png",
    alt: "Luna Health app—MarQ delivered MVP in 90 days with 45K downloads and rapid user growth post-launch"
  },
  {
    header: "Collaborative Creative",
    subHeader: "Predictive AI Funnel Ops",
    blurb:
      "AI funnel optimization with predictive modeling doubled revenue and boosted email CTR.",
    stats: ["120% Revenue Lift", "250% Email CTR"],
    image: "/images/Collaborative.png",
    alt: "Email and funnel optimization results with MarQ Growth Pod—120% revenue lift and 250% click-through rate"
  },
  {
    header: "Way Fields Studio",
    subHeader: "B2B Lead Gen Engine",
    blurb:
      "Lead generation services for B2B slashed customer acquisition costs while lifting conversions.",
    stats: ["52% Lead-to-Call Rate", "40% Lower CAC"],
    image: "/images/Fields.png",
    alt: "AI-powered lead engine results—52% lead-to-call rate and major drop in customer acquisition cost"
  }
];


const InfiniteCardsSlider = () => {
  const sliderCards = [...cards, ...cards]; // duplicated for infinite loop

  return (
    <div className="slider-wrapper">
      <div className="slider-glow" />
      <div className="slider-track">
        {sliderCards.map(({ image, header, subHeader, blurb, stats ,alt }, index) => (
          <div className="slider-card" key={index}>
            <div className="card-image-wrapper">
              <img src={image} alt={alt} />
              <div className="card-content-overlay">
                <h3 className="card-header">{header}</h3>
                <p className="card-sub-header">{subHeader}</p>
                <div className="about__divider" />
                <p className="card-blurb">{blurb}</p>
                <div className="stats">
                  {stats.map((stat, i) => (
                    <span key={i} className="stat-badge">{stat}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCardsSlider;
