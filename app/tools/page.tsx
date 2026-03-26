import type { Metadata } from "next";
import { ToolsHubClient } from "./ToolsHubClient";

export const metadata: Metadata = {
  title: "Tools | MarQ Networks",
  description:
    "Explore free tools from MarQ Networks—calculators, generators, analyzers, and utilities.",
};

export default function ToolsPage() {
  return <ToolsHubClient />;
}
