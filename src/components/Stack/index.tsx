"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const cards = [
  { id: 1, image: "/images/watch.png" },
  { id: 2, image: "/images/cap.png" },
  { id: 3, image: "/images/spray.png" }
];

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-5xl h-[90vh]">
          {cards.map((card, index) => {
            const start = index / cards.length;
            const end = (index + 1) / cards.length;

            const rawY = useTransform(
              scrollYProgress,
              [start, end],
              [`${100 + index * 30}px`, "0px"]
            );
            const rawOpacity = useTransform(
              scrollYProgress,
              [start, start + 0.05],
              [0, 1]
            );
            const rawScale = useTransform(
              scrollYProgress,
              [start, end],
              [0.95, 1]
            );

            const y = useSpring(rawY, {
              stiffness: 100,
              damping: 20
            });

            const opacity = useSpring(rawOpacity, {
              stiffness: 60,
              damping: 15
            });

            // const scale = useSpring(rawScale, {
            //   stiffness: 100,
            //   damping: 20
            // });

            const zIndex = cards.length + index;

            return (
              <motion.div
                key={card.id}
                className="absolute w-full h-full bg-neutral-900 rounded-2xl p-6 flex flex-col justify-between shadow-2xl"
                style={{ y, opacity, zIndex }}
              >
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-[500px] object-cover rounded-xl mb-6"
                />
                <div className="w-full bg-black text-white p-4 rounded-xl border border-neutral-800 shadow-inner">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm md:text-base font-medium">
                      Way Fields • <span className="text-neutral-400">2024</span>
                    </div>
                    <div className="flex-1 w-full max-w-md h-3 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-1 text-sm rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition">
                        E-Commerce
                      </button>
                      <button className="px-4 py-1 text-sm rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition">
                        Portfolio
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
