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
        'Switching to Framer was incredibly smooth. It allowed us to move fast, publish instantly, and maintain our standards. Highly recommended.',
      author: 'Chris Frantz',
      role: 'CEO at Loops',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      bgColor: 'bg-[#0f0f0f]',
      productImage: '/images/sample1.avif',
      linkLabel: 'Loops',
      linkUrl: 'https://loops.so/',
    },
    {
      id: 2,
      quote:
        'Framer gives us everything we need to move fast. We don’t wait on dev. We don’t compromise on design.',
      author: 'Henry Mitchell',
      role: 'Head of Design at Hospitality',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      bgColor: 'bg-[#0f0f0f]',
      productImage: '/images/sample1.avif',
      linkLabel: 'Perplexity',
      linkUrl: 'https://www.perplexity.ai/',
    },
    {
      id: 3,
      quote:
        'The design system capabilities are unmatched. We’ve created consistent experiences across all our products.',
      author: 'Sarah Chen',
      role: 'Design Lead at TechCorp',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      bgColor: 'bg-[#0f0f0f]',
      productImage: '/images/sample1.avif',
      linkLabel: 'Visual Electric',
      linkUrl: 'https://visualelectric.com/',
    },
    {
      id: 4,
      quote:
        'From design to deployment, Framer lets us own our product workflow end-to-end.',
      author: 'David Kim',
      role: 'CTO at Lemni',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      bgColor: 'bg-[#0f0f0f]',
      productImage: '/images/sample1.avif',
      linkLabel: 'Lemni',
      linkUrl: 'https://lemni.com/',
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
      transition: { duration: 0.6 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.6 },
    }),
  };

  const paginate = (newDirection: number) => {
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
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Main Slider Container */}
      <div className="w-full max-w-[1200px] h-[85vh] rounded-3xl overflow-hidden shadow-xl flex">
        {/* Left Side */}
        <div
          className={`w-1/2 flex flex-col justify-between px-10 py-12 ${current.bgColor} transition-colors duration-500`}
        >
          <div>
            <img src={current.logo} alt="Logo" className="w-8 h-8 mb-10" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <blockquote className="text-2xl font-medium text-white max-w-md mb-6 leading-relaxed">
                  “{current.quote}”
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={current.authorImage}
              alt={current.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-white font-semibold">{current.author}</div>
              <div className="text-white/60 text-sm">{current.role}</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-[#f15a29] flex items-center justify-center p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-xl w-full h-full flex items-center justify-center overflow-hidden"
            >
              <img
                src={current.productImage}
                className="max-w-[85%] max-h-[85%] object-contain"
                alt="Product"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="w-full max-w-[1200px] mt-6 flex flex-col items-center">
        <div className="flex justify-center gap-x-8 text-white/60 text-sm mb-4">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition hover:text-white ${
                currentSlide === idx ? 'text-white font-medium' : ''
              }`}
            >
              {item.linkLabel}
            </button>
          ))}
        </div>
        <div className="flex justify-end w-full">
          <div className="flex space-x-3">
            <button
              onClick={() => paginate(-1)}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            >
              <ChevronLeft className="text-white w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            >
              <ChevronRight className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
