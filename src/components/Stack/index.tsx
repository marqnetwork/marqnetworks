"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Ping – Home Marketplace",
    year: "2021",
    progress: 95,
    tags: ["PropTech", "AI", "Marketplace"],
    bgImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "GA Tax Lien Boot Camp",
    year: "2019",
    progress: 80,
    tags: ["EdTech", "Funnels", "Automation"],
    bgImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Commaa Clothing",
    year: "2021",
    progress: 70,
    tags: ["e-Commerce", "Mobile", "Fashion"],
    bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Tech Innovation Hub",
    year: "2023",
    progress: 85,
    tags: ["Innovation", "Startup", "Tech"],
    bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
  },
];

export default function StackingCards() {
  const containerRef = useRef(null);
  // Increased container height for slower transitions
  const containerHeight = "300vh";

  return (
    <div className="bg-black min-h-screen">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: containerHeight }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-[920px] h-[520px] mx-auto">
            {cards.map((card, index) => (
              <CardItem
                key={card.id}
                card={card}
                index={index}
                totalCards={cards.length}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardItem({ card, index, totalCards, containerRef }: any) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Slower animation timing (75% of section)
  const sectionStart = index / totalCards;
  const sectionEnd = (index + 1) / totalCards;
  const animateInEnd = sectionStart + 0.75 / totalCards;

  // Animation values with slower movement
  const y = useTransform(
    scrollYProgress,
    [sectionStart, animateInEnd],
    [index === 0 ? 0 : 1000, 0] // Reduced vertical distance
  );

  const opacity = useTransform(
    scrollYProgress,
    [sectionStart, animateInEnd],
    [index === 0 ? 1 : 1, 1] // Slower fade-in
  );

  const scale = useTransform(
    scrollYProgress,
    [sectionStart, animateInEnd],
    [index === 0 ? 1 : 1, 1] // Subtle scale effect
  );

  const zIndex = index + 1;

  return (
    <motion.div
      className="absolute w-full max-w-[920px] h-[520px] rounded-[20px] overflow-hidden shadow-[0_0_24px_rgba(0,0,0,0.8)] border border-[#1a1a1a]"
      style={{
        backgroundImage: `url(${card.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        y,
        opacity,
        scale,
        zIndex,
      }}
    >
      <div className="bg-[#0f0f0f]/90 backdrop-blur-md w-full px-4 py-3 flex flex-col gap-3 absolute bottom-0">
        <div className="flex items-center gap-2 text-white font-medium">
          <span className="text-sm">{card.title}</span>
          <span className="text-white/50 text-xs">•</span>
          <span className="text-white/50 text-sm">{card.year}</span>
        </div>

        <div className="w-full h-[12px] bg-[#1a1a1a] rounded-full overflow-hidden border border-[#1f1f1f]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${card.progress}%`,
              backgroundImage:
                "repeating-linear-gradient(45deg, #23c55e, #23c55e 4px, #198c41 4px, #198c41 8px)",
            }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {card.tags.map((tag: any, i: any) => (
            <span
              key={i}
              className="bg-[#1a1a1a] px-3 py-[6px] text-sm text-white/80 rounded-md border border-[#2a2a2a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}