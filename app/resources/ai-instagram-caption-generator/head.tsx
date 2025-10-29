export default function Head() {
  const title = "Free AI Instagram Caption Generator for Businesses | MarQ Networks";
  const description =
    "Generate engaging Instagram captions in seconds. Choose your tone, audience, and style — powered by AI at MarQ Networks.";
  const url = "https://marqnetworks.com/resources/ai-instagram-caption-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Instagram Caption Generator",
    operatingSystem: "Web",
    applicationCategory: "SocialNetworkingApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes a good Instagram caption?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Strong hook, clear value, relevant hashtags, and a CTA for engagement.",
        },
      },
      {
        "@type": "Question",
        name: "How do I write captions for business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use professional tone, highlight benefits, include trust signals, and add ‘Link in bio’ or ‘DM’.",
        },
      },
      {
        "@type": "Question",
        name: "How does AI generate captions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It structures topic, tone, and audience into persuasive language with emojis and hashtags.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use emojis and hashtags automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — the generator suggests relevant emojis and hashtags aligned to your topic and tone.",
        },
      },
    ],
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="AI caption generator, Instagram caption tool, Free caption generator online, Social media content tool" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}