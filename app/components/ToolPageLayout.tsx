"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getRelatedToolItems, getToolMeta } from "../resources/tools/toolManifest";

export function ToolPageLayout({
  toolId,
  children,
}: {
  toolId: string;
  children: ReactNode;
}) {
  const meta = getToolMeta(toolId);
  const related = getRelatedToolItems(toolId, 6);
  const titleParts = meta.title.trim().split(/\s+/).filter(Boolean);
  const titleLead = titleParts.slice(0, -1).join(" ");
  const titleAccent = titleParts.at(-1) || meta.title;

  return (
    <div className="qr-generator-container">
      <section className="qr-hero-section" style={{ minHeight: "auto" }}>
        <div className="qr-hero-container">
          <div style={{ width: "100%", maxWidth: 1200 }}>
            <Link href="/tools" className="qr-btn secondary small">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <ArrowLeft size={14} />
                Tools
              </span>
            </Link>
          </div>

          <div className="qr-hero-tag">
            <span className="qr-year">Free</span>
            <span className="qr-tag-text">{meta.category}</span>
          </div>

          <h1 className="qr-hero-heading">
            {titleLead ? `${titleLead} ` : ""}
            <span>{titleAccent}</span>
          </h1>

          <p className="qr-hero-subtext">
            {meta.description ||
              "Use this free tool from MarQ Networks to get results fast."}
          </p>

          <div className="qr-hero-buttons">
            <a href="#tool" className="qr-btn primary">
              Start Using
            </a>
            <a href="/tools" className="qr-btn secondary">
              Browse Tools
            </a>
          </div>
        </div>
      </section>

      <section id="tool" className="qr-generator-section" style={{ paddingTop: 0 }}>
        <div className="qr-generator-wrapper">
          <div className="qr-generator-content">
            <div
              className="qr-generator-interface"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <div className="tool-content">{children}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="qr-features-section" style={{ paddingTop: "3rem" }}>
        <div className="qr-features-container">
          <div className="qr-features-tag">
            <span className="qr-year">More</span>
            <span className="qr-tag-text">Related Tools</span>
          </div>

          <h2 className="qr-features-heading">
            Related <span>Tools</span>
          </h2>

          <div className="qr-features-grid">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="qr-feature-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="qr-feature-icon" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description || "Open tool"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
