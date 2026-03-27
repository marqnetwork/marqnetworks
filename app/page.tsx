export const metadata = {
  title: "AI Digital Growth Partner |  SEO & CRM Automation",
  description:
    "MarQ Networks is your AI-driven digital growth partner for design & development, SEO audits, and CRM automation—launch 40 % faster, cut costs 30 %, and scale smarter.",
  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
const HomeContent = nextDynamic(() => import("./HomeContent"));

export default function HomePage() {
  return <HomeContent />;
}
