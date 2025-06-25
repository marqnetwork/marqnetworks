export const metadata = {
  title: "About MarQ Networks | AI Digital Growth Partner & CRM Automation",
  description: "Meet MarQ Networks—your AI-driven digital growth partner. Our 5-pillar stack unites strategy consulting, branding, custom software, SEO audits & CRM automation to fuel visionary brands.",
  alternates: {
    canonical: "/About",
  },
};

import dynamic from "next/dynamic";
const About = dynamic(() => import('./AboutContent')); 

export default function AboutPage() {
  return <About />;
}
