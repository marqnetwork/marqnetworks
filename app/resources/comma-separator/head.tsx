export default function Head() {
  const title = "Free Comma Separator Tool | MarQ Networks";
  const description =
    "Convert lists into comma-separated text instantly. Customize delimiters for CSV, SQL, arrays, and more. Free online tool for developers and data analysts.";
  const url = "https://marqnetworks.com/resources/comma-separator";
  const image = "/images/logo.png";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "MarQ Networks Comma Separator",
        operatingSystem: "Web",
        applicationCategory: "UtilityApplication",
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        description:
          "Free online tool to convert column lists to comma-separated values.",
        url,
        publisher: { "@type": "Organization", name: "MarQ Networks" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does this tool do?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "It takes a vertical list of items (like from Excel) and converts it into a single line separated by commas or any custom delimiter.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use custom delimiters?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes, you can choose from common delimiters like comma, semicolon, pipe, or enter your own custom separator.",
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
      <meta property="og:title" content="Comma Separator Tool — Convert Lists Instantly" />
      <meta property="og:description" content="Transform lists into comma-separated text. Perfect for SQL queries, CSV data, and programming arrays." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Comma Separator Tool | MarQ Networks" />
      <meta name="twitter:description" content="Convert lists to delimited text instantly." />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
