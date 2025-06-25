export const metadata = {
  title: "About Us | MarQ Networks",
  description: "Meet the team and vision behind MarQ Networks. We’re a global digital growth partner helping visionary brands scale with clarity and impact.",
  alternates: {
    canonical: "/About",
  },
};

import dynamic from "next/dynamic";
const About = dynamic(() => import('./AboutContent')); // 👈 move your About code here

export default function AboutPage() {
  return <About />;
}
