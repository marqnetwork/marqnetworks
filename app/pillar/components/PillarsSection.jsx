"use client";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Strategy & Digital Transformation",
    desc: "Align teams, de-risk spend, and launch initiatives with an AI workflow transformation roadmap in 90 days.",
    pos: "top-[8%] left-[10%]",
    dir: "left",
  },
  {
    title: "Custom Software & Automation",
    desc: "AI assistants, automations and secure engineering to accelerate digital execution.",
    pos: "top-[46%] left-[4%]",
    dir: "left",
  },
  {
    title: "Off-Shore Excellence Hub (operating model)",
    desc: "Align teams, de-risk spend, and launch initiatives with an AI-powered CRM automation roadmap—live in 90 days.",
    pos: "bottom-[-8%] left-[50%] -translate-x-1/2 text-center",
    dir: "bottom",
  },
  {
    title: "Growth Marketing & Lead Gen",
    desc: "AI-powered CRM automation and performance playbooks—live in 90 days.",
    pos: "top-[46%] right-[4%]",
    dir: "right",
  },
  {
    title: "Brand + Experience Design",
    desc: "Align teams, de-risk spend, and launch initiatives with a 100-day, conversion-focused, AI-powered UX roadmap.",
    pos: "top-[10%] right-[10%]",
    dir: "right",
  },
];

export default function PillarsSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center  py-20">
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
          y: p.dir === "bottom" ? 80 : p.dir === "top" ? -80 : 0,
        };
        return (
          <motion.div
            key={i}
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`absolute ${p.pos} w-[250px] sm:w-[280px] text-white/80 z-10`}
          >
            <h3 className="font-semibold text-base md:text-lg text-white mb-1">{p.title}</h3>
            <p className="text-xs md:text-sm leading-relaxed text-white/70">{p.desc}</p>
          </motion.div>
        );
      })}
    </section>
  );
}
