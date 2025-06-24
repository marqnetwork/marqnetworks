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
  { src: "/images/10.svg", alt: "Customex logo with bold typography and distinctive checkmark symbolizing precision, customer insight, and performance evaluation" },
  { src: "/images/11.svg", alt: "Collaborative Creative logo with bold dual ‘C’ circular emblem and futuristic typography, symbolizing innovation, design synergy, and forward-thinking" },
  { src: "/images/12.svg", alt: "Digital District logo with stacked bold text and a clean, modern design representing digital innovation and creativity" },
  { src: "/images/13.svg", alt: "Dyson & Dyson News Network logo featuring overlapping bold capital ‘D’ letters in a vertical box, symbolizing authority in news and broadcasting" },
  { src: "/images/14.svg", alt: "Enigma Sports logo featuring a bold geometric shield-like emblem above the name in all caps, symbolizing strength, movement, and precision" },
  { src: "/images/15.svg", alt: "Excelous logo with a stylized lowercase ‘e’ enclosed in a circular design, symbolizing precision, innovation, and global focus" },
  { src: "/images/16.svg", alt: "GA Tax Lien Bootcamp logo featuring a house-shaped hexagon enclosing ‘GA’, with bold ‘Tax Lien’ text and military-style dog tags below, symbolizing training, property, and strategy" },
  { src: "/images/17.svg", alt: "Global Engagement LLC logo featuring a stylized globe with digital pixel transition effect, symbolizing international connectivity and modern solutions" },
  { src: "/images/18.svg", alt: "Government Contracting Simplified logo with bold geometric checkmark icon and tagline: ‘Make the federal government your next customer" },
  { src: "/images/19.svg", alt: "Grow 2 Scale logo with bold white text inside a rectangular border, featuring the tagline: ‘Small Business Education for Entrepreneurs" },
  { src: "/images/20.svg", alt: "House of Furnishes logo showing a roof structure above the brand name, with an armchair and lamp inside a doorway and the website URL: Houseoffurnishes.com" },
  { src: "/images/21.svg", alt: "Logo with bold ‘I AM’ in geometric font, overlaid by a cursive signature-style ‘Karen Swain" },
  { src: "/images/22.svg", alt: "iBOXG logo with clean bold font and a purple dot above the letter ‘i’ on a dark background" },
  { src: "/images/23.svg", alt: "IRIS logo with sleek geometric lettering and a stylized ‘S’ on a dark background" },
  { src: "/images/24.svg", alt: "Karen Swain logo with elegant cursive script and tagline ‘Your Business Doctor™’ on a black background" },
  { src: "/images/25.svg", alt: "MAYLA Network Pvt. Ltd. logo with bold English typography and stylized Urdu text on the right, set against a black background" },
  { src: "/images/26.svg", alt: "M.A Auto Body and Repair logo featuring a sleek car silhouette merged with a wrench graphic, displayed above bold and modern text" },
  { src: "/images/27.svg", alt: "MarQ Disseminate logo with bold futuristic typography, featuring a scissor icon cleverly integrated between the words to symbolize precision and content cutting" },
  { src: "/images/28.svg", alt: "Mayla Mobile logo with elegant English and Urdu typography integrated by a sweeping underline, symbolizing connectivity and cultural harmony" },
  { src: "/images/29.svg", alt: "Mr Bob Barbeque logo featuring skewered meat cubes on a fork with flames above, bold text underneath" },
  { src: "/images/30.svg", alt: "Elegant handwritten logo reading ‘Mudassar Ahmad’ in flowing script with a large, stylized capital A intersecting the full name" },
  { src: "/images/31.svg", alt: "Modern black-and-white logo reading ‘Outlet 404’ with a bold stylized ‘404’ inside an inverted triangle and gradient text effect on the word ‘Outlet" },
  { src: "/images/32.svg", alt: "Sleek black-and-white logo featuring a lightbulb icon and the words ‘Overage Refund Blueprint’ in futuristic typography" },
  { src: "/images/33.svg", alt: "White logo on dark background with a gear symbol containing circuit lines, next to the words ‘ProSEC Solutions, LLC’ and the tagline ‘Infrastructure Protection Engineering & Consulting’" },
  { src: "/images/34.svg", alt: "White logo on dark background showing rooftops, skyscrapers, and a wavy base, next to the words ‘Quality Property Sales" },
  { src: "/images/35.svg", alt: "Abstract triangle-style white logo above the bold letters ‘RS-CDC’ with tagline: ‘Improving the Quality of Life for Residents of the Community" },
  { src: "/images/36.svg", alt: "Modern cube-style white logo to the left of the bold text ‘Ship My Parcel’ with minimalist font and black background" },
  { src: "/images/37.svg", alt: "Minimalist anchor-style monogram logo with a vertical bar, curved base, and centered circle on a black background" },
  { src: "/images/38.svg", alt: "Bold logo with a geometric wolf head facing right, flanked by arrows, alongside stylized text reading ‘Stark Industries’ with a star integrated into the letter A" },
  { src: "/images/39.svg", alt: "Logo for The Great Food China featuring a traditional Chinese gate silhouette in front of a stylized full moon, with curved text above and beside the emblem" },
  { src: "/images/40.svg", alt: "Logo for The Pistis Group LLC with modern geometric emblem resembling a folded hexagonal structure, paired with clean sans-serif text" },
  { src: "/images/41.svg", alt: "Logo for Trient featuring a bold square icon and the text ‘Trient – Driven by Sustainability’ in a clean modern font" },
  { src: "/images/42.svg", alt: "Logo for ‘The 2023 Women of Influence’ featuring bold text blocks with a modern layout and stacked typography" },
  { src: "/images/43.svg", alt: "Logo for Work Match Inc. with a bold monogram of the letters W and M forming a stylized abstract icon" },
  { src: "/images/44.svg", alt: "Yachtszy.com logo featuring a stylized yacht bow with radiating signal lines above, symbolizing marine services" },
  { src: "/images/45.svg", alt: "Zabeta International logo with a bold stylized Z embedded in a geometric D-shape and clean modern text layout" },
  { src: "/images/46.svg", alt: "JD logo with a guitar neck motif inside a red circle surrounded by metallic rings and stylized headphones" },
  { src: "/images/47.svg", alt: "Light pink comma symbol next to lowercase grey text ‘comma soft’ on a dark background" },
  { src: "/images/48.svg", alt: "White bold wordmark ‘PING’ in all caps with rounded edges and a registered trademark symbol" },
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
