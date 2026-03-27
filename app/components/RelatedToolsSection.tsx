"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getRelatedToolItems } from "../resources/tools/toolManifest";

export function RelatedToolsSection({
  currentSlug,
  title = "Related Tools",
  description = "Keep exploring—these tools are often used together.",
}: {
  currentSlug: string;
  title?: string;
  description?: string;
}) {
  const related = getRelatedToolItems(currentSlug, 6);

  return (
    <section className="qr-features-section" style={{ paddingTop: "3rem" }}>
      <div className="qr-features-container">
        <div className="qr-features-tag">
          <span className="qr-year">More</span>
          <span className="qr-tag-text">Related</span>
        </div>

        <h2 className="qr-features-heading">
          {title.split(" ").slice(0, 1).join(" ")} <span>{title.split(" ").slice(1).join(" ") || "Tools"}</span>
        </h2>

        <p className="qr-hero-subtext" style={{ marginTop: "-2rem" }}>
          {description}{" "}
          <Link href="/tools" className="qr-btn secondary small" style={{ marginLeft: 10 }}>
            View all tools
          </Link>
        </p>

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
  );
}
