

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
  const containerHeight = (cards.length + 1) * 1000 + "vh";

  return (
    <div
      ref={containerRef}
      className="relative w-full pt-[100vh]"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-[520px] flex justify-center items-end">
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
  );
}

function CardItem({ card, index, totalCards, containerRef }:any) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each card appears at different scroll points
  // Card 1 at 0-25%, Card 2 at 25-50%, Card 3 at 50-75%, Card 4 at 75-100%
  const cardStart = index * (0.5 / totalCards);
  const cardEnd = (index + 1) * (1 / totalCards);

  // Y position: cards come from bottom and stack
  const y = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
    [1200, 0, 0, 0]
  );

  // Scale animation
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 1, cardEnd - 1, cardEnd],
    [1, 1, 1, 1]
  );

  // Opacity animation
  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.01, cardEnd - 0.05, cardEnd],
    [0, 1, 1, 1]
  );

  const zIndex = index + 1;

  return (
    <motion.div
      className="absolute rounded-[20px] w-[920px] h-[520px] overflow-hidden shadow-[0_0_24px_rgba(0,0,0,0.8)] flex flex-col justify-end border border-[#1a1a1a]"
      style={{
        backgroundImage: `url(${card.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        y,
        scale,
        opacity,
        zIndex,
      }}
    >
      {/* Bottom bar content */}
      <div className="bg-[#0f0f0f]/90 backdrop-blur-md w-full px-4 py-3 flex flex-col gap-3">
        {/* Title + Year */}
        <div className="flex items-center gap-2 text-white font-medium">
          <span className="text-sm">{card.title}</span>
          <span className="text-white/50 text-xs">•</span>
          <span className="text-white/50 text-sm">{card.year}</span>
        </div>

        {/* Progress bar */}
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

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {card.tags.map((tag:any, i:any) => (
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