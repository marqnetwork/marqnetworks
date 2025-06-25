export const metadata = {
  title: "Our Work | MarQ Networks",
  description: "Explore successful case studies and digital products delivered by MarQ Networks. See how we turn vision into scalable growth.",
  alternates: {
    canonical: "/Portfolio",
  },
};

import dynamic from "next/dynamic";
const Portfolio = dynamic(() => import('./PortfolioContent'));

export default function PortfolioPage() {
  return <Portfolio />;
}
