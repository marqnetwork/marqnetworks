"use client";

import type React from "react";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    id: 1,

    title: "Card One",

    description: "This is the first card in our stacking sequence.",

    color: "bg-rose-400",
  },

  {
    id: 2,

    title: "Card Two",

    description: "As you scroll, this card will stack on top of the first one.",

    color: "bg-amber-400",
  },

  {
    id: 3,

    title: "Card Three",

    description: "Keep scrolling to see this card stack on top.",

    color: "bg-emerald-400",
  },

  {
    id: 4,

    title: "Card Four",

    description: "This is the final card in our stacking sequence.",

    color: "bg-sky-400",
  },
];

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The height needs to be sufficient to allow for scrolling

  const containerHeight = (cards.length + 1) * 100 + "vh";

  return (
    <div
      ref={containerRef}
      className="relative w-full pt-[100vh]"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto h-[80vh]">
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

interface CardItemProps {
  card: {
    id: number;

    title: string;

    description: string;

    color: string;
  };

  index: number;

  totalCards: number;

  containerRef: React.RefObject<HTMLDivElement>;
}

function CardItem({ card, index, totalCards, containerRef }: CardItemProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,

    offset: ["start start", "end end"],
  });

  // Calculate the scroll range for this card

  const start = index / totalCards;

  const end = start + 1 / totalCards;

  // Transform values based on scroll progress

  const y = useTransform(scrollYProgress, [start, end], [1000, 0]);

  const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);

  const opacity = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.1, end)],
    [0, 1]
  );

  const zIndex = index + 1;

  return (
    <motion.div
      className={`absolute inset-0 rounded-2xl ${card.color} shadow-xl p-8 flex flex-col justify-between`}
      style={{
        y,

        scale,

        opacity,

        zIndex,
      }}
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">{card.title}</h2>
        <p className="text-white/90 text-lg">{card.description}</p>
      </div>
      <div className="self-end">
        <span className="text-white/70 text-xl font-medium">
          {index + 1}/{totalCards}
        </span>
      </div>
    </motion.div>
  );
}
