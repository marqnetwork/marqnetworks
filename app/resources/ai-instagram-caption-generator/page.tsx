"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import "./caption-generator.css";
import { RelatedToolsSection } from "../../components/RelatedToolsSection";

type Tone = "Professional" | "Fun" | "Luxury" | "Inspirational" | "Bold" | "Emotional";
type Mode = "Business" | "Personal";
type Length = "short" | "medium" | "long";

function trackEvent(event: string, params?: Record<string, any>) {
  try {
    // Google Analytics (gtag)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event, params || {});
    }
    // Google Tag Manager
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...(params || {}) });
    }
    // Fallback
    // eslint-disable-next-line no-console
    console.log("trackEvent", event, params || {});
  } catch (e) {}
}

function sanitizeText(input: string) {
  const trimmed = input.trim();
  // Simple “grammar-check”: sentence-case the first letter
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function suggestHashtags(topic: string, tone: Tone): string[] {
  const base = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3);
  const toneTags: Record<Tone, string[]> = {
    Professional: ["#BusinessTips", "#MarketingStrategy"],
    Fun: ["#GoodVibes", "#InstaFun"],
    Luxury: ["#LuxuryLifestyle", "#PremiumBrand"],
    Inspirational: ["#StayInspired", "#Motivation"],
    Bold: ["#BoldMoves", "#StandOut"],
    Emotional: ["#RealTalk", "#FeelTheMoment"],
  };
  const topicTags = base.map((b) => `#${b}`);
  return [...topicTags, ...(toneTags[tone] || [])];
}

function lengthHint(len: Length) {
  switch (len) {
    case "short":
      return 90;
    case "medium":
      return 180;
    case "long":
      return 300;
    default:
      return 180;
  }
}

function buildCaption(
  topic: string,
  tone: Tone,
  audience: string,
  mode: Mode,
  len: Length,
  hashtags: string[]
) {
  const basePrompt = `Create a unique Instagram caption for ${topic}, with a ${tone} tone, targeting ${audience}. Include relevant emojis and hashtags if needed.`;
  const lengthTarget = lengthHint(len);
  const emojisByTone: Record<Tone, string[]> = {
    Professional: ["💼", "📈"],
    Fun: ["😎", "🎉"],
    Luxury: ["💎", "✨"],
    Inspirational: ["🌟", "🔥"],
    Bold: ["⚡", "🚀"],
    Emotional: ["💬", "💙"],
  };
  const emojis = emojisByTone[tone].join(" ");

  const cta = mode === "Business" ? "DM to learn more. Link in bio." : "Tell me what you think👇";

  const baseCaption = `${sanitizeText(topic)} — crafted for ${sanitizeText(
    audience
  )}. ${emojis} ${tone === "Luxury" ? "Elevate your brand." : "Make it share-worthy."}`;

  let caption = `${baseCaption} ${cta}`;
  if (caption.length < lengthTarget) {
    caption += ` ${hashtags.slice(0, 3).join(" ")}`;
  }
  return caption;
}

export default function AIInstagramCaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [audience, setAudience] = useState("");
  const [hashtagsInput, setHashtagsInput] = useState("");
  const [mode, setMode] = useState<Mode>("Business");
  const [length, setLength] = useState<Length>("medium");

  const [variations, setVariations] = useState<string[]>([]);
  const [typing, setTyping] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genCount, setGenCount] = useState(0);
  const typingTimers = useRef<number[]>([]);

  const hashtagList = useMemo(() => {
    const manual = hashtagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t : `#${t.replace(/\s+/g, "")}`));
    const ai = suggestHashtags(topic || "caption", tone);
    return Array.from(new Set([...manual, ...ai]));
  }, [hashtagsInput, topic, tone]);

  const characterCount = useMemo(() => {
    const joined = variations.join("\n\n");
    return joined.length;
  }, [variations]);

  function clearTypingTimers() {
    typingTimers.current.forEach((id) => window.clearInterval(id));
    typingTimers.current = [];
  }

  function onGenerate() {
    if (!topic || !audience) {
      alert("Please enter a topic and target audience.");
      return;
    }
    trackEvent("caption_generate_click", { mode, tone, length });
    setIsGenerating(true);
    setGenCount((c) => c + 1);

    // Simulate AI delay (1.5s), then typing effect across variations
    setTimeout(() => {
      const v1 = buildCaption(topic, tone, audience, mode, length, hashtagList);
      const v2 = buildCaption(`${topic} — fresh take`, tone, audience, mode, length, hashtagList);
      const v3 = buildCaption(`${topic} — hooks first`, tone, audience, mode, length, hashtagList);
      const nextVariations = [v1, v2, v3];
      setVariations(nextVariations);
      setTyping(["", "", ""]);
      clearTypingTimers();

      nextVariations.forEach((text, idx) => {
        let i = 0;
        const id = window.setInterval(() => {
          i += 2; // type 2 chars per tick for speed
          setTyping((prev) => {
            const copy = [...prev];
            copy[idx] = text.slice(0, Math.min(i, text.length));
            return copy;
          });
          if (i >= text.length) {
            window.clearInterval(id);
          }
        }, 30);
        typingTimers.current.push(id);
      });
      setIsGenerating(false);
    }, 1500);
  }

  function onCopyAll() {
    const text = variations.join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      trackEvent("caption_copy_all", { length: text.length });
      alert("All captions copied to clipboard.");
    });
  }

  function onRegenerate() {
    trackEvent("caption_regenerate", { mode, tone, length });
    onGenerate();
  }

  function onSave() {
    const blob = new Blob([variations.join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "captions.txt";
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("caption_save_text");
  }

  function applySample(sTopic: string, sTone: Tone, sAudience: string) {
    setTopic(sTopic);
    setTone(sTone);
    setAudience(sAudience);
  }

  useEffect(() => {
    trackEvent("caption_page_view");
    return () => clearTypingTimers();
  }, []);

  return (
    <section className="caption-container">
      <div className="caption-hero">
        <div className="caption-hero-tag">
          <span className="roi-year">AI</span>
          <span className="roi-tag-text">Tools</span>
        </div>
        <h1 className="caption-hero-heading">AI Instagram Caption Generator</h1>
        <p className="caption-hero-subtext">Create viral-ready captions in seconds with AI.</p>
        <div className="caption-hero-actions">
          <a href="#generator" className="roi-btn primary">Start Generating</a>
        </div>
      </div>

      <div className="caption-wrapper" id="generator">
        {/* Inputs */}
        <div className="caption-input-panel">
          <h2 className="panel-title">Your Inputs</h2>

          <div className="roi-input-group">
            <label htmlFor="topic">Main Topic or Keyword</label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Luxury jewelry brand launch"
            />
          </div>

          <div className="roi-input-group">
            <label htmlFor="tone">Tone</label>
            <select id="tone" value={tone} onChange={(e) => setTone(e.target.value as Tone)}>
              {(["Professional", "Fun", "Luxury", "Inspirational", "Bold", "Emotional"] as Tone[]).map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                )
              )}
            </select>
            <div className="tone-chips">
              <span title="Clear, confident, value-driven">Professional</span>
              <span title="Playful, witty hooks">Fun</span>
              <span title="Elegant, premium messaging">Luxury</span>
              <span title="Positive, uplifting vibe">Inspirational</span>
              <span title="Strong, punchy statements">Bold</span>
              <span title="Human, heartfelt lines">Emotional</span>
            </div>
          </div>

          <div className="roi-input-group">
            <label htmlFor="audience">Target Audience</label>
            <input
              id="audience"
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Millennials shopping for premium accessories"
            />
          </div>

          <div className="roi-input-group">
            <label htmlFor="hashtags">Optional Hashtags (comma separated)</label>
            <input
              id="hashtags"
              type="text"
              value={hashtagsInput}
              onChange={(e) => setHashtagsInput(e.target.value)}
              placeholder="brand, luxury, style"
            />
          </div>

          {/* Mode & Length */}
          <div className="mode-length-row">
            <div className="mode-toggle">
              <button
                className={mode === "Business" ? "active" : ""}
                onClick={() => setMode("Business")}
              >
                Business Mode
              </button>
              <button className={mode === "Personal" ? "active" : ""} onClick={() => setMode("Personal")}>
                Personal/Influencer
              </button>
            </div>
            <div className="length-select">
              <label htmlFor="length">Length</label>
              <select id="length" value={length} onChange={(e) => setLength(e.target.value as Length)}>
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>

          <div className="roi-action-buttons">
            <button className="roi-btn primary" onClick={onGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating…" : "Generate Captions"}
            </button>
            <button className="roi-btn secondary" onClick={onRegenerate} disabled={isGenerating}>
              Regenerate
            </button>
            <button className="roi-btn success" onClick={onCopyAll} disabled={!variations.length}>
              Copy All Outputs
            </button>
            <button className="roi-btn info" onClick={onSave} disabled={!variations.length}>
              Save My Caption
            </button>
          </div>

          {/* Engagement: Samples */}
          <div className="samples">
            <p className="samples-title">Try these ideas</p>
            <div className="samples-grid">
              <button
                onClick={() => applySample("Luxury jewelry brand launch", "Luxury", "Affluent shoppers")}
              >
                Luxury jewelry brand launch
              </button>
              <button onClick={() => applySample("Fitness motivation Monday", "Inspirational", "Gym-goers")}>
                Fitness motivation Monday
              </button>
              <button onClick={() => applySample("Real estate open house", "Professional", "Home buyers")}>
                Real estate open house
              </button>
              <button onClick={() => applySample("New café opening in Dubai", "Fun", "Foodies in Dubai")}>
                New café opening in Dubai
              </button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="caption-output-panel">
          <h2 className="panel-title">Generated Captions</h2>
          <p className="output-meta">Character count: {characterCount}</p>
          <div className="caption-output-box">
            {typing.length ? (
              typing.map((t, i) => (
                <pre key={i} className="caption-line" aria-live="polite">
                  {t}
                </pre>
              ))
            ) : (
              <p className="placeholder">Your captions will appear here…</p>
            )}
          </div>
          {!!hashtagList.length && (
            <div className="suggested-tags">
              <p className="suggested-title">Suggested hashtags</p>
              <div className="tags-row">
                {hashtagList.slice(0, 8).map((h) => (
                  <span key={h} className="tag-chip">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lead Capture after 3 generations */}
          {genCount >= 3 && (
            <div className="lead-capture">
              <p>
                Want to automate all your captions? Get a free content audit.
              </p>
              <div className="lead-row">
                <input type="email" placeholder="you@company.com" aria-label="Email for content audit" />
                <a href="/contact" className="roi-btn primary" onClick={() => trackEvent("lead_capture_click")}>Submit</a>
              </div>
            </div>
          )}

          <div className="learn-links">
            <a className="underline" href="/blog/how-to-write-captions-that-convert-2025">
              Learn more: How to Write Captions That Convert in 2025
            </a>
            <span className="mx-2">•</span>
            <a className="underline" href="/contact">Need content strategy support?</a>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <section className="caption-faq-section">
        <div className="caption-faq-container">
          <div className="roi-faq-tag">
            <span className="roi-year">Help</span>
            <span className="roi-tag-text">FAQ</span>
          </div>
          <h2 className="caption-faq-heading">Frequently Asked Questions</h2>
          <div className="roi-faq-list">
            <details className="py-3">
              <summary className="cursor-pointer font-medium">What makes a good Instagram caption?</summary>
              <p className="mt-2 text-sm">Strong hook, clear value, relevant hashtags, and a CTA for engagement.</p>
            </details>
            <details className="py-3">
              <summary className="cursor-pointer font-medium">How do I write captions for business?</summary>
              <p className="mt-2 text-sm">Use professional tone, highlight benefits, include trust signals, and add “Link in bio” or “DM”.</p>
            </details>
            <details className="py-3">
              <summary className="cursor-pointer font-medium">How does AI generate captions?</summary>
              <p className="mt-2 text-sm">It structures topic, tone, and audience into persuasive language with emojis and hashtags.</p>
            </details>
            <details className="py-3">
              <summary className="cursor-pointer font-medium">Can I use emojis and hashtags automatically?</summary>
              <p className="mt-2 text-sm">Yes — the generator suggests relevant emojis and hashtags aligned to your topic and tone.</p>
            </details>
          </div>
        </div>
      </section>

      <RelatedToolsSection currentSlug="ai-instagram-caption-generator" />
    </section>
  );
}
