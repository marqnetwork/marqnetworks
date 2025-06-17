import React from "react";
import "./IntegrationCards.css";

const cards = [
  {
    id: 1,

    icon: "/images/Background+Shadow.png",
    name: "Full-Stack & AI Engineering",
    label: "Code",
    description:
      "Next .js / React, Laravel / Django, Node & Python tie seamlessly into LangChain, GPT endpoints and IoT APIs. Docker + GitHub Actions ship to AWS, Azure & Vercel with automated QA—your codebase is cloud-native, scalable and future-proof.",
    pro: true,
  },
  {
    id: 2,
    icon: "/images/Background+Shadow1.png",
    name: "Launch-Pad Stack",
    label: "Startups",
    description:
      "Figma ideas turn to live MVPs on Supabase + Vercel in a single sprint. Stripe, Slack, Linear, Notion and PostHog give founders payments, comms, project tracking and analytics without enterprise overhead—perfect for 0 → 1 speed.",
    pro: false,
  },
  {
    id: 3,
    icon: "/images/Background+Shadow2.png",
    name: "Experience Design Suite",
    label: "Design",
    description:
      "Adobe CC, Figma, Framer Motion, LottieFiles and Blender 3-D power everything from brand systems to micro-animations and product renders. Midjourney + Stable Diffusion accelerate concept work while our WCAG checks lock in accessibility.",
    pro: false,
  },
  {
    id: 4,
    icon: "/images/Background+Shadow3.png",
    name: "Commerce & Funnels",
    label: "Marketplace / eCommerce",
    description:
      "Headless Shopify Plus, WooCommerce-PHP or BigCommerce via Next .js storefronts—integrated with Stripe/PayPal, Klaviyo automations and GA-4. Zapier & Make connect PIM, ERP or 3PLs so you sell globally on day one.",
    pro: false,
  },
  {
    id: 5,
    icon: "/images/Background+Shadow4.png",
    name: "Learning Tech Stack",
    label: "Academia",
    description:
      "Moodle, Canvas, Kajabi & Thinkific plug into Zoom, SCORM/xAPI and HubSpot CRM. Auto-enrolment, progress analytics and gamified drip sequences turn courses into revenue while staying FERPA/GDPR compliant.",
    pro: true,
  },
  {
    id: 6,
    icon: "/images/Background+Shadow6.png",
    name: "Enterprise-Grade Platform",
    label: "Enterprises",
    description:
      "Azure & AWS micro-services, Salesforce + SAP BTP connectors, Snowflake warehousing and Kafka streams—wrapped in GitHub Enterprise CI/CD. SOC-2–aligned checklists, SSO, RBAC and audit logging keep InfoSec teams happy.",
    pro: false,
  },
];

const IntegrationCards = () => {
  return (
    <section className="integration__section">
      <div className="integration__grid">
        {cards.map(({ id, icon, name, label, description, pro }) => (
          <div key={id} className="integration__card">
            {/* Top row: icon and arrow */}
            <div className="card__top">
              <img src={icon} alt={name} className="card__icon" />
              <span className="card__arrow">↗</span>
            </div>

            {/* Title + PRO tag */}
            <div className="card__title">
              <h4>{name}</h4>
              {pro && <span className="pro__badge">PRO</span>}
            </div>

            {/* Subtitle */}
            <p className="card__label">{label}</p>

            {/* Description */}
            <p className="card__desc">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntegrationCards;
