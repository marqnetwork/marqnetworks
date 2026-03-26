"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

function LoadingCard() {
  return (
    <div className="min-h-[calc(100vh-160px)] bg-black text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
          <div className="h-4 w-40 bg-white/10 rounded" />
          <div className="mt-3 h-8 w-80 bg-white/10 rounded" />
          <div className="mt-6 h-64 w-full bg-white/5 rounded-xl border border-white/5" />
        </div>
      </div>
    </div>
  );
}

const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "age-calculator": dynamic(
    () => import("../tools/AgeCalculatorPage").then((m) => m.AgeCalculatorPage),
    { ssr: false, loading: LoadingCard },
  ),
  "ai-automation-roi-calculator": dynamic(
    () => import("../tools/ROICalculatorPage").then((m) => m.ROICalculatorPage),
    { ssr: false, loading: LoadingCard },
  ),
  "ai-business-efficiency-audit": dynamic(
    () =>
      import("../tools/BusinessEfficiencyAuditPage").then(
        (m) => m.BusinessEfficiencyAuditPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "ai-json-formatter": dynamic(
    () => import("../tools/JSONFormatterPage").then((m) => m.JSONFormatterPage),
    { ssr: false, loading: LoadingCard },
  ),
  "ai-marketing-performance-audit": dynamic(
    () =>
      import("../tools/MarketingPerformanceAuditPage").then(
        (m) => m.MarketingPerformanceAuditPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "ai-sales-funnel-analyzer": dynamic(
    () =>
      import("../tools/SalesFunnelAnalyzerPage").then(
        (m) => m.SalesFunnelAnalyzerPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "ai-website-conversion-analyzer": dynamic(
    () =>
      import("../tools/WebsiteConversionAnalyzerPage").then(
        (m) => m.WebsiteConversionAnalyzerPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "base64-encoder": dynamic(
    () =>
      import("../tools/Base64EncoderPage").then((m) => m.Base64EncoderPage),
    { ssr: false, loading: LoadingCard },
  ),
  "break-even-calculator": dynamic(
    () =>
      import("../tools/BreakEvenCalculatorPage").then(
        (m) => m.BreakEvenCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "canonical-url-generator": dynamic(
    () =>
      import("../tools/CanonicalURLGeneratorPage").then(
        (m) => m.CanonicalURLGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "case-converter": dynamic(
    () =>
      import("../tools/CaseConverterPage").then((m) => m.CaseConverterPage),
    { ssr: false, loading: LoadingCard },
  ),
  "character-counter": dynamic(
    () =>
      import("../tools/CharacterCounterPage").then(
        (m) => m.CharacterCounterPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "character-limit-checker": dynamic(
    () =>
      import("../tools/CharacterLimitCheckerPage").then(
        (m) => m.CharacterLimitCheckerPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "color-picker": dynamic(
    () => import("../tools/ColorPickerPage").then((m) => m.ColorPickerPage),
    { ssr: false, loading: LoadingCard },
  ),
  "comma-separator": dynamic(
    () =>
      import("../tools/CommaSeparatorPage").then((m) => m.CommaSeparatorPage),
    { ssr: false, loading: LoadingCard },
  ),
  "compound-interest-calculator": dynamic(
    () =>
      import("../tools/CompoundInterestCalculatorPage").then(
        (m) => m.CompoundInterestCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "content-readability-checker": dynamic(
    () =>
      import("../tools/ContentReadabilityCheckerPage").then(
        (m) => m.ContentReadabilityCheckerPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "countdown-timer": dynamic(
    () =>
      import("../tools/CountdownTimerPage").then((m) => m.CountdownTimerPage),
    { ssr: false, loading: LoadingCard },
  ),
  "currency-converter": dynamic(
    () =>
      import("../tools/CurrencyConverterPage").then(
        (m) => m.CurrencyConverterPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "css-minifier": dynamic(
    () => import("../tools/CSSMinifierPage").then((m) => m.CSSMinifierPage),
    { ssr: false, loading: LoadingCard },
  ),
  "date-difference-calculator": dynamic(
    () =>
      import("../tools/DateDifferenceCalculatorPage").then(
        (m) => m.DateDifferenceCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "discount-calculator": dynamic(
    () =>
      import("../tools/DiscountCalculatorPage").then(
        (m) => m.DiscountCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "domain-name-generator": dynamic(
    () =>
      import("../tools/DomainNameGeneratorPage").then(
        (m) => m.DomainNameGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "duplicate-line-remover": dynamic(
    () =>
      import("../tools/DuplicateLineRemoverPage").then(
        (m) => m.DuplicateLineRemoverPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "email-subject-line-tester": dynamic(
    () =>
      import("../tools/EmailSubjectLineTesterPage").then(
        (m) => m.EmailSubjectLineTesterPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "hash-generator": dynamic(
    () => import("../tools/HashGeneratorPage").then((m) => m.HashGeneratorPage),
    { ssr: false, loading: LoadingCard },
  ),
  "hashtag-generator": dynamic(
    () =>
      import("../tools/HashtagGeneratorPage").then(
        (m) => m.HashtagGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "headline-analyzer": dynamic(
    () =>
      import("../tools/HeadlineAnalyzerPage").then((m) => m.HeadlineAnalyzerPage),
    { ssr: false, loading: LoadingCard },
  ),
  "html-formatter": dynamic(
    () => import("../tools/HTMLFormatterPage").then((m) => m.HTMLFormatterPage),
    { ssr: false, loading: LoadingCard },
  ),
  "instagram-caption-formatter": dynamic(
    () =>
      import("../tools/InstagramCaptionFormatterPage").then(
        (m) => m.InstagramCaptionFormatterPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "js-minifier": dynamic(
    () => import("../tools/JSMinifierPage").then((m) => m.JSMinifierPage),
    { ssr: false, loading: LoadingCard },
  ),
  "loan-payment-calculator": dynamic(
    () =>
      import("../tools/LoanPaymentCalculatorPage").then(
        (m) => m.LoanPaymentCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "lorem-ipsum-generator": dynamic(
    () =>
      import("../tools/LoremIpsumGeneratorPage").then(
        (m) => m.LoremIpsumGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "marketing-budget-calculator": dynamic(
    () =>
      import("../tools/MarketingBudgetCalculatorPage").then(
        (m) => m.MarketingBudgetCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "open-graph-generator": dynamic(
    () =>
      import("../tools/OpenGraphGeneratorPage").then(
        (m) => m.OpenGraphGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "password-generator": dynamic(
    () =>
      import("../tools/PasswordGeneratorPage").then(
        (m) => m.PasswordGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "password-strength-checker": dynamic(
    () =>
      import("../tools/PasswordStrengthCheckerPage").then(
        (m) => m.PasswordStrengthCheckerPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "pomodoro-timer": dynamic(
    () => import("../tools/PomodoroTimerPage").then((m) => m.PomodoroTimerPage),
    { ssr: false, loading: LoadingCard },
  ),
  "profit-margin-calculator": dynamic(
    () =>
      import("../tools/ProfitMarginCalculatorPage").then(
        (m) => m.ProfitMarginCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "random-number-generator": dynamic(
    () =>
      import("../tools/RandomNumberGeneratorPage").then(
        (m) => m.RandomNumberGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "random-word-generator": dynamic(
    () =>
      import("../tools/RandomWordGeneratorPage").then(
        (m) => m.RandomWordGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "regex-tester": dynamic(
    () => import("../tools/RegexTesterPage").then((m) => m.RegexTesterPage),
    { ssr: false, loading: LoadingCard },
  ),
  "robots-txt-generator": dynamic(
    () =>
      import("../tools/RobotsTxtGeneratorPage").then(
        (m) => m.RobotsTxtGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "sales-tax-calculator": dynamic(
    () =>
      import("../tools/SalesTaxCalculatorPage").then(
        (m) => m.SalesTaxCalculatorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "sitemap-generator": dynamic(
    () =>
      import("../tools/SitemapGeneratorPage").then(
        (m) => m.SitemapGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "slug-generator": dynamic(
    () => import("../tools/SlugGeneratorPage").then((m) => m.SlugGeneratorPage),
    { ssr: false, loading: LoadingCard },
  ),
  "social-media-bio-generator": dynamic(
    () =>
      import("../tools/SocialMediaBioGeneratorPage").then(
        (m) => m.SocialMediaBioGeneratorPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "text-cleaner": dynamic(
    () => import("../tools/TextCleanerPage").then((m) => m.TextCleanerPage),
    { ssr: false, loading: LoadingCard },
  ),
  "text-reverser": dynamic(
    () => import("../tools/TextReverserPage").then((m) => m.TextReverserPage),
    { ssr: false, loading: LoadingCard },
  ),
  "text-sorter": dynamic(
    () => import("../tools/TextSorterPage").then((m) => m.TextSorterPage),
    { ssr: false, loading: LoadingCard },
  ),
  "timestamp-converter": dynamic(
    () =>
      import("../tools/TimestampConverterPage").then(
        (m) => m.TimestampConverterPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "unit-converter": dynamic(
    () => import("../tools/UnitConverterPage").then((m) => m.UnitConverterPage),
    { ssr: false, loading: LoadingCard },
  ),
  "url-encoder-decoder": dynamic(
    () =>
      import("../tools/URLEncoderDecoderPage").then(
        (m) => m.URLEncoderDecoderPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "uuid-generator": dynamic(
    () => import("../tools/UUIDGeneratorPage").then((m) => m.UUIDGeneratorPage),
    { ssr: false, loading: LoadingCard },
  ),
  "word-counter": dynamic(
    () => import("../tools/WordCounterPage").then((m) => m.WordCounterPage),
    { ssr: false, loading: LoadingCard },
  ),
  "word-frequency-counter": dynamic(
    () =>
      import("../tools/WordFrequencyCounterPage").then(
        (m) => m.WordFrequencyCounterPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
  "youtube-tag-formatter": dynamic(
    () =>
      import("../tools/YouTubeTagFormatterPage").then(
        (m) => m.YouTubeTagFormatterPage,
      ),
    { ssr: false, loading: LoadingCard },
  ),
};

export function ToolPageClient({ toolId }: { toolId: string }) {
  const Tool = TOOL_COMPONENTS[toolId];
  if (!Tool) return null;
  return <Tool />;
}
