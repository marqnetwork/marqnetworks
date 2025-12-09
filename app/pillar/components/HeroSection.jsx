"use client";

import { motion } from "framer-motion";
import MarqButton from "@/components/MarqButton/MarqButton";
import "@/components/Hero/Hero.css";

export default function HeroSection() {
  return (
    <section className="z-10 flex flex-col items-center justify-center text-center w-full max-w-[1200px] mx-auto  px-4 gap-6 " style={{marginTop:"100px"} }>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex justify-center items-center gap-3 w-[100%]"
      >
        <div className=" bg-[#56b848] text-white rounded-md px-10  w-[5%] text-[12px] font-bold shadow-[0px_6px_24px_rgba(86,184,72,0.35)]">2025</div>
        <div className="  rounded-md  text-sm text-white/80 w-[10%]  backdrop-blur-md bg-white/10 border border-white/10">Our solutions</div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/30 font-['DM_Sans:9pt_Regular',sans-serif] text-[48px] leading-tight md:text-[76px] md:leading-[101px] tracking-[-4.2686px]"
        style={{ fontVariationSettings: "'opsz' 9" }}
      >
        Discover marQ Solutions
        <br />
        Where AI Challenges Meet Clarity.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 font-['DM_Sans:9pt_Regular',sans-serif] text-[17.973px] leading-[29.206px] text-white/60 max-w-[900px]"
        style={{ fontVariationSettings: "'opsz' 9" }}
      >
        Dive deep into our AI workflow transformation approach to turning growth challenges into conversion-focused solutions—guided by innovation, strategy, and speed.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 flex gap-4 items-center"
      >
       <MarqButton className="primary-btn-hero" />
       <MarqButton className="primary-btn-hero" />
      </motion.div>
    </section>
  );
}
