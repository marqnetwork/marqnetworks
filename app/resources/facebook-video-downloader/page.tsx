"use client";
import React, { useState } from "react";
import "../../../src/components/QRGeneratorContent/QRGeneratorContent.css";

function trackEvent(event: string, params?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event, params || {});
    }
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...(params || {}) });
    }
  } catch {}
}

function isFacebookVideoUrl(raw: string) {
  const u = raw.trim();
  if (!u) return false;
  try {
    const parsed = new URL(u);
    const hostOk = /facebook\.com$/i.test(parsed.hostname) || /fb\.watch$/i.test(parsed.hostname);
    const path = parsed.pathname.toLowerCase();
    const query = parsed.search.toLowerCase();
    const looksLikeVideo = path.includes("/videos/") || path.includes("/watch/") || query.includes("v=");
    return hostOk && looksLikeVideo;
  } catch {
    return false;
  }
}

export default function FacebookVideoDownloaderPage() {
  const [url, setUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [provider, setProvider] = useState<"snapsave" | "getfvid">("snapsave");

  const buildExternalUrl = (raw: string) => {
    const encoded = encodeURIComponent(raw.trim());
    if (provider === "getfvid") {
      // Getfvid accepts direct URLs; landing page used for manual paste
      return `https://www.getfvid.com/`; // show landing; users can paste if redirect blocked
    }
    // Default: SnapSave with prefilled query
    return `https://snapsave.app/?url=${encoded}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!isFacebookVideoUrl(url)) {
      setMessage("Please paste a valid public Facebook video URL (watch or video link).");
      return;
    }
    setProcessing(true);
    try {
      // Redirect to selected external downloader (pre-filled when supported)
      const external = buildExternalUrl(url);
      trackEvent("fb_downloader_open", { provider, urlLength: url.length });
      window.open(external, "_blank");
      setMessage("Opening downloader in a new tab. If blocked, use the link below.");
    } catch (err) {
      console.error(err);
      setMessage("Unable to process this URL right now. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="qr-generator-container text-white" style={{padding: "4rem 2rem"}}>
      <section className="qr-hero-section" style={{padding: "2rem 0", minHeight: "auto"}}>
        <div className="qr-hero-container">
          <div className="qr-hero-tag">
            <span className="qr-year">New</span>
            <span className="qr-tag-text">Tools</span>
          </div>
          <h1 className="qr-hero-heading" style={{fontSize: "3rem"}}>
            Facebook <span>Video Downloader</span>
          </h1>
          <p className="qr-hero-subtext" style={{maxWidth: 760}}>
            Paste any public Facebook video URL to download in high quality. For private
            videos, region-restricted content, or login-required links, use the external
            helper we open for you.
          </p>
          <div className="qr-hero-buttons">
            <a href="#downloader" className="qr-btn primary" onClick={() => trackEvent("fb_downloader_cta_click")}>
              Start Downloading
            </a>
          </div>
        </div>
      </section>

      <section id="downloader" className="qr-generator-section" style={{paddingTop: 0}}>
        <div className="qr-generator-wrapper">
          <div className="qr-generator-content" style={{maxWidth: 800}}>
            <div className="qr-generator-interface" style={{gridTemplateColumns: "1fr"}}>
              <form onSubmit={handleSubmit} className="qr-generator-form">
                <div className="qr-form-group">
                  <label htmlFor="fb-url">Facebook Video URL</label>
                  <input
                    id="fb-url"
                    type="url"
                    required
                    placeholder="https://www.facebook.com/..."
                    className="qr-input"
                    aria-label="Facebook video URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                <div className="qr-form-group">
                  <label htmlFor="provider">Downloader</label>
                  <select
                    id="provider"
                    className="qr-select"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as any)}
                  >
                    <option value="snapsave">SnapSave (prefills your URL)</option>
                    <option value="getfvid">Getfvid (manual paste)</option>
                  </select>
                </div>

                <div className="qr-form-actions">
                  <button className="qr-btn primary" type="submit" disabled={processing}>
                    {processing ? "Processing..." : "Download Video"}
                  </button>
                  <button
                    className="qr-btn secondary"
                    type="button"
                    onClick={() => setUrl("")}
                    disabled={processing}
                    style={{marginLeft: "0.5rem"}}
                  >
                    Clear
                  </button>
                </div>

                {message && (
                  <div className="qr-error" style={{marginTop: "1rem"}}>
                    {message}
                  </div>
                )}

                {/* Show the exact link we’ll open, so it’s visible/clickable */}
                {url.trim() && (
                  <div className="qr-preview-info" style={{marginTop: "1rem"}}>
                    <p>Selected downloader: <strong>{provider === 'snapsave' ? 'SnapSave' : 'Getfvid'}</strong></p>
                    <p>
                      Download link:
                      {" "}
                      <a
                        href={buildExternalUrl(url)}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="qr-btn secondary"
                        style={{display: 'inline-block', marginLeft: '0.5rem'}}
                        onClick={() => trackEvent("fb_downloader_open_link", { provider })}
                      >
                        Open Link
                      </a>
                    </p>
                  </div>
                )}
              </form>

              <div className="qr-preview" style={{textAlign: "left"}}>
                <div className="qr-preview-info">
                  <p>
                    Tip: For best results, open the video on Facebook, click the timestamp,
                    and copy the full video URL from the address bar.
                  </p>
                  <p>
                    Note: We do not store your URLs or downloads. Respect content owners and platform policies.
                  </p>
                  <div className="qr-feature-indicator" style={{marginTop: '0.5rem'}}>
                    <span className="feature-icon">⚙️</span>
                    <span>Supported downloaders: SnapSave, Getfvid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
