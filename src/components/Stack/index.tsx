"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const cards = [
  {
    id: 1,
    image: "/images/watch.png",
    title: " Ping – Home Marketplace",
    year: "2021",
    progress: 95,
    tags: ["PropTech", "AI " ,"Marketplace"]
  },
  {
    id: 2,
    image: "/images/cap.png",
    title: "GA Tax Lien Boot Camp",
    year: "2019 ",
    progress: 80,
    tags: ["EdTech", "Funnels ", "Automation"]
  },
  {
    id: 3,
    image: "/images/spray.png",
    title: "Commaa Clothing",
    year: "2023",
    progress: 70,
    tags: ["e-Commerce", " Mobile ", "Fashion"]
  }
];

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const transforms = cards.map((_, index) => {
    const start = index / cards.length;
    const end = (index + 1) / cards.length;

    const rawY = useTransform(scrollYProgress, [start, end], [`${100 + index * 30}px`, "0px"]);
    const rawOpacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
    const rawScale = useTransform(scrollYProgress, [start, end], [0.95, 1]);

    return {
      y: useSpring(rawY, { stiffness: 100, damping: 20 }),
      opacity: useSpring(rawOpacity, { stiffness: 60, damping: 15 }),
      scale: useSpring(rawScale, { stiffness: 100, damping: 20 })
    };
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
            const { y, opacity } = transforms[index];
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
                    {/* Left Title + Year */}
                    <div className="px-3 py-1 bg-neutral-950/80 border border-neutral-800 text-sm rounded-full shadow">
                      {card.title} <span className="text-neutral-400 ml-1">• {card.year}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 w-full max-w-md h-3 bg-neutral-800 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${card.progress}%`,
                          backgroundImage: "repeating-linear-gradient(45deg, #22c55e 0, #22c55e 5px, #15803d 5px, #15803d 10px)"
                        }}
                      />
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap justify-center">
                      {card.tags.map((tag, i) => (
                        <button
                          key={i}
                          className="px-3 py-1 text-sm rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition"
                        >
                          {tag}
                        </button>
                      ))}
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








// "use client";

// import type React from "react";

// import { useRef } from "react";

// import { motion, useScroll, useTransform } from "framer-motion";

// const cards = [
//   {
//     id: 1,

//     title: "Card One",

//     description: "This is the first card in our stacking sequence.",

//     color: "bg-rose-400",
//   },

//   {
//     id: 2,

//     title: "Card Two",

//     description: "As you scroll, this card will stack on top of the first one.",

//     color: "bg-amber-400",
//   },

//   {
//     id: 3,

//     title: "Card Three",

//     description: "Keep scrolling to see this card stack on top.",

//     color: "bg-emerald-400",
//   },

//   {
//     id: 4,

//     title: "Card Four",

//     description: "This is the final card in our stacking sequence.",

//     color: "bg-sky-400",
//   },
// ];

// export default function StackingCards() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // The height needs to be sufficient to allow for scrolling

//   // const containerHeight = (cards.length + 1) * 600 + "vh";
//   const containerHeight = (cards.length + 1) * 600 + "px";


//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full pt-[100vh]"
//       style={{ height: containerHeight }}
//     >
//       <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
//         <div className="relative w-full max-w-5xl mx-auto h-[80vh]">
//           {cards.map((card, index) => (
//             <CardItem
//               key={card.id}
//               card={card}
//               index={index}
//               totalCards={cards.length}
//               containerRef={containerRef}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface CardItemProps {
//   card: {
//     id: number;

//     title: string;

//     description: string;

//     color: string;
//   };

//   index: number;

//   totalCards: number;

//   containerRef: React.RefObject<HTMLDivElement>;
// }

// function CardItem({ card, index, totalCards, containerRef }: CardItemProps) {
//   const { scrollYProgress } = useScroll({
//     target: containerRef,

//     offset: ["start start", "end end"],
//   });

//   // Calculate the scroll range for this card

//   const start = index / totalCards;

//   const end = start + 1 / totalCards;

//   // Transform values based on scroll progress

//   const y = useTransform(scrollYProgress, [start, end], [900, 0]);

//   const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);

//   const opacity = useTransform(
//     scrollYProgress,
//     [start, Math.min(start + 0.1, end)],
//     [0, 1]
//   );

//   const zIndex = index + 1;

//   return (
//     <motion.div
//       className={`absolute inset-0 rounded-2xl ${card.color} shadow-xl p-8 flex flex-col justify-between`}
//       style={{
//         y,

//         scale,

//         opacity,

//         zIndex,
//       }}
//     >
//       <div>
//         <h2 className="text-3xl font-bold text-white mb-2">{card.title}</h2>
//         <p className="text-white/90 text-lg">{card.description}</p>
//       </div>
//       <div className="self-end">
//         <span className="text-white/70 text-xl font-medium">
//           {index + 1}/{totalCards}
//         </span>
//       </div>
//     </motion.div>
//   );
// }
