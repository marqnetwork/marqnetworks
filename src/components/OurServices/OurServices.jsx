"use client";

import React from "react";
import "./OurServices.css";
import { motion } from "framer-motion";

// Service Data
const services = [
  {
    title: "Digital Strategy Sprint",
    desc: "Align vision, goals & tech in 2 weeks.",
    icon: "/images/sprint.png",
    price: "Strategy & Digital Transformation",
    duration: "Consultancy",
    features: [
      "North-Star roadmap",
      "Ops & tech stack blueprint",
      "Quick-win priority list",
    ],
  },
  {
    title: "Brand & UX Makeover",
    desc: "From logo to clickable prototype.",
    icon: "/images/package.png",
    price: "Brand + Experience Design",
    duration: "Design",
    features: [
      "Visual identity kit",
      "UX wireframes in Figma",
      "Reusable design system",
    ],
  },
  {
    title: "MVP Build + Automation",
    desc: "Code, test & deploy—fast.",
    icon: "/images/stack.png",
    price: "Custom Software & Automation",
    duration: "Development",
    features: [
      "Full-stack React / Laravel",
      "Zapier / Make automations",
      "CI/CD & documentation",
    ],
  },
  {
    title: "Lead-Gen Engine",
    desc: "Funnel, emails & ads done-for-you.",
    icon: "/images/Engine.png",
    price: "Growth Marketing & Lead Gen",
    duration: "Marketing",
    features: [
      "High-converting funnel",
      "CRM & nurture emails",
      "Paid-ads management",
    ],
  },
  {
    title: "Dedicated Remote Pod",
    desc: "Scale with a plug-in team at 30% less cost.",
    icon: "/images/Remote.png",
    price: "Off-Shore Excellence Hub",
    duration: "Off-Shore",
    features: [
      "Cross-disciplinary talent",
      "EST time-zone overlap",
      "Flat, transparent billing",
    ],
  },
];

// Animation Variant
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const OurServices = () => {
  return (
    <section className="ourservices">
      {/* Static Image Side */}
      <div className="ourservices__left">
        <img src="/images/ourservices.png" alt="Our Services" />
      </div>

      {/* Content Side */}
      <div className="ourservices__right">
        <span className="ourservices__tag">• Our Services</span>

        <motion.h2
          className="ourservices__headline"
          initial={{ x: -20, opacity: 0.6, filter: "blur(4px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Strategy, Design, Code, Growth & Scale.
          <br />
          <span>Covered by marQ Networks</span>
        </motion.h2>

        {/* Service Cards */}
        <div className="ourservices__cards">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              custom={index}
            >
              <div className="service-card__top">
                <div className="service-card__icon">
                  <img src={service.icon} alt={`${service.title} icon`} />
                </div>
                <span className="service-card__badge">{service.duration}</span>
              </div>

              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>
              <div className="about__divider" />

              <div className="service-card__meta">
                <span className="service-card__pill">{service.price}</span>
                <span className="service-card__pill">{service.duration}</span>
              </div>

              <ul className="service-card__features">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <img src="/images/abouticon.png" alt="feature icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
