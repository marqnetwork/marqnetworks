export const TOOL_IDS = [
  "age-calculator",
  "ai-automation-roi-calculator",
  "ai-business-efficiency-audit",
  "ai-json-formatter",
  "ai-marketing-performance-audit",
  "ai-sales-funnel-analyzer",
  "ai-website-conversion-analyzer",
  "base64-encoder",
  "break-even-calculator",
  "canonical-url-generator",
  "case-converter",
  "character-counter",
  "character-limit-checker",
  "color-picker",
  "comma-separator",
  "compound-interest-calculator",
  "content-readability-checker",
  "countdown-timer",
  "currency-converter",
  "css-minifier",
  "date-difference-calculator",
  "discount-calculator",
  "domain-name-generator",
  "duplicate-line-remover",
  "email-subject-line-tester",
  "hash-generator",
  "hashtag-generator",
  "headline-analyzer",
  "html-formatter",
  "instagram-caption-formatter",
  "js-minifier",
  "loan-payment-calculator",
  "marketing-budget-calculator",
  "open-graph-generator",
  "password-generator",
  "password-strength-checker",
  "pomodoro-timer",
  "random-number-generator",
  "random-word-generator",
  "robots-txt-generator",
  "sales-tax-calculator",
  "sitemap-generator",
  "slug-generator",
  "social-media-bio-generator",
  "text-cleaner",
  "text-reverser",
  "text-sorter",
  "timestamp-converter",
  "unit-converter",
  "url-encoder-decoder",
  "uuid-generator",
  "word-counter",
  "word-frequency-counter",
  "youtube-tag-formatter",
];

export const RESOURCES_STATIC_SLUGS = [
  "ai-instagram-caption-generator",
  "comma-separator",
  "facebook-video-downloader",
  "lorem-ipsum-generator",
  "random-word-generator",
  "remove-line-breaks",
  "roi-calculator",
  "word-counter",
] as const;

export type ResourceCardItem = {
  title: string;
  slug: string;
  href: string;
  description?: string;
  category: "Tools";
};

export const STANDALONE_TOOL_ITEMS: ResourceCardItem[] = [
  {
    title: "QR Code Scanner",
    slug: "qr-code-scanner",
    href: "/qr-code-scanner",
    description: "Scan QR codes directly from your camera in seconds.",
    category: "Tools",
  },
  {
    title: "QR Code Generator",
    slug: "qr-generator",
    href: "/qr-generator",
    description: "Create custom QR codes for links, text, and more.",
    category: "Tools",
  },
  {
    title: "Link Shortener",
    slug: "link-shortener",
    href: "/link-shortener",
    description: "Shorten long URLs into clean, shareable links.",
    category: "Tools",
  },
  {
    title: "Percentage Calculator",
    slug: "percentage-calculator",
    href: "/percentage-calculator",
    description: "Calculate percentages, increases, decreases, and more.",
    category: "Tools",
  },
];

const ACRONYMS = new Set(["ai", "api", "css", "html", "js", "roi", "url", "uuid"]);

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => {
      const lower = part.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

const DESCRIPTION_OVERRIDES: Record<string, string> = {
  "ai-automation-roi-calculator":
    "Estimate the ROI of automating repetitive workflows across your team and get a simple payback snapshot.",
  "ai-json-formatter":
    "Paste JSON and instantly format it for readability with helpful validation feedback.",
};

const TITLE_OVERRIDES: Record<string, string> = {
  "ai-json-formatter": "AI JSON Formatter",
  "ai-automation-roi-calculator": "AI Automation ROI Calculator",
};

export function getToolMeta(toolId: string) {
  const title = TITLE_OVERRIDES[toolId] || titleFromSlug(toolId);
  const description = DESCRIPTION_OVERRIDES[toolId];

  return {
    id: toolId,
    slug: toolId,
    title,
    description,
    href: `/resources/${toolId}`,
    category: "Tools" as const,
  };
}

export const RESOURCES_STATIC_ITEMS: ResourceCardItem[] = [
  {
    title: "AI Instagram Caption Generator",
    slug: "ai-instagram-caption-generator",
    href: "/resources/ai-instagram-caption-generator",
    category: "Tools",
  },
  {
    title: "Facebook Video Downloader",
    slug: "facebook-video-downloader",
    href: "/resources/facebook-video-downloader",
    category: "Tools",
  },
  {
    title: "ROI Calculator",
    slug: "roi-calculator",
    href: "/resources/roi-calculator",
    category: "Tools",
  },
  {
    title: "Remove Line Breaks",
    slug: "remove-line-breaks",
    href: "/resources/remove-line-breaks",
    category: "Tools",
  },
  {
    title: "Comma Separator",
    slug: "comma-separator",
    href: "/resources/comma-separator",
    category: "Tools",
  },
  {
    title: "Word Counter",
    slug: "word-counter",
    href: "/resources/word-counter",
    category: "Tools",
  },
  {
    title: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    href: "/resources/lorem-ipsum-generator",
    category: "Tools",
  },
  {
    title: "Random Word Generator",
    slug: "random-word-generator",
    href: "/resources/random-word-generator",
    category: "Tools",
  },
];

export function getAllToolItems() {
  const staticSlugs = new Set<string>(RESOURCES_STATIC_SLUGS as unknown as string[]);
  const toolItems = TOOL_IDS.filter((id) => !staticSlugs.has(id)).map((id) =>
    getToolMeta(id),
  );

  const all = [...STANDALONE_TOOL_ITEMS, ...RESOURCES_STATIC_ITEMS, ...toolItems];
  const bySlug = new Map<string, ResourceCardItem>();
  for (const item of all) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
  }
  return Array.from(bySlug.values()).sort((a, b) => a.title.localeCompare(b.title));
}

function toolTypeFromSlug(slug: string) {
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

export function getRelatedToolItems(currentSlug: string, limit = 6) {
  const all = getAllToolItems();
  const currentType = toolTypeFromSlug(currentSlug);

  const sameType = all.filter(
    (item) => item.slug !== currentSlug && toolTypeFromSlug(item.slug) === currentType,
  );
  const fallback = all.filter((item) => item.slug !== currentSlug);

  const pickFrom = sameType.length >= limit ? sameType : fallback;
  return pickFrom.slice(0, limit);
}
