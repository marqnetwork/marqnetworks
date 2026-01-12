export default function Head() {
  const title = "Remove Line Breaks Tool | Clean Text Formatting | MarQ Networks";
  const description =
    "Free online tool to remove line breaks and paragraph breaks from your text. Clean up formatted content, code snippets, or data instantly.";
  const url = "https://marqnetworks.com/resources/remove-line-breaks";
  const image = "/images/logo.png";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "MarQ Networks Remove Line Breaks Tool",
        operatingSystem: "Web",
        applicationCategory: "UtilityApplication",
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        description:
          "Free online tool to remove unwanted line breaks from text.",
        url,
        publisher: { "@type": "Organization", name: "MarQ Networks" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I remove line breaks?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Simply paste your text into the input box, select 'Remove line breaks only' or 'Remove line breaks and paragraph breaks', and click Convert.",
            },
          },
          {
            "@type": "Question",
            name: "Does this tool keep paragraphs?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes, if you choose the 'Remove line breaks only' option, it will preserve double line breaks (paragraphs) while removing single line breaks.",
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
      <meta property="og:title" content="Remove Line Breaks Tool — Clean Up Text Instantly" />
      <meta property="og:description" content="Free online tool to remove line breaks and paragraph breaks. Perfect for fixing copied text formatting." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Remove Line Breaks Tool | MarQ Networks" />
      <meta name="twitter:description" content="Clean up text formatting instantly." />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
