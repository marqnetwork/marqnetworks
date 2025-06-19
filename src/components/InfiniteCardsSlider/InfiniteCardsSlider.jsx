import React from "react";
import "./InfiniteCardsSlider.css";

const cards = [
  {
    header: "Excelus (Gov-IT)",
    subHeader: "Cyber-Security Overhaul",
    blurb: "Hardened infra, passed Federal audit with zero findings and doubled site speed.",
    stats: ["100% Compliance Pass", "70% Faster Load"],
    image: "/images/Gov-IT.png"
  },
  {
    header: "GA Tax Lien Boot Camp",
    subHeader: "Webinar-to-Boot-Camp Funnel",
    blurb: "Packed 250–400 attendees every 2 weeks and upsold a $3,999 boot-camp.",
    stats: ["37% Webinar→Sale Rate", "$3.2M Pipeline"],
    image: "/images/GA Tax.png"
  },
  {
    header: "JeCouturier",
    subHeader: "Custom E-Com for Tailoring",
    blurb: "Launched bespoke suit store—full funnel, CRM, and automation.",
    stats: ["4× Online Sales", "65% Repeat Orders"],
    image: "/images/JeCouturier.png"
  },
  {
    header: "Luna Health",
    subHeader: "MVP to Market in 90 Days",
    blurb: "Built & shipped tele-health app; rapid user uptake post-launch.",
    stats: ["45K App Downloads"],
    image: "/images/LunaHealth.png"
  },
  {
    header: "Collaborative Creative",
    subHeader: "Done-For-You Funnel Ops",
    blurb: "Managed email + funnel; doubled rev while client slept.",
    stats: ["120% Revenue Lift", "250% Email CTR"],
    image: "/images/Collaborative.png"
  },
  {
    header: "Way Fields Studio",
    subHeader: "AI-Powered Lead Engine",
    blurb: "Deployed AI site + ads, slashed acquisition costs.",
    stats: ["52% Lead-to-Call Rate", "40% Lower CAC"],
    image: "/images/Fields.png"
  }
];

const InfiniteCardsSlider = () => {
  const sliderCards = [...cards, ...cards]; // duplicated for infinite loop

  return (
    <div className="slider-wrapper">
      <div className="slider-glow" />
      <div className="slider-track">
        {sliderCards.map(({ image, header, subHeader, blurb, stats }, index) => (
          <div className="slider-card" key={index}>
            <div className="card-image-wrapper">
              <img src={image} alt={header} />
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
