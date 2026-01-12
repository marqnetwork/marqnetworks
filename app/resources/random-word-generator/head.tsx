export default function Head() {
  const title = "Random Word Generator | Creative Writing Tool | MarQ Networks";
  const description =
    "Generate random words instantly with our free online tool. Filter by nouns, verbs, or adjectives to boost your creativity and vocabulary.";
  const url = "https://marqnetworks.com/resources/random-word-generator";
  const image = "/images/logo.png";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "MarQ Networks Random Word Generator",
        operatingSystem: "Web",
        applicationCategory: "UtilityApplication",
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        description:
          "Free online tool to generate random words, nouns, verbs, and adjectives.",
        url,
        publisher: { "@type": "Organization", name: "MarQ Networks" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a Random Word Generator?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "It is a tool that produces words randomly from a database, helping users discover new vocabulary or overcome writer's block.",
            },
          },
          {
            "@type": "Question",
            name: "Can I filter by word type?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes, you can choose to generate 'All Words', 'Verbs Only', 'Nouns Only', or 'Adjectives Only'.",
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
      <meta property="og:title" content="Random Word Generator — Spark Creativity Instantly" />
      <meta property="og:description" content="Free online tool to generate random nouns, verbs, and adjectives. Perfect for writers, teachers, and game developers." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Random Word Generator | MarQ Networks" />
      <meta name="twitter:description" content="Generate random words, nouns, and verbs instantly." />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
