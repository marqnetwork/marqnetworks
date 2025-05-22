"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const cards = [
  { id: 1, image: "images/watch.png" },
  { id: 2, image: "images/cap.png" },
  { id: 3, image: "images/spray.png" }
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
        <div className="relative w-full max-w-5xl mx-auto h-[90vh]"> {/* Increased height */}
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

  const cardStart = index / totalCards
  const cardEnd = (index + 1) / totalCards

  const stackOffset = `${index * 20}px`

  const y = useTransform(scrollYProgress, [cardStart, cardEnd], ["100%", stackOffset])
  const scale = useTransform(scrollYProgress, [cardStart, cardEnd], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [cardStart, cardStart + 0.2], [0, 1])
  const zIndex = index + 1

  return (
    <motion.div
      className="absolute inset-0 bg-neutral-900 rounded-2xl shadow-xl p-6 flex flex-col justify-between"
      style={{ y, scale, opacity, zIndex }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
    >
      {/* Image Section */}
      {card.image && (
        <img 
          src={card.image} 
          alt="Card Image"
          className="w-full rounded-xl object-cover h-[550px] mb-6" // Increased height
        />
      )}

      {/* Footer Section */}
      <div className="w-full bg-[#0a0a0a] text-white p-4 rounded-xl shadow-inner border border-neutral-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="text-sm md:text-base font-medium">
            Way Fields • <span className="text-neutral-400">2024</span>
          </div>

          <div className="flex-1 w-full max-w-md h-3 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
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
  )
}
