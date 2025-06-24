export default function Head() {
  const title = "MarQ Networks | AI-Driven Digital Growth Partner";
  const description = "Unlock scalable growth with MarQ Networks, your AI-driven partner for digital transformation. Specializing in advanced SEO audits, CRM automation, and custom development.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* ✅ Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://marqnetworks.com" />
      <meta property="og:image" content="https://marqnetworks.com/images/og-image.png" />
      <meta property="og:site_name" content="MarQ Networks" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2025-06-24T00:00:00Z" />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://marqnetworks.com/images/og-image.png" />

      {/* ✅ Canonical */}
      <link rel="canonical" href="https://marqnetworks.com" />

      {/* ✅ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MarQ Networks",
            url: "https://marqnetworks.com",
            logo: "https://marqnetworks.com/logo.png",
            description: description,
            sameAs: [
              "https://www.linkedin.com/company/marqnetworks"
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+971-XXXXXXX", // ✅ Add your number
                contactType: "Customer Service",
                areaServed: "AE",
                availableLanguage: "English"
              }
            ]
          }),
        }}
      />
    </>
  );
}
