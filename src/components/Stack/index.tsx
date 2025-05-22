"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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
  }
]

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerHeight = `${cards.length * 100}vh`

  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-5xl mx-auto h-[70vh]">
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
  )
}

function CardItem({ card, index, totalCards, containerRef }: any) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Smooth animation ranges
  const cardStart = index / totalCards
  const cardEnd = (index + 1) / totalCards
  
  // Stacking effect with 20px overlap
  const stackOffset = `${index * 20}px`

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    ["100%", stackOffset]
  )

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [0.95, 1]
  )

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.2],
    [0, 1]
  )

  const zIndex = index + 1

  return (
    <motion.div
      className={`absolute inset-0 rounded-2xl ${card.color} shadow-xl p-8 flex flex-col justify-between`}
      style={{
        y,
        scale,
        opacity,
        zIndex,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
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
  )
}