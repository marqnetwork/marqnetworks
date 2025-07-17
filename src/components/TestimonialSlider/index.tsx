'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './style.css';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote:
        'marQ Networks didn’t just build our platform—they became our first users, transforming paper concepts into a seamless digital experience. Their deep business insight, flawless delivery, and standout post-launch support make them the partner we’ll choose again—and you should, too.',
      author: 'Chris Frantz',
      role: 'CEO at Loops',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      videoUrl: '/images/test1.mp4',
      linkLabel: 'Loops',
      linkUrl: 'https://loops.so/',
      leftBg: '#080d0d',
      rightBg: '#233b38',
    },
    {
      id: 2,
      quote:
        'Danielle Winfield Wimberly calls marQ Networks and Rameez’s team the ultimate all-in-one partner—combining smart strategy with hands-on execution of sales funnels, email sequences, and CRM automations so she can focus on her clients. Their unique blend of planning and doing will take your business to the next level—highly recommended.',
      author: 'Danielle Winfield Wimberly',
      role: 'Founder, DWW',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      videoUrl: '/images/test2.mp4',
      linkLabel: 'DWW',
      linkUrl: '#',
      leftBg: '#070707',
      rightBg: '#1a1a1a',
    },
    {
      id: 3,
      quote:
        'Julia Standard, COO of Tax Lien Boot Camp, says marQ Networks became part of her family—translating complex IT into clear, strategic solutions while proactively safeguarding operations. Their punctual, personalized support and tailored automations give her peace of mind and position the company for long-term growth.',
      author: 'Julia Standard',
      role: 'COO, Tax Lien Boot Camp',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      videoUrl: '/images/test3.mp4',
      linkLabel: 'Tax Lien Boot Camp',
      linkUrl: '#',
      leftBg: '#080d0d',
      rightBg: '#233b38',
    },
    {
      id: 4,
      quote:
        'Karen Swain, President & CEO of Excelus, says marQ Networks turned their unsecured site into a rock-solid, fully rebranded platform—backed by stellar communication and an unwavering partnership that’s become part of their organization’s very fabric.',
      author: 'Karen Swain',
      role: 'CEO, Excelus',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      videoUrl: '/images/test4.mp4',
      linkLabel: 'Excelus',
      linkUrl: '#',
      leftBg: '#070707',
      rightBg: '#1a1a1a',
    },
    {
      id: 5,
      quote:
        'Maurice Hodges, Chief Training Officer at Georgia Tax Lien Boot Camp, calls marQ Networks an indispensable partner—delivering top-quality work with lightning-fast turnarounds, seamless flexibility, and unmatched reliability every time.',
      author: 'Maurice Hodges',
      role: 'Chief Training Officer, Georgia TL Boot Camp',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      videoUrl: '/images/test5.mp4',
      linkLabel: 'Georgia TL Boot Camp',
      linkUrl: '#',
      leftBg: '#080d0d',
      rightBg: '#233b38',
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
    if (isHovered) return;
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const current = testimonials[currentSlide];

  return (
    <div className="w-full bg-black flex flex-col items-center justify-center px-4 testimo">
      {/* Main Slider Container */}
      <div
        className="w-full max-w-[1200px] h-auto md:h-[85vh] flex flex-col-reverse md:flex-row rounded-3xl overflow-hidden shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* LEFT SIDE */}
        <div
          className="w-full md:w-1/2 text-white flex flex-col justify-between p-4 md:p-6 left"
          style={{ backgroundColor: current.leftBg }}
        >
          <div>
            <img src={current.logo} alt="Logo" className="w-20 h-20" />
          </div>

          <div className="flex-1 flex items-center mt-4 md:mt-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-lg md:text-1xl font-medium leading-relaxed max-w-md text-justify "
              >
                “{current.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 pl-4 mt-4 md:mt-0">
            <img
              src={current.authorImage}
              alt={current.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-left">{current.author}</div>
              <div className="text-white/60 text-sm">{current.role}</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6"
          style={{ backgroundColor: current.rightBg }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`video-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl shadow-xl w-full h-56 md:h-full flex items-center justify-center overflow-hidden"
            >
              <video
                src={current.videoUrl}
                controls
                className="w-full h-full rounded-xl object-contain"
                preload="auto"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="w-full max-w-[1200px] mt-6 mb-10 items-center tabs flex flex-col md:flex-row justify-between gap-4">
        <div className="hidden md:flex" />
        <div className="flex flex-wrap justify-center gap-4 text-white/60 text-sm md:text-base">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition hover:text-white ${currentSlide === idx ? 'text-white font-medium' : ''
                }`}
            >
              {item.linkLabel}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition w-8 h-8"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition w-8 h-8"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
