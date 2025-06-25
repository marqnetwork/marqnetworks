export const metadata = {
  title: "AI-Driven Growth, Branding & Software Solutions | MarQ Networks",
  description: "Discover MarQ Networks’ 5-Pillar stack—strategy consulting, branding & UX, AI website & software development, funnel marketing, and offshore excellence—for scalable growth.",
  alternates: {
    canonical: "/Solution",
  },
};

import dynamic from "next/dynamic";
const Solution = dynamic(() => import('./SolutionContent'));

export default function SolutionPage() {
  return <Solution />;
}
