export default function Head() {
  const title = "Free Online Word Counter Tool | MarQ Networks";
  const description =
    "Count words, characters, paragraphs, and sentences instantly with our free online word counter tool. Perfect for writers, students, and SEO professionals.";
  const url = "https://marqnetworks.com/resources/word-counter";
  const image = "/images/logo.png";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "MarQ Networks Word Counter",
        operatingSystem: "Web",
        applicationCategory: "UtilityApplication",
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        description:
          "Free online tool to count words, characters, and paragraphs in real-time.",
        url,
        publisher: { "@type": "Organization", name: "MarQ Networks" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the word counter work?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Simply paste or type your text into the input area, and the tool will automatically count words, characters, sentences, and paragraphs in real-time.",
            },
          },
          {
            "@type": "Question",
            name: "Is this word counter free?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes, this tool is completely free to use with no limits on text length.",
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
      <meta property="og:title" content="Word Counter Tool — Count Words & Characters Instantly" />
      <meta property="og:description" content="Free online word counter for writers, SEOs, and content creators. Track character counts, sentences, and paragraphs in real-time." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Word Counter Tool | MarQ Networks" />
      <meta name="twitter:description" content="Count words, characters, and paragraphs instantly." />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
