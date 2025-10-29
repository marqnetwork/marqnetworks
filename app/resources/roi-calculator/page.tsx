"use client";
import { useEffect, useMemo, useState } from "react";
import "./roi-calculator.css";

// ROI Calculator — MarQ Networks Resource
// Stack: Next.js (App Router) + Tailwind + Vanilla JS
// Features: ROI formula, gauge, summary, benchmarks, tips, SEO, GA events, PDF, share, email, advanced tab

// Metadata moved to route-level head.tsx to comply with client component constraints

type IndustryKey = "Agency" | "E-commerce" | "Real Estate" | "Restaurant" | "SaaS";

const INDUSTRY_BENCHMARKS: Record<IndustryKey, number> = {
  Agency: 320,
  "E-commerce": 280,
  "Real Estate": 150,
  Restaurant: 130,
  SaaS: 200,
};

function trackEvent(event: string, params?: Record<string, any>) {
  try {
    // Prefer gtag if available
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag("event", event, params || {});
      return;
    }
    // Fallback to dataLayer
    // @ts-ignore
    if (window.dataLayer) {
      // @ts-ignore
      window.dataLayer.push({ event, ...params });
    }
  } catch (_) { }
}

export default function ROICalculatorPage() {
  const [spend, setSpend] = useState<number>(2000);
  const [revenue, setRevenue] = useState<number>(6000);
  const [months, setMonths] = useState<number>(3);
  const [industry, setIndustry] = useState<IndustryKey>("Agency");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  // Advanced analytics inputs (kept minimal; optional)
  const [newCustomers, setNewCustomers] = useState<number>(50);
  const [ltv, setLtv] = useState<number>(500); // LTV input for illustrative purposes

  const roi = useMemo(() => {
    if (spend === 0) return revenue > 0 ? 10000 : 0; // avoid div by zero; extreme positive
    return ((revenue - spend) / spend) * 100;
  }, [spend, revenue]);

  const roiRounded = useMemo(() => Math.round(roi * 10) / 10, [roi]);

  const classification = useMemo(() => {
    if (roi < 0) return "Loss";
    if (roi >= 0 && roi <= 20) return "Break-even";
    return "Profit";
  }, [roi]);

  const gaugeAngle = useMemo(() => {
    // Map ROI range [-100%, +300%] -> angle [-90deg, +90deg]
    const minROI = -100;
    const maxROI = 300;
    const clamped = Math.max(minROI, Math.min(maxROI, roi));
    const ratio = (clamped - minROI) / (maxROI - minROI);
    return -90 + ratio * 180; // degrees
  }, [roi]);

  const improvementTip = useMemo(() => {
    // Simple heuristic: +1% CTR proxy => +1% revenue lift
    const improvedRevenue = revenue * 1.01;
    const improvedROI = spend === 0 ? 10000 : ((improvedRevenue - spend) / spend) * 100;
    const improvedRounded = Math.round(improvedROI * 10) / 10;
    return `Improve ad CTR by 1% to boost ROI to ${improvedRounded}%.`;
  }, [revenue, spend]);

  const benchmark = INDUSTRY_BENCHMARKS[industry];

  // Advanced calculations
  const roas = useMemo(() => (spend === 0 ? 0 : revenue / spend), [revenue, spend]);
  const cac = useMemo(() => (newCustomers === 0 ? 0 : spend / newCustomers), [spend, newCustomers]);
  const profitMargin = useMemo(() => (revenue === 0 ? 0 : ((revenue - spend) / revenue) * 100), [revenue, spend]);
  const breakEvenRevenue = spend; // revenue required to break even

  const summaryText = useMemo(() => {
    const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    return `With a spend of ${formatter.format(spend)} and revenue of ${formatter.format(revenue)}, your ROI is ${roiRounded}%. That’s ${classification.toLowerCase()} for small businesses.`;
  }, [spend, revenue, roiRounded, classification]);

  function onCalculate() {
    trackEvent("roi_calculate", { spend, revenue, months, roi: roiRounded, industry });
  }

  function onReset() {
    setSpend(2000);
    setRevenue(6000);
    setMonths(3);
    setIndustry("Agency");
    setNewCustomers(50);
    setLtv(500);
    setEmail("");
    trackEvent("roi_reset");
  }

  function onDownloadPDF() {
    trackEvent("roi_download_pdf", { roi: roiRounded });
    // Leverage browser print to PDF
    window.print();
  }

  function onShare() {
    const text = encodeURIComponent(
      `My marketing ROI is ${roiRounded}% (${classification}). Calculate yours at MarQ Networks.`
    );
    const url = encodeURIComponent("https://marqnetworks.com/resources/roi-calculator");
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    trackEvent("roi_share", { roi: roiRounded });
    window.open(shareUrl, "_blank");
  }

  function onEmailResults() {
    const body = encodeURIComponent(
      `ROI Results\nROI: ${roiRounded}% (${classification})\nSpend: $${spend}\nRevenue: $${revenue}\nDuration: ${months} months\nIndustry: ${industry}\n\nBenchmarks: ${benchmark}%\nSummary: ${summaryText}`
    );
    trackEvent("roi_email_results", { email, roi: roiRounded });
    window.location.href = `mailto:support@marqnetworks.com?subject=My ROI Results&body=${body}`;
  }

  useEffect(() => {
    // Initial preview event with smart defaults
    trackEvent("roi_page_view", { spend, revenue, months, industry });
  }, []);

  return (

    <div className="roi-calculator-container">
      {/* Hero Section */}
      <section className="roi-hero-section">
        <div className="roi-hero-container">
          <div className="roi-hero-tag">
            <span className="roi-year">2025</span>
            <span className="roi-tag-text">ROI Calculator Service</span>
          </div>

          <h1 className="roi-hero-heading">
            Calculate Your Marketing <span>ROI</span>
          </h1>

          <p className="roi-hero-subtext">
            Measure your marketing return on investment with our advanced ROI calculator.
            Get insights, benchmarks, and actionable recommendations to optimize your campaigns.
          </p>

          <div className="roi-hero-buttons">
            <button
              className="roi-btn primary"
              onClick={() => document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Calculate ROI Now
            </button>
            <button className="roi-btn secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator-section" className="roi-calculator-section">
        <div className="roi-calculator-wrapper">
          {/* Inputs */}
          <div className="roi-input-panel">
            <h2 className="text-2xl font-semibold mb-4">Your Inputs</h2>

            {/* Spend */}
            <div className="roi-input-group">
              <label className="block text-sm font-medium mb-1" htmlFor="spend">Total Marketing Spend (USD)</label>
              <input
                id="spend"
                aria-label="Total Marketing Spend in US Dollars"
                type="number"
                min={0}
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#14173A] px-3 py-2"
                placeholder="e.g., 2000"
              />
              <p className="roi-input-tip">Tip: Include ad spend, creative, and tools.</p>
            </div>

            {/* Revenue */}
            <div className="roi-input-group mt-4">
              <label className="block text-sm font-medium mb-1" htmlFor="revenue">Total Revenue Generated (USD)</label>
              <input
                id="revenue"
                aria-label="Total Revenue Generated in US Dollars"
                type="number"
                min={0}
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#14173A] px-3 py-2"
                placeholder="e.g., 6000"
              />
              <p className="roi-input-tip">Tip: Use attributable revenue for accuracy.</p>
            </div>

            {/* Duration */}
            <div className="roi-input-group mt-4">
              <label className="block text-sm font-medium mb-1" htmlFor="months">Campaign Duration (months)</label>
              <input
                id="months"
                aria-label="Campaign Duration in Months"
                type="number"
                min={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#14173A] px-3 py-2"
                placeholder="e.g., 3"
              />
              <p className="roi-input-tip">Tip: Helps contextualize performance over time.</p>
            </div>

            {/* Industry */}
            <div className="roi-input-group mt-4">
              <label className="block text-sm font-medium mb-1" htmlFor="industry">Industry</label>
              <select
                id="industry"
                aria-label="Industry Selector"
                value={industry}
                onChange={(e) => setIndustry(e.target.value as IndustryKey)}
                className="w-full rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#14173A] px-3 py-2"
              >
                {Object.keys(INDUSTRY_BENCHMARKS).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <p className="roi-input-tip">Tip: Compare your ROI against typical industry performance.</p>
            </div>

            {/* Action Buttons */}
            <div className="roi-action-buttons">
              <button
                onClick={onCalculate}
                className="roi-btn primary"
              >
                Calculate ROI
              </button>
              <button
                onClick={onReset}
                className="roi-btn secondary"
              >
                Reset
              </button>
              <button
                onClick={onDownloadPDF}
                className="roi-btn success"
              >
                Download PDF
              </button>
              <button
                onClick={onShare}
                className="roi-btn info"
              >
                Share Results
              </button>
            </div>
          </div>

          {/* Outputs */}
          <div className="roi-output-panel">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>

            {/* Gauge */}
            <div className="flex items-center gap-6">
              <div className="roi-gauge-container">
                <svg className="roi-gauge" viewBox="0 0 200 100" role="img" aria-label={`ROI gauge at ${roiRounded}%`}>
                  <path className="roi-gauge-arc" d="M10 100 A90 90 0 0 1 190 100" />
                  <g style={{ transform: `rotate(${gaugeAngle}deg)`, transformOrigin: "100px 100px" }}>
                    <line className="roi-gauge-needle" x1="100" y1="100" x2="100" y2="20" />
                  </g>
                </svg>
              </div>
              <div>
                <p className="roi-percentage">{roiRounded}%</p>
                <p className="roi-classification">Classification: {classification}</p>
                <p className="mt-2 text-sm">Benchmark ({industry}): {benchmark}%</p>
              </div>
            </div>

            {/* Summary */}
            <p className="mt-4 text-sm md:text-base">{summaryText}</p>
            <p className="mt-2 text-sm text-[#5E5E5E] dark:text-white/60">{improvementTip}</p>

            {/* Email capture */}
            <div className="roi-input-group mt-5">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email my results (optional)</label>
              <div className="flex gap-2">
                <input
                  id="email"
                  aria-label="Email address to receive ROI results"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#14173A] px-3 py-2"
                  placeholder="you@company.com"
                />
                <button
                  onClick={onEmailResults}
                  className="rounded-md bg-[#1A1C82] text-white px-4 py-2 hover:bg-[#14156a]"
                >
                  Email Results
                </button>
              </div>
            </div>
          </div>
          </div>
      </section>

      {/* Benchmarks & Insights */}
      <section className="roi-benchmarks-section">
        <div className="roi-benchmarks-grid">
          <div className="roi-benchmark-card">
            <h3 className="text-xl font-semibold">Industry Benchmarks</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Marketing Agency: 320%</li>
              <li>E-commerce: 280%</li>
              <li>Real Estate: 150%</li>
              <li>Restaurant: 130%</li>
            </ul>
            <p className="mt-3 text-sm">
              Source reference: <a className="underline text-[#3A2A96]" href="https://blog.hubspot.com/marketing/roi" target="_blank" rel="noopener noreferrer">HubSpot</a>
            </p>
            <div className="mt-4 text-sm">
              <a className="underline text-[#1A1C82]" href="/blog/improve-roi">Learn 5 Ways to Improve ROI</a>
              <span className="mx-2">•</span>
              <a className="underline text-[#1A1C82]" href="/contact">Work With Us</a>
            </div>
          </div>

          <div className="roi-benchmark-card">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Advanced Analytics (Optional)</h3>
              <button
                aria-expanded={showAdvanced}
                onClick={() => setShowAdvanced((s) => !s)}
                className="rounded-md bg-gray-100 dark:bg-white/10 text-[#1A1C82] dark:text-white px-3 py-1"
              >
                {showAdvanced ? "Hide" : "Show"}
              </button>
            </div>
            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div className="roi-input-group">
                  <label className="block text-sm mb-1">New Customers (for CAC)</label>
                  <input
                    type="number"
                    min={0}
                    value={newCustomers}
                    onChange={(e) => setNewCustomers(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#14173A] px-3 py-2"
                  />
                </div>
                <div className="roi-input-group">
                  <label className="block text-sm mb-1">Customer Lifetime Value (LTV)</label>
                  <input
                    type="number"
                    min={0}
                    value={ltv}
                    onChange={(e) => setLtv(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#14173A] px-3 py-2"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-md bg-gray-50 dark:bg-white/5 p-3">
                    <p className="font-medium">ROAS</p>
                    <p>{Math.round(roas * 100) / 100}x</p>
                  </div>
                  <div className="rounded-md bg-gray-50 dark:bg-white/5 p-3">
                    <p className="font-medium">CAC</p>
                    <p>${Math.round(cac * 100) / 100}</p>
                  </div>
                  <div className="rounded-md bg-gray-50 dark:bg-white/5 p-3">
                    <p className="font-medium">Profit Margin</p>
                    <p>{Math.round(profitMargin * 10) / 10}%</p>
                  </div>
                  <div className="rounded-md bg-gray-50 dark:bg-white/5 p-3">
                    <p className="font-medium">Break-even Revenue</p>
                    <p>${breakEvenRevenue}</p>
                  </div>
                  <div className="rounded-md bg-gray-50 dark:bg-white/5 p-3 md:col-span-2">
                    <p className="font-medium">LTV/CAC Ratio</p>
                    <p>{cac === 0 ? "—" : Math.round((ltv / cac) * 100) / 100}</p>
                  </div>
                </div>
                {/**
                 * Example AI summary: "Your ROI is higher than average for your industry. Try reducing ad spend to increase profit margin."
                 * Future: Add forecast using ML and dynamic benchmark comparison.
                 */}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="roi-features-section">
        <div className="roi-features-container">
          <div className="roi-features-tag">
            <span className="roi-year">Pro</span>
            <span className="roi-tag-text">Features</span>
          </div>

          <h2 className="roi-features-heading">
            Why Choose Our <span>ROI Calculator</span>
          </h2>

          <div className="roi-features-grid">
            <div className="roi-feature-card">
              <div className="roi-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Instant ROI calculations with real-time results and dynamic insights</p>
            </div>

            <div className="roi-feature-card">
              <div className="roi-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3>Advanced Analytics</h3>
              <p>Get ROAS, CAC, profit margins, and industry benchmark comparisons</p>
            </div>

            <div className="roi-feature-card">
              <div className="roi-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3>Smart Insights</h3>
              <p>AI-powered improvement tips and ROI optimization recommendations</p>
            </div>

            <div className="roi-feature-card">
              <div className="roi-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3>Export & Share</h3>
              <p>Download PDF reports and share results with your team instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="roi-faq-section">
        <div className="roi-faq-container">
          <div className="roi-faq-tag">
            <span className="roi-year">Help</span>
            <span className="roi-tag-text">FAQ</span>
          </div>

          <h2 className="roi-faq-heading">
            Frequently Asked <span>Questions</span>
          </h2>
          <div className="roi-faq-list">
            <details className="py-3">
              <summary className="cursor-pointer font-medium">What’s a good ROI in marketing?</summary>
              <p className="mt-2 text-sm">For small businesses, 20%+ can be considered good, though it varies by industry.</p>
            </details>
            <details className="py-3">
              <summary className="cursor-pointer font-medium">How is ROI calculated?</summary>
              <p className="mt-2 text-sm">Use ((Revenue - Spend) / Spend) × 100 to get ROI as a percentage.</p>
            </details>
            <details className="py-3">
              <summary className="cursor-pointer font-medium">How to improve ROI?</summary>
              <p className="mt-2 text-sm">Improve targeting, optimize creatives, increase conversion rate, and reduce acquisition costs.</p>
            </details>
            <details className="py-3">
              <summary className="cursor-pointer font-medium">What is ROAS vs ROI?</summary>
              <p className="mt-2 text-sm">ROAS measures revenue generated per ad dollar; ROI accounts for total profit relative to spend.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-10">
        <div className="rounded-xl bg-gradient-to-r from-[#1A1C82] to-[#3A2A96] p-6 md:p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-semibold">Want to increase your ROI? Let’s build your growth strategy.</h3>
          <div className="mt-4">
            <a href="/contact" className="inline-block rounded-md bg-white text-[#1A1C82] px-4 py-2 font-semibold hover:bg-white/90">Work With Us</a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="roi-cta-section">
        <div className="roi-cta-container">
          <div className="roi-cta-content">
            <div className="roi-cta-tag">
              <span className="roi-year">Ready</span>
              <span className="roi-tag-text">Get Started</span>
            </div>

            <h2 className="roi-cta-heading">
              Need Help Improving Your <span>ROI?</span>
            </h2>

            <p className="roi-cta-description">
              Looking to optimize your marketing campaigns and boost ROI? Our growth strategy experts
              can help you build data-driven marketing funnels that deliver measurable results.
            </p>

            <div className="roi-cta-buttons">
              <button className="roi-btn primary">
                Contact Our Team
              </button>
              <button className="roi-btn secondary">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}