"use client";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "MarQ Consultancy",
    desc: "Growth strategy consultant for startups and enterprises delivering AI business roadmaps, generative search optimization, and go-to-market execution.",
    pos: "top-[30%] left-[2%]",
    dir: "left",
  },
  {
    title: "MarQ Creative Logics",
    desc: "Branding agency for startups and tech companies focused on emotional branding, UI/UX design, and conversion-driven creative.",
    pos: "top-[50%] left-[02%]",
    dir: "left",
  },
  {
    title: "MarQ Software House",
    desc: "Custom software development company specializing in scalable AI websites, MVP builds, and headless eCommerce.",
    pos: "bottom-[12%] left-[40%] -translate-x-1/2 text-center",
    dir: "bottom",
  },
  {
    title: "MarQ Growth Pod",
    desc: "Performance-driven funnel marketing agency delivering automation-powered revenue systems.",
    pos: "top-[50%] right-[2%]",
    dir: "right",
  },
  {
    title: "Offshore Excellence Hub",
    desc: "A globally distributed delivery hub with expert remote teams operating round-the-clock for efficiency and scale.",
    pos: "top-[30%]  right-[2%]",
    dir: "right",
  },
];

export default function PillarsSection() {
  return (
    <section className="relative w-full h-[800px] md:h-[900px] overflow-hidden flex items-center justify-center py-20 mb-40 md:mb-64">
      {/* Central image only (no dashed lines) */}
      <img
        src="/images/pillar.png"
        alt="Pillars"
        className="max-w-[500px] h-auto object-contain"
      />

      {/* Text blocks positioned around the image */}
      {pillars.map((p, i) => {
        const initial = {
          opacity: 0,
          x: p.dir === "left" ? -80 : p.dir === "right" ? 80 : 0,
          y: p.dir === "bottom" ? 20 : p.dir === "top" ? 80 : 0,
        };
        return (
          <motion.div
            key={i}
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`absolute ${p.pos} w-[260px] sm:w-[300px] text-white/80 z-10 break-words whitespace-normal overflow-hidden`}
          >
            <h3 className="font-semibold text-base md:text-lg text-white mb-1">{p.title}</h3>
            <p className="text-xs md:text-sm leading-relaxed text-white/70">{p.desc}</p>
          </motion.div>
        );
      })}
    </section>
  );
}
