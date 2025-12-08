"use client";
import MarqButton from "@/components/MarqButton/MarqButton";
import "@/components/Hero/Hero.css";

function NumberBadge({ value }) {
  const lineSrc = `/images/VerticalLine${value}.png`;
  return (
    <div className="flex flex-col items-center">
    
      {/* Use per-card vertical line image */}
      <img src={lineSrc} alt={`Vertical connector ${value}`} className="mt-4 h-full w-auto" />
    </div>
  );
}

export default function ServicesCards() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-16">
      {/* Card 1 */}
      <div className="grid h-[90vh] grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
        <div className="space-y-6">
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">Strategy & Digital Transformation</p>
          <p className="text-white/70 text-sm md:text-base">Align teams, de-risk spend, and launch initiatives with an AI workflow transformation roadmap in 90 days.</p>
          <ul className="space-y-4 mb-20" style={{paddingTop:"20px" , paddingBottom:"20px"}}>
            {[
              "Vision & AI business road-mapping",
              "Tech & SOC-2 security audits",
              "AI workflow transformation services",
              "Change-management playbooks",
              "Brand identity & guidelines",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="size-2 rounded-full bg-white/90" />
                <span className="text-white/70 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <MarqButton className="primary-btn-hero mt-5" />
        </div>
        <NumberBadge value={1} />
        <div>
          <img src="/images/pillar1.png" alt="Strategy & Digital Transformation" className="w-full max-w-[430px] h-[280px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* Card 2 (reverse layout) */}
      <div className="grid h-[90vh]  grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
        <div>
          <img src="/images/pillar2.png" alt="Brand + Experience Design" className="w-full max-w-[430px] h-[280px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
        </div>
        <NumberBadge value={2} />
        <div className="space-y-6">
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">Brand + Experience Design</p>
          <p className="text-white/70 text-sm md:text-base">Align teams, de-risk spend, and launch initiatives with an AI workflow transformation roadmap in 90 days.</p>
          <ul className="space-y-4" style={{paddingTop:"20px" , paddingBottom:"20px"}}>
            {[
              "AI-powered UX/UI for web, SaaS & mobile",
              "Conversion-focused websites & headless e-commerce",
              "Motion, 3D & interactive content with AI heatmap insights",
              "Web / mobile / SaaS builds optimized by AI code assistant",
              "Brand identity & guidelines validated by AI heatmap user testing",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="size-2 rounded-full bg-white/90" />
                <span className="text-white/70 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <MarqButton className="primary-btn-hero" />
        </div>
      </div>

      {/* Card 3 */}
      <div className="grid h-[90vh]  grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
        <div className="space-y-6">
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">Custom Software & Automation</p>
          <p className="text-white/70 text-sm md:text-base">Align teams, de-risk spend, and launch initiatives with an AI workflow transformation roadmap in 90 days.</p>
          <ul className="space-y-4" style={{paddingTop:"20px" , paddingBottom:"20px"}}>
            {[
              "Full-stack web & SaaS engineering",
              "AI assistants, automations & orchestration",
              "Data pipelines, ETL & analytics",
              "DevOps, CI/CD & cloud infrastructure",
              "Security audits & SOC-2 readiness",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="size-2 rounded-full bg-white/90" />
                <span className="text-white/70 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <MarqButton className="primary-btn-hero" />
        </div>
        <NumberBadge value={3} />
        <div>
          <img src="/images/pillar3.png" alt="Custom Software & Automation" className="w-full max-w-[430px] h-[280px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* Card 4 (reverse layout) */}
      <div className="grid h-[90vh]  grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
        <div>
          <img src="/images/pillar4.png" alt="Data & Analytics Engineering" className="w-full max-w-[430px] h-[280px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
        </div>
        <NumberBadge value={4} />
        <div className="space-y-6">
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">Data & Analytics Engineering</p>
          <p className="text-white/70 text-sm md:text-base">Align teams, de-risk spend, and launch initiatives with an AI workflow transformation roadmap in 90 days.</p>
          <ul className="space-y-4" style={{paddingTop:"20px" , paddingBottom:"20px"}}>
            {[
              "Warehousing & lakehouse architectures",
              "ETL/ELT pipelines and orchestration",
              "BI dashboards and reporting",
              "Data quality, governance & lineage",
              "Customer data platforms (CDP)",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="size-2 rounded-full bg-white/90" />
                <span className="text-white/70 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <MarqButton className="primary-btn-hero" />
        </div>
      </div>

      {/* Card 5 */}
      <div className="grid h-[90vh]  grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
        <div className="space-y-6">
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">DevOps, Cloud & Security</p>
          <p className="text-white/70 text-sm md:text-base">Align teams, de-risk spend, and launch initiatives with an AI workflow transformation roadmap in 90 days.</p>
          <ul className="space-y-4" style={{paddingTop:"20px" , paddingBottom:"20px"}}>
            {[
              "CI/CD pipelines & automation",
              "Infrastructure as Code (IaC)",
              "Observability & monitoring",
              "Cost optimization & scaling",
              "Security audits & compliance",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="size-2 rounded-full bg-white/90" />
                <span className="text-white/70 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <MarqButton className="primary-btn-hero" />
        </div>
        <NumberBadge value={5} />
        <div>
          <img src="/images/pillar5.png" alt="DevOps, Cloud & Security" className="w-full max-w-[430px] h-[280px] rounded-[20px] object-cover shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </section>
  );
}
