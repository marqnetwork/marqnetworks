export default function Head() {
  const title = "MarQ Networks | AI-Driven Digital Growth Partner";
  const description =
    "Unlock scalable growth with MarQ Networks, your AI-driven partner for digital transformation. Specializing in advanced SEO audits, CRM automation, and custom development.";

  return (
    <>
     {/* ✅ Google Search Console Verification */}
      {/* <meta name="google-site-verification" content="aoRQn68XYkFeXk4wMJt8_h2D-8j5csxQs9YosL1UkTI" /> */}

      <title>{title}</title>
      <meta name="description" content={description} />

      {/* ✅ Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://marqnetworks.com" />
      <meta
        property="og:image"
        content="https://marqnetworks.com/images/og-image.png"
      />
      <meta property="og:site_name" content="MarQ Networks" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2025-06-24T00:00:00Z" />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://marqnetworks.com/images/og-image.png"
      />

      {/* ✅ Canonical */}
      <link rel="canonical" href="https://marqnetworks.com" />

      {/* ✅ Schema.org: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MarQ Networks",
            url: "https://marqnetworks.com",
            logo: "https://marqnetworks.com/images/logo.png",
            description: description,
            sameAs: [
              "https://www.linkedin.com/company/marqnetworks",
              "https://www.instagram.com/marqnetworksofficial",
              "https://x.com/MarqNetworks",
              "https://www.youtube.com/channel/UC1RxV5Vh7-4dF1AFHDJBxcQ"
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+971-XXXXXXX",
                contactType: "Customer Support",
                areaServed: "AE",
                availableLanguage: "English"
              }
            ]
          }),
        }}
      />

      {/* ✅ Schema.org: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://www.marqnetworks.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.marqnetworks.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />

      {/* ✅ Schema.org: Site Navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: ["About", "Solutions", "Portfolio", "Contact"],
            url: [
              "https://www.marqnetworks.com/About/",
              "https://www.marqnetworks.com/Solution/",
              "https://www.marqnetworks.com/Portfolio/",
              "https://www.marqnetworks.com/Contact/"
            ]
          }),
        }}
      />
    </>
  );
}
