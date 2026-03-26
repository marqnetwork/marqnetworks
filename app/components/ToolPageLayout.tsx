"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { getToolMeta } from "../resources/tools/toolManifest";

export function ToolPageLayout({
  toolId,
  children,
}: {
  toolId: string;
  children: ReactNode;
}) {
  const meta = getToolMeta(toolId);

  return (
    <div className="min-h-[calc(100vh-160px)] bg-black text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-[#39FF14] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Tools
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/30">
              <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
                Free Tool
              </span>
              <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
                {meta.category}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {meta.title}
            </h1>
            {meta.description ? (
              <p className="mt-3 text-sm sm:text-base text-white/55 max-w-3xl leading-relaxed">
                {meta.description}
              </p>
            ) : null}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
