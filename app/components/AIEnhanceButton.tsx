"use client";

import { useMemo, useState } from "react";
import { Copy, Check, X, Sparkles } from "lucide-react";

export function AIEnhanceButton({
  prompt,
  systemPrompt,
  buttonLabel = "AI Enhance",
}: {
  prompt: string;
  systemPrompt?: string;
  buttonLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullPrompt = useMemo(() => {
    if (!systemPrompt) return prompt;
    return `${systemPrompt}\n\n${prompt}`;
  }, [prompt, systemPrompt]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors text-sm tracking-wide"
      >
        <Sparkles className="w-4 h-4" />
        {buttonLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm px-4 py-10 overflow-y-auto">
          <div className="max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  AI Prompt
                </p>
                <p className="text-sm font-semibold text-white">
                  Copy & paste into your favorite AI
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            <div className="p-5">
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 max-h-[55vh] overflow-y-auto">
                <pre className="text-xs sm:text-sm text-white/70 whitespace-pre-wrap leading-relaxed">
                  {fullPrompt}
                </pre>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors text-sm text-white/80"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#39FF14]" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/50" />
                  )}
                  {copied ? "Copied" : "Copy Prompt"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm text-white/60"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

