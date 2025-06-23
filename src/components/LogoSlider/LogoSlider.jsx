import React from "react";
import { motion } from "framer-motion";
import "./LogoSlider.css";


const logos = [
  { src: "/images/1.svg", alt: "Academy of Jesus Christ logo featuring a cross over an open book within a chapel arch, representing faith and learning" },
  { src: "/images/2.svg", alt: "Albaluce logo with minimalist geometric typography and a vertical dot pattern, symbolizing modern lighting and design" },
  { src: "/images/3.svg", alt: "Bananworld logo with a curved smile-like icon and rising digital dots, representing digital access and global connectivity" },
  { src: "/images/4.svg", alt: "Bond Interiors logo with an artistic handwritten 'B' merging into bold sans-serif text, symbolizing elegance in interior design" },
  { src: "/images/5.svg", alt: "Stylized ‘BW’ logo for Bananworld, with circular tech-like dots and bold rounded letters, representing global digital access and innovation" },
  { src: "/images/6.svg", alt: "Logo of Central Hospital Sialkot featuring a symbolic mother cradling a child within abstract leaves, representing care, protection, and family health" },
  { src: "/images/7.svg", alt: "Logo of Charles-Williams Construction Corp. featuring stylized initials ‘C’ and ‘W’ forming an abstract geometric shape inside a circular frame, symbolizing structure, strength, and architectural precision" },
  { src: "/images/8.svg", alt: "Logo of Christian Onyemem CPA Firm, PLLC featuring a bold monogram ‘C’ and ‘O’ within a shield-like geometric emblem, paired with the tagline ‘Commitment to Excellence" },
  { src: "/images/9.svg", alt: "Civitas Consulting Group, Inc logo with a bold circular ‘C’ and upward arrow symbolizing growth, strategy, and leadership, accompanied by the tagline ‘Leadership & Funding Solutions" },
  { src: "/images/10.svg", alt: "Collaborative Creative logo with bold dual ‘C’ circular emblem and futuristic typography, symbolizing innovation, design synergy, and forward-thinking" },
  { src: "/images/11.svg", alt: "Customex logo with bold typography and distinctive checkmark symbolizing precision, customer insight, and performance evaluation" },
  { src: "/images/12.svg", alt: "Uber logo" },
  { src: "/images/13.svg", alt: "Airbnb logo" },
  { src: "/images/14.svg", alt: "Tesla logo" },
  { src: "/images/15.svg", alt: "IBM logo" },
  { src: "/images/16.svg", alt: "Samsung logo" },
  { src: "/images/17.svg", alt: "Intel logo" },
  { src: "/images/18.svg", alt: "Oracle logo" },
  { src: "/images/19.svg", alt: "Zoom logo" },
  { src: "/images/20.svg", alt: "Shopify logo" },
  { src: "/images/21.svg", alt: "Pinterest logo" },
  { src: "/images/22.svg", alt: "Reddit logo" },
  { src: "/images/23.svg", alt: "Salesforce logo" },
  { src: "/images/24.svg", alt: "PayPal logo" },
  { src: "/images/25.svg", alt: "Twitch logo" },
  { src: "/images/26.svg", alt: "GitHub logo" },
  { src: "/images/27.svg", alt: "Bitbucket logo" },
  { src: "/images/28.svg", alt: "Baidu logo" },
  { src: "/images/29.svg", alt: "Xiaomi logo" },
  { src: "/images/30.svg", alt: "Huawei logo" },
  { src: "/images/31.svg", alt: "LG logo" },
  { src: "/images/32.svg", alt: "Nokia logo" },
  { src: "/images/33.svg", alt: "Canon logo" },
  { src: "/images/34.svg", alt: "Panasonic logo" },
  { src: "/images/35.svg", alt: "Philips logo" },
  { src: "/images/36.svg", alt: "Asus logo" },
  { src: "/images/37.svg", alt: "Lenovo logo" },
  { src: "/images/38.svg", alt: "Dell logo" },
  { src: "/images/39.svg", alt: "HP logo" },
  { src: "/images/40.svg", alt: "Acer logo" },
  { src: "/images/41.svg", alt: "Nvidia logo" },
  { src: "/images/42.svg", alt: "AMD logo" },
  { src: "/images/43.svg", alt: "Sony logo" },
  { src: "/images/44.svg", alt: "EA Sports logo" },
  { src: "/images/45.svg", alt: "Unity logo" },
  { src: "/images/46.svg", alt: "Epic Games logo" },
  { src: "/images/47.svg", alt: "Stripe logo" },
  { src: "/images/48.svg", alt: "ZoomInfo logo" },
];


const repeatedLogos = [...logos, ...logos, ...logos, ...logos , ...logos];


const LogoSlider = () => {
  return (
    <div className="logo-slider">
      <motion.div
        className="logo-track"
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 80,
          ease: "linear",
        }}
      >
        {repeatedLogos.map((logo, index) => (
          <div className="logo-item" key={index}>
            <img
              src={logo.src}
              alt={logo.alt}
              loading="eager"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoSlider;
