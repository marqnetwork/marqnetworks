export const metadata = {
  title: "Client Success Portfolio | AI Branding & Software | MarQ Networks",
  description: "Explore MarQ Networks’ portfolio of AI-driven branding, custom software, and funnel marketing wins. See how startups & enterprises cut costs 30% and grew revenue 3×.",
  alternates: {
    canonical: "/Portfolio",
  },
};

import dynamic from "next/dynamic";
const Portfolio = dynamic(() => import('./PortfolioContent'));

export default function PortfolioPage() {
  return <Portfolio />;
}
