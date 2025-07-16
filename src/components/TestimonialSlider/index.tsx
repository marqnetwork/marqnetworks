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
        'marQ Networks didn’t just build our platform—they became our first users, transforming paper concepts into a seamless digital experience. Their deep business insight, flawless delivery, and standout post-launch support make them the partner we’ll choose again—and you should, too.',
      author: 'Chris Frantz',
      role: 'CEO at Loops',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      productImage: '/images/sample1.avif',
      linkLabel: 'Loops',
      linkUrl: 'https://loops.so/',
    },
    {
      id: 2,
      quote:
        'Danielle Winfield Wimberly calls marQ Networks and Rameez’s team the ultimate all-in-one partner—combining smart strategy with hands-on execution of sales funnels, email sequences, and CRM automations so she can focus on her clients. Their unique blend of planning and doing will take your business to the next level—highly recommended.',
      author: 'Henry Mitchell',
      role: 'Head of Design at Hospitality',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      productImage: '/images/sample1.avif',
      linkLabel: 'Perplexity',
      linkUrl: 'https://www.perplexity.ai/',
    },
    {
      id: 3,
      quote:
        'Julia Standard, COO of Tax Lien Boot Camp, says marQ Networks became part of her family—translating complex IT into clear, strategic solutions while proactively safeguarding operations. Their punctual, personalized support and tailored automations give her peace of mind and position the company for long-term growth.',
      author: 'Sarah Chen',
      role: 'Design Lead at TechCorp',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      productImage: '/images/sample1.avif',
      linkLabel: 'Visual Electric',
      linkUrl: 'https://visualelectric.com/',
    },
    {
      id: 4,
      quote:
        'Karen Swain, President & CEO of Excelus, says marQ Networks turned their unsecured site into a rock-solid, fully rebranded platform—backed by stellar communication and an unwavering partnership that’s become part of their organization’s very fabric.',
      author: 'David Kim',
      role: 'CTO at Lemni',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
      productImage: '/images/sample1.avif',
      linkLabel: 'Lemni',
      linkUrl: 'https://lemni.com/',
    },
  
    {
      id: 5,
      quote:
        'Maurice Hodges, Chief Training Officer at Georgia Tax Lien Boot Camp, calls marQ Networks an indispensable partner—delivering top-quality work with lightning-fast turnarounds, seamless flexibility, and unmatched reliability every time.',
      author: 'David Kim',
      role: 'CTO at Lemni',
      logo: '/images/t1.svg',
      authorImage: '/images/author1.avif',
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
    <div className="w-full h-10/12 bg-black flex flex-col items-center justify-center px-4">
      {/* Main Slider Container */}
      <div className="w-full max-w-[1200px] h-[85vh] flex rounded-3xl overflow-hidden shadow-xl">

        <div className="w-1/2 ]  text-white bg-red-500 flex flex-col justify-between h-full p-6 left_side">
          <div>
            <img src={current.logo} alt="Logo" className="w-20 h-20 " />
          </div>

          {/* Centered Quote */}
          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-2xl font-medium leading-relaxed max-w-md text-justify"
              >
                “{current.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author at Bottom */}
          <div className="flex items-center gap-2 pl-4">
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
        <div className="w-1/2 bg-[#f15a29] flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl shadow-xl w-full h-full flex items-center justify-center overflow-hidden"
            >
              <img
                src={current.productImage}
                className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
                alt="Product"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="w-full max-w-[1200px] mt-6 mb-10  items-center tabs flex flex-row justify-between">
        <div className="flex l">

        </div>
        <div className="flex justify-center gap-x-8 text-white/60 text-[16px] mb-10">
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
        <div className="flex ">
          <button
            onClick={() => paginate(-1)}
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition w-8 h-8"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className=" bg-white/10 hover:bg-white/20 rounded-full p-2 transition w-8 h-8"
          >
            <ChevronRight className="text-white w-6 h-6 " />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TestimonialSlider;
