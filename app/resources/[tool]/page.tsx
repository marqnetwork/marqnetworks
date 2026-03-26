import { notFound } from "next/navigation";
import { TOOL_IDS } from "../tools/toolManifest";
import { ToolPageClient } from "./ToolPageClient";

export default async function ResourceToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;

  if (!TOOL_IDS.includes(tool)) {
    notFound();
  }

  return <ToolPageClient toolId={tool} />;
}

