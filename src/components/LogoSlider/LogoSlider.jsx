import React from "react";
import { motion } from "framer-motion";
import "./LogoSlider.css";

// Create an array of logo objects with unique alt text
const logos = [
  { src: "/images/1.svg", alt: "Adobe logo" },
  { src: "/images/2.svg", alt: "AWS logo" },
  { src: "/images/3.svg", alt: "Slack logo" },
  { src: "/images/4.svg", alt: "Netflix logo" },
  { src: "/images/5.svg", alt: "Facebook logo" },
  { src: "/images/6.svg", alt: "Google logo" },
  { src: "/images/7.svg", alt: "Microsoft logo" },
  { src: "/images/8.svg", alt: "LinkedIn logo" },
  { src: "/images/9.svg", alt: "Twitter logo" },
  { src: "/images/10.svg", alt: "Spotify logo" },
  { src: "/images/11.svg", alt: "Dropbox logo" },
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

// Duplicate the list for infinite scroll effect
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
