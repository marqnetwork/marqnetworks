export const metadata = {
  title: "Our Solutions | MarQ Networks",
  description: "From digital transformation to CRM automation, explore how MarQ Networks delivers full-stack solutions for scalable, intelligent growth.",
  alternates: {
    canonical: "/Solution",
  },
};

import dynamic from "next/dynamic";
const Solution = dynamic(() => import('./SolutionContent'));

export default function SolutionPage() {
  return <Solution />;
}
