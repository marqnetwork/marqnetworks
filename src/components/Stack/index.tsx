// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// const cards = [
//   {
//     id: 1,
//     image: "/images/watch.png",
//     title: " Ping – Home Marketplace",
//     year: "2021",
//     progress: 95,
//     tags: ["PropTech", "AI " ,"Marketplace"]
//   },
//   {
//     id: 2,
//     image: "/images/cap.png",
//     title: "GA Tax Lien Boot Camp",
//     year: "2019 ",
//     progress: 80,
//     tags: ["EdTech", "Funnels ", "Automation"]
//   },
//   {
//     id: 3,
//     image: "/images/spray.png",
//     title: "Commaa Clothing",
//     year: "2023",
//     progress: 70,
//     tags: ["e-Commerce", " Mobile ", "Fashion"]
//   }
// ];

// export default function StackingCards() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const transforms = cards.map((_, index) => {
//     const start = index / cards.length;
//     const end = (index + 1) / cards.length;

//     const rawY = useTransform(scrollYProgress, [start, end], [`${100 + index * 30}px`, "0px"]);
//     const rawOpacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
//     const rawScale = useTransform(scrollYProgress, [start, end], [0.95, 1]);

//     return {
//       y: useSpring(rawY, { stiffness: 100, damping: 20 }),
//       opacity: useSpring(rawOpacity, { stiffness: 60, damping: 15 }),
//       scale: useSpring(rawScale, { stiffness: 100, damping: 20 })
//     };
//   });

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full"
//       style={{ height: `${cards.length * 100}vh` }}
//     >
//       <div className="sticky top-0 h-screen flex items-center justify-center">
//         <div className="relative w-full max-w-5xl h-[90vh]">
//           {cards.map((card, index) => {
//             const { y, opacity } = transforms[index];
//             const zIndex = cards.length + index;

//             return (
//               <motion.div
//                 key={card.id}
//                 className="absolute w-full h-full bg-neutral-900 rounded-2xl p-6 flex flex-col justify-between shadow-2xl"
//                 style={{ y, opacity, zIndex }}
//               >
//                 <img
//                   src={card.image}
//                   alt=""
//                   className="w-full h-[500px] object-cover rounded-xl mb-6"
//                 />
//                 <div className="w-full bg-black text-white p-4 rounded-xl border border-neutral-800 shadow-inner">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                     {/* Left Title + Year */}
//                     <div className="px-3 py-1 bg-neutral-950/80 border border-neutral-800 text-sm rounded-full shadow">
//                       {card.title} <span className="text-neutral-400 ml-1">• {card.year}</span>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="flex-1 w-full max-w-md h-3 bg-neutral-800 rounded-full overflow-hidden relative">
//                       <div
//                         className="h-full bg-green-500 rounded-full"
//                         style={{
//                           width: `${card.progress}%`,
//                           backgroundImage: "repeating-linear-gradient(45deg, #22c55e 0, #22c55e 5px, #15803d 5px, #15803d 10px)"
//                         }}
//                       />
//                     </div>

//                     {/* Tags */}
//                     <div className="flex gap-2 flex-wrap justify-center">
//                       {card.tags.map((tag, i) => (
//                         <button
//                           key={i}
//                           className="px-3 py-1 text-sm rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition"
//                         >
//                           {tag}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Ping – Home Marketplace",
    year: "2021",
    progress: 95,
    tags: ["PropTech", "AI", "Marketplace"],
    bgImage: "/images/watch.png", 
  },
  {
    id: 2,
    title: "GA Tax Lien Boot Camp",
    year: "2019",
    progress: 80,
    tags: ["EdTech", "Funnels", "Automation"],
    bgImage: "/images/cap.png",
  },
  {
    id: 3,
    title: "Commaa Clothing",
    year: "2021",
    progress: 70,
    tags: ["e-Commerce", "Mobile", "Fashion"],
    bgImage: "/images/spray.png",
  },
];

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHeight = (cards.length + 2) * 600 + "vh";

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

interface CardItemProps {
  card: {
    id: number;
    title: string;
    year: string;
    progress: number;
    tags: string[];
    bgImage: string;
  };
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function CardItem({ card, index, totalCards, containerRef }: CardItemProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const start = index / totalCards;
  const end = start + 1 / totalCards;

  const y = useTransform(scrollYProgress, [start, end], [900, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.1, end)],
    [0, 1]
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
          {card.tags.map((tag, i) => (
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
