'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './style.css';


const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote:
        "Framer gives us everything we need to move fast. We don’t wait on dev. We don’t compromise on design.",
      author: 'Henry Mitchell',
      role: 'Head of Design at Hospitality',
      bgColor: 'bg-[#0f0f0f]',
      productImage: '/api/placeholder/400/300',
    },
    {
      id: 2,
      quote:
        "Switching to Framer was incredibly smooth. It allowed us to move fast, publish instantly, and maintain our standards.",
      author: 'Chris Frantz',
      role: 'CEO at Loops',
      bgColor: 'bg-[#111827]',
      productImage: '/api/placeholder/400/300',
    },
    {
      id: 3,
      quote:
        "The design system capabilities are unmatched. We've been able to create consistent experiences across all our products.",
      author: 'Sarah Chen',
      role: 'Design Lead at TechCorp',
      bgColor: 'bg-[#1f2937]',
      productImage: '/api/placeholder/400/300',
    },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    }),
  };

  const paginate = (newDirection: React.SetStateAction<number>) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentSlide];

  return (
    <div className=" h-screen w-[1200px] m-auto new  bg-black px-4 ">
      <div className="w-full max-w-[1200px] h-[85vh] m-[autp] rounded-3xl overflow-hidden shadow-xl flex relative ">
        {/* Left Side */}
        <div className={`w-1/2  flex flex-row justify-around gap-6 bg-red-400 ${current.bgColor} transition-colors duration-500`}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-white  flex justify-between flex-col h-[200px] p-[20px]"
            >
              <blockquote className="text-[16px] leading-snug font-semibold text-justify  w-[350px]">
                “{current.quote}”
              </blockquote>
              <div className="flex items-center space-x-4 bg-y">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                  {current.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-white font-medium text-lg">
                    {current.author}
                  </div>
                  <div className="text-white/60 text-sm">{current.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-[#0f0f0f] flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full h-[90%]  rounded-2xl  p-6 shadow-2xl"
            >
           
          <img src="/images/cap.png"  className="card-image" />
            
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
      
      </div>
        <div className="    flex justify-end space-x-4">
          <button
            onClick={() => paginate(-1)}
            className="bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-md transition-all"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-md transition-all"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </div>
    </div>
    
  );
};

export default TestimonialSlider;
