// app/head.tsx
export default function Head() {
  const title = "MarQ Networks | AI-Driven Digital Growth Partner";
  const description = "Unlock scalable growth with MarQ Networks...";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* ✅ OpenGraph Meta */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://marqnetworks.com" />
      <meta property="og:image" content="https://marqnetworks.com/images/og-image.png" />
      <meta property="og:site_name" content="MarQ Networks" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2025-06-24T00:00:00Z" />

      {/* ✅ Twitter Meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://marqnetworks.com/images/og-image.png" />

      {/* ✅ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MarQ Networks",
            "url": "https://marqnetworks.com",
            "logo": "https://marqnetworks.com/logo.png",
            "sameAs": ["https://www.linkedin.com/company/marqnetworks"],
            "description": description,
          }),
        }}
      />
    </>
  );
}
