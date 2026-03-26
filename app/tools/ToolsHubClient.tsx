"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  getToolMeta,
  RESOURCES_STATIC_ITEMS,
  RESOURCES_STATIC_SLUGS,
  STANDALONE_TOOL_ITEMS,
  TOOL_IDS,
  type ResourceCardItem,
} from "../resources/tools/toolManifest";

type ToolType = "All" | "Calculators" | "Generators" | "Analyzers" | "Utilities";

function getToolType(slug: string): Exclude<ToolType, "All"> {
  const s = slug.toLowerCase();
  if (s.includes("calculator") || s.includes("roi") || s.includes("tax")) {
    return "Calculators";
  }
  if (s.includes("generator") || s.includes("uuid") || s.includes("slug")) {
    return "Generators";
  }
  if (s.includes("analyzer") || s.includes("audit") || s.includes("checker")) {
    return "Analyzers";
  }
  return "Utilities";
}

function buildUniqueItems(items: ResourceCardItem[]) {
  const bySlug = new Map<string, ResourceCardItem>();
  for (const item of items) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
  }
  return Array.from(bySlug.values());
}

function getDisplayDescription(item: ResourceCardItem) {
  if (item.description) return item.description;
  return "Open tool";
}

export function ToolsHubClient() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ToolType>("All");

  const allItems = useMemo(() => {
    const duplicates = new Set<string>(RESOURCES_STATIC_SLUGS);
    const toolItems: ResourceCardItem[] = TOOL_IDS.filter(
      (id) => !duplicates.has(id),
    ).map((id) => getToolMeta(id));

    const merged = buildUniqueItems([
      ...STANDALONE_TOOL_ITEMS,
      ...RESOURCES_STATIC_ITEMS,
      ...toolItems,
    ]);

    return merged.sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  const typeCounts = useMemo(() => {
    const counts: Record<Exclude<ToolType, "All">, number> = {
      Calculators: 0,
      Generators: 0,
      Analyzers: 0,
      Utilities: 0,
    };

    for (const item of allItems) {
      counts[getToolType(item.slug)] += 1;
    }

    return counts;
  }, [allItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allItems.filter((item) => {
      if (activeType !== "All" && getToolType(item.slug) !== activeType) {
        return false;
      }

      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q)
      );
    });
  }, [allItems, activeType, query]);

  return (
    <div className="qr-generator-container">
      <section className="qr-hero-section" style={{ minHeight: "auto" }}>
        <div className="qr-hero-container">
          <div className="qr-hero-tag">
            <span className="qr-year">Free</span>
            <span className="qr-tag-text">Tools</span>
          </div>

          <h1 className="qr-hero-heading">
            MarQ <span>Tools</span>
          </h1>

          <p className="qr-hero-subtext">
            Browse every tool available across MarQ Networks—built for speed,
            clarity, and consistent branding.
          </p>

          <div className="qr-hero-buttons">
            <a href="#tools" className="qr-btn primary">
              Browse Tools
            </a>
            <a href="/contact-marq-networks" className="qr-btn secondary">
              Contact
            </a>
          </div>
        </div>
      </section>

      <section id="tools" className="qr-generator-section" style={{ paddingTop: 0 }}>
        <div className="qr-generator-wrapper">
          <div className="qr-generator-content">
            <div className="qr-generator-tag">
              <span className="qr-year">{allItems.length}</span>
              <span className="qr-tag-text">Tools available</span>
            </div>

            <h2 className="qr-generator-heading">
              Find the <span>right</span> tool
            </h2>

            <div
              className="qr-generator-interface"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <form className="qr-generator-form" onSubmit={(e) => e.preventDefault()}>
                <div className="qr-form-row" style={{ gridTemplateColumns: "2fr 1fr" }}>
                  <div className="qr-form-group">
                    <label htmlFor="tools-search">Search</label>
                    <input
                      id="tools-search"
                      className="qr-input"
                      placeholder="Search tools by name"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>

                  <div className="qr-form-group">
                    <label htmlFor="tools-category">Category</label>
                    <select
                      id="tools-category"
                      className="qr-select"
                      style={{ marginBottom: 0 }}
                      value={activeType}
                      onChange={(e) => setActiveType(e.target.value as ToolType)}
                    >
                      <option value="All">All ({allItems.length})</option>
                      <option value="Calculators">
                        Calculators ({typeCounts.Calculators})
                      </option>
                      <option value="Generators">
                        Generators ({typeCounts.Generators})
                      </option>
                      <option value="Analyzers">
                        Analyzers ({typeCounts.Analyzers})
                      </option>
                      <option value="Utilities">Utilities ({typeCounts.Utilities})</option>
                    </select>
                  </div>
                </div>

                <div className="qr-form-actions">
                  <button
                    type="button"
                    className="qr-btn secondary small"
                    disabled={!query && activeType === "All"}
                    onClick={() => {
                      setQuery("");
                      setActiveType("All");
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            <div style={{ marginTop: "1rem", color: "#aaa", fontSize: 14 }}>
              Showing <strong style={{ color: "#fff" }}>{filtered.length}</strong>{" "}
              of <strong style={{ color: "#fff" }}>{allItems.length}</strong>
            </div>

            <div className="qr-features-grid" style={{ marginTop: "2rem" }}>
              {filtered.map((item) => (
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
                  <p>{getDisplayDescription(item)}</p>
                  <div style={{ marginTop: "1.25rem" }}>
                    <span className="qr-btn primary small">Open Tool</span>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="qr-error" style={{ marginTop: "2rem" }}>
                No tools matched your search.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
