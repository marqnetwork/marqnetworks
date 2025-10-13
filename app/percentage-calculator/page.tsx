export const metadata = {
  title: "Percentage Calculator | Free Online Calculator Tool | MarQ Networks",
  description: "Free online percentage calculator by MarQ Networks. Calculate percentages, percentage increase/decrease, and percentage of a number instantly. Fast, accurate, and easy to use.",
  alternates: {
    canonical: "/percentage-calculator",
  },
};

import dynamic from "next/dynamic";
const PercentageCalculatorContent = dynamic(() => import('@/components/PercentageCalculatorContent/PercentageCalculatorContent'));

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorContent />;
}