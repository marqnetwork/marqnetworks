import React from "react";
import "./IntegrationCards.css";

const cards = [
  {
    id: 1,
    icon: "/images/Background+Shadow.png",
    name: "Full-Stack & AI Engineering",
    label: "Code",
    description:
      "Next.js / React, Laravel / Django, Node & Python merge with an AI code assistant, LangChain, GPT endpoints and IoT APIs. Docker + GitHub Actions ship to AWS, Azure & Vercel with AI performance optimization for web applications—your codebase is cloud-native, scalable and future-proof.",
    pro: true
  },
  {
    id: 2,
    icon: "/images/Background+Shadow1.png",
    name: "Launch-Pad Stack",
    label: "Startups",
    description:
      "Figma ideas turn to live MVPs on Supabase + Vercel in a single sprint. An AI workflow transformation roadmap wires Stripe, Slack, Linear, Notion and PostHog—giving founders payments, comms, tracking and analytics without enterprise overhead.",
    pro: false
  },
  {
    id: 3,
    icon: "/images/Background+Shadow2.png",
    name: "Experience Design Suite",
    label: "Design",
    description:
      "Adobe CC, Figma, Framer Motion and Blender power brand systems to micro-animations—super-charged by AI-powered UX/UI design tools and AI heatmap user testing. Midjourney + Stable Diffusion speed concept work while WCAG checks lock in accessibility.",
    pro: false
  },
  {
    id: 4,
    icon: "/images/Background+Shadow3.png",
    name: "Commerce & Funnels",
    label: "Marketplace / eCommerce",
    description:
      "Headless ecommerce developers deploy Shopify Plus, WooCommerce-PHP or BigCommerce via Next.js storefronts—integrated with Stripe/PayPal, Klaviyo automations and GA-4. Zapier & Make connect PIM, ERP or 3PLs so you sell globally on day one.",
    pro: false
  },
  {
    id: 5,
    icon: "/images/Background+Shadow4.png",
    name: "Learning Tech Stack",
    label: "Academia",
    description:
      "Moodle, Canvas, Kajabi & Thinkific plug into Zoom, SCORM/xAPI and HubSpot CRM. AI-powered CRM automation, progress analytics and gamified drip sequences turn courses into revenue while staying FERPA/GDPR compliant.",
    pro: true
  },
  {
    id: 6,
    icon: "/images/Background+Shadow6.png",
    name: "Enterprise-Grade Platform",
    label: "Enterprises",
    description:
      "Azure & AWS micro-services, Salesforce + SAP BTP connectors, Snowflake warehouses and Kafka streams—wrapped in GitHub Enterprise CI/CD. AI-powered GDPR/SOC-2 compliance automation, SSO, RBAC and audit logging keep InfoSec teams happy.",
    pro: false
  }
];

const IntegrationCards = () => {
  return (
    <section className="integration__section">
      <div className="integration__grid">
        {cards.map(({ id, icon, name, label, description, pro }) => (
          <div key={id} className="integration__card">
            <div className="card__top">
              <img src={icon} alt={name} className="card__icon" />
              <span className="card__arrow">↗</span>
            </div>

            <div className="card__title">
              <h4>{name}</h4>
              {pro && <span className="pro__badge">PRO</span>}
            </div>

            <p className="card__label">{label}</p>
            <p className="card__desc">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntegrationCards;
