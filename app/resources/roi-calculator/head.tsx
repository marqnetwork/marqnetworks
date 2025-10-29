export default function Head() {
  const title = "Free ROI Calculator for Small Business | MarQ Networks Growth Tool";
  const description =
    "Calculate your marketing ROI instantly. Compare your results with industry benchmarks and learn how to improve ROI — powered by MarQ Networks.";
  const url = "https://marqnetworks.com/resources/roi-calculator";
  const image = "/images/logo.png";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "MarQ Networks ROI Calculator",
        operatingSystem: "Web",
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        description:
          "Free ROI calculator for small businesses to measure marketing impact.",
        url,
        publisher: { "@type": "Organization", name: "MarQ Networks" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What’s a good ROI in marketing?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "For small businesses, 20%+ can be considered good, though it varies by industry.",
            },
          },
          {
            "@type": "Question",
            name: "How is ROI calculated?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Use ((Revenue - Spend) / Spend) × 100 to get ROI as a percentage.",
            },
          },
          {
            "@type": "Question",
            name: "How to improve ROI?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Improve targeting, optimize creatives, increase conversion rate, and reduce acquisition costs.",
            },
          },
          {
            "@type": "Question",
            name: "What is ROAS vs ROI?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "ROAS measures revenue generated per ad dollar; ROI accounts for total profit relative to spend.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* OG tags */}
      <meta property="og:title" content="ROI Calculator — Measure Your Marketing Impact" />
      <meta property="og:description" content="See how your campaigns perform, and plan smarter growth strategies." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free ROI Calculator | MarQ Networks" />
      <meta name="twitter:description" content="Calculate your marketing ROI and compare with industry benchmarks." />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}