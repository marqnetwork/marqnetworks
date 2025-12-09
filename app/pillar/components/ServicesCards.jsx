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
      <div className="grid h-full grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
        <div className="space-y-6">
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">MarQ Consultancy</p>
          <p className="text-white/70 text-sm md:text-base">Growth strategy consultant for startups and enterprises delivering AI business roadmaps, generative search optimization, and go-to-market execution.</p>
          <ul className="space-y-4 mb-20" style={{paddingTop:"20px" , paddingBottom:"20px",marginBottom:"20px"}}>
            {[
              "AI-Driven Business Strategy",
              "Go-To-Market Planning",
              "CX & Sales Optimization",
              "Brand Positioning & Messaging",
              "Pricing & Revenue Strategy",
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
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">MarQ Creative Logics</p>
          <p className="text-white/70 text-sm md:text-base">Branding agency for startups and tech companies focused on emotional branding, UI/UX design, and conversion-driven creative.</p>
          <ul className="space-y-4" style={{paddingTop:"20px" , paddingBottom:"20px",marginBottom:"20px"}}>
            {[
              "Brand Identity + Visual Systems",
              "Conversion-Focused Websites",
              "High-End UI/UX Design",
              "Social & Content Design",
              "Video, Motion & Product Creative",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 py-4">
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
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">MarQ Software House</p>
          <p className="text-white/70 text-sm md:text-base">Custom software development company specializing in scalable AI websites, MVP builds, and headless eCommerce.</p>
          <ul className="space-y-4" style={{paddingTop:"20px" , paddingBottom:"20px",marginBottom:"20px"}}>
            {[
              "Full-Stack Web & Mobile Apps",
              "AI Website Development",
              "Headless eCommerce Platforms",
              "Cybersecurity & Compliance",
              "API Integrations & DevOps",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 py-4">
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
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">MarQ Growth Pod</p>
          <p className="text-white/70 text-sm md:text-base">Performance-driven funnel marketing agency delivering automation-powered revenue systems.</p>
          <ul className="space-y-4" style={{paddingTop:"20px" , paddingBottom:"20px",marginBottom:"20px"}}>
            {[
              "CRM Setup & Automations",
              "Lead-Gen Funnels (B2B & DTC)",
              "Paid Media & Retargeting",
              "Email & SMS Automations",
              "SEO for High-Intent Traffic",
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
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[28px] md:text-[32px] text-white">Offshore Excellence Hub</p>
          <p className="text-white/70 text-sm md:text-base">A globally distributed delivery hub with expert remote teams operating round-the-clock for efficiency and scale.  </p>
          <ul className="mt-5 mb-5" style={{paddingTop:"20px" , paddingBottom:"20px" ,marginBottom:"20px"}}>
            {[
              "Dedicated Remote Teams",
              "Production Outsourcing",
              "24/7 Support & SLA Monitoring",
              "Scalable Resourcing Models",
              "PM & Quality Assurance",
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
