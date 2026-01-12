export default function Head() {
  const title = "Free Lorem Ipsum Generator | MarQ Networks";
  const description =
    "Generate standard Lorem Ipsum dummy text for your designs. Select paragraphs, sentences, words, or list items. Free online tool for designers and developers.";
  const url = "https://marqnetworks.com/resources/lorem-ipsum-generator";
  const image = "/images/logo.png";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "MarQ Networks Lorem Ipsum Generator",
        operatingSystem: "Web",
        applicationCategory: "UtilityApplication",
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        description:
          "Free online tool to generate Lorem Ipsum placeholder text.",
        url,
        publisher: { "@type": "Organization", name: "MarQ Networks" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Lorem Ipsum?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Lorem Ipsum is dummy text used in the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.",
            },
          },
          {
            "@type": "Question",
            name: "Is this tool free?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes, this Lorem Ipsum Generator is completely free to use.",
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
      <meta property="og:title" content="Lorem Ipsum Generator — Free Dummy Text Tool" />
      <meta property="og:description" content="Generate standard Lorem Ipsum placeholder text for your designs instantly." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Lorem Ipsum Generator | MarQ Networks" />
      <meta name="twitter:description" content="Generate dummy text instantly." />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
