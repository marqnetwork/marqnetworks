export const metadata = {
  title: "Home | AI-Driven Digital Growth Partner",
  description:
    "We help visionary brands scale smarter through strategy, design, automation, and software. Based in the US, operating globally.",
  alternates: {
    canonical: "/",
  },
};

import dynamic from "next/dynamic";
const HomeContent = dynamic(() => import("./HomeContent"));

export default function HomePage() {
  return <HomeContent />;
}
