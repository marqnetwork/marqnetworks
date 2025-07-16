export const metadata = {
  title: "Contact MarQ Networks | AI-Driven Digital Growth Partner",
  description: "Reach our Dubai & EST teams for AI business roadmaps, branding, custom software, and funnel marketing. Book a 30-min consult—cut costs 30 % and scale faster.",
  alternates: {
    canonical: "/Contact",
  },
};

import dynamic from "next/dynamic";
const Contact = dynamic(() => import('./ContactContent'));

export default function ContactPage() {
  return <Contact />;
}
