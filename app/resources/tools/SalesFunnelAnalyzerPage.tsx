import { useState } from 'react';
import {
  Filter, Lock, ArrowRight, ChevronRight, ChevronDown, Zap, TrendingUp,
  AlertTriangle, CheckCircle2, DollarSign, Users, Target, BarChart3,
  ArrowDown, Clock, Mail, Phone
} from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

function EmailGate({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-white text-center max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] bg-[#39FF14] opacity-[0.06] blur-[60px] rounded-full" />
      <div className="relative">
        <div className="w-14 h-14 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-[#39FF14]" />
        </div>
        <h3 className="font-bold mb-2 text-white">Unlock Your Funnel Analysis</h3>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">Enter your details to get a detailed sales funnel analysis with leak detection and revenue projections.</p>
        <div className="flex flex-col gap-3 text-left">
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <input type="email" placeholder="Work email *" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <button onClick={() => email.includes('@') && onSubmit(email)}
            className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors mt-1 text-sm tracking-wide">
            Analyze My Funnel →
          </button>
          <p className="text-xs text-white/25 text-center">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}

interface FunnelStage {
  name: string;
  icon: React.ReactNode;
  color: string;
  entryCount: number;
  dropRate: number;
  idealDropRate: number;
  issues: string[];
  fixes: string[];
}

export function SalesFunnelAnalyzerPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [result, setResult] = useState<FunnelStage[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [industry, setIndustry] = useState('');
  const [avgDeal, setAvgDeal] = useState('2500');
  const [leadsPerMonth, setLeadsPerMonth] = useState('100');
  const [closeRate, setCloseRate] = useState('15');
  const [biggestLeak, setBiggestLeak] = useState('engagement');
  const [followUpTime, setFollowUpTime] = useState('24');
  const [touchPoints, setTouchPoints] = useState('3');

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const leads = parseInt(leadsPerMonth) || 100;
      const close = parseFloat(closeRate) / 100 || 0.15;
      const touches = parseInt(touchPoints) || 3;
      const followUp = parseInt(followUpTime) || 24;

      const engagedRate = biggestLeak === 'awareness' ? 0.45 : 0.60;
      const qualifiedRate = biggestLeak === 'engagement' ? 0.25 : 0.35;
      const proposalRate = biggestLeak === 'proposal' ? 0.15 : 0.25;

      const stages: FunnelStage[] = [
        {
          name: 'Awareness / Lead Capture',
          icon: <Users className="w-4 h-4" />,
          color: '#60a5fa',
          entryCount: leads,
          dropRate: Math.round((1 - engagedRate) * 100),
          idealDropRate: 30,
          issues: [
            `${leads} leads/month — ${leads < 50 ? 'below average for most industries' : 'reasonable volume'}`,
            followUp > 12 ? `Follow-up time of ${followUp}h is too slow (best: <5 min)` : 'Follow-up time is competitive',
            touches < 5 ? `Only ${touches} touch points — top performers use 7-12` : 'Touch point count is strong',
          ],
          fixes: [
            'Implement content marketing + SEO for inbound leads',
            'Launch referral program (10-20% commission)',
            `${followUp > 5 ? 'Automate lead response to under 5 minutes' : 'Maintain fast response time'}`,
          ],
        },
        {
          name: 'Engagement / Nurture',
          icon: <Mail className="w-4 h-4" />,
          color: '#a78bfa',
          entryCount: Math.round(leads * engagedRate),
          dropRate: Math.round((1 - qualifiedRate / engagedRate) * 100),
          idealDropRate: 35,
          issues: [
            `${Math.round(leads * engagedRate)} leads engage — ${Math.round(leads * (1 - engagedRate))} go cold`,
            'Nurture sequence likely too short or not personalized',
            biggestLeak === 'engagement' ? 'This is your biggest leak — leads lose interest before qualifying' : 'Engagement could still be improved',
          ],
          fixes: [
            'Build a 7-email value-first nurture sequence',
            'Segment leads by pain point for personalized follow-up',
            'Add case studies and social proof to nurture emails',
          ],
        },
        {
          name: 'Qualification / Proposal',
          icon: <Target className="w-4 h-4" />,
          color: '#fbbf24',
          entryCount: Math.round(leads * qualifiedRate),
          dropRate: Math.round((1 - proposalRate / qualifiedRate) * 100),
          idealDropRate: 25,
          issues: [
            `${Math.round(leads * qualifiedRate)} reach proposal stage`,
            biggestLeak === 'proposal' ? 'Proposals lack urgency and ROI projections' : 'Proposal stage is functional but can improve',
            'Qualification criteria may be too loose — unqualified leads waste time',
          ],
          fixes: [
            'Include client-specific ROI projections in proposals',
            'Add urgency with limited availability or pricing deadlines',
            'Implement BANT/MEDDIC qualification framework',
          ],
        },
        {
          name: 'Closing / Decision',
          icon: <DollarSign className="w-4 h-4" />,
          color: '#34d399',
          entryCount: Math.round(leads * proposalRate),
          dropRate: Math.round((1 - close / proposalRate) * 100),
          idealDropRate: 30,
          issues: [
            `${Math.round(leads * close)} deals closed at ${closeRate}% close rate`,
            biggestLeak === 'closing' ? 'Closing is your biggest challenge — objection handling needs work' : 'Close rate has room for improvement',
            'Follow-up after proposal may be delayed or inconsistent',
          ],
          fixes: [
            'Follow up within 2 hours of sending proposals',
            'Offer a "pilot project" to lower perceived risk',
            'Add payment plans to reduce friction at close',
          ],
        },
        {
          name: 'Retention / Expansion',
          icon: <TrendingUp className="w-4 h-4" />,
          color: '#39FF14',
          entryCount: Math.round(leads * close),
          dropRate: 30,
          idealDropRate: 15,
          issues: [
            `Estimated ${Math.round(leads * close * 0.7)} clients renew/expand`,
            biggestLeak === 'retention' ? 'Client retention is your #1 problem — churn is eating revenue' : 'Retention likely has room for proactive improvement',
            'No structured upsell or expansion motion detected',
          ],
          fixes: [
            'Implement 30/60/90-day success check-ins',
            'Create quarterly business reviews (QBRs)',
            'Build upsell triggers based on usage/value metrics',
          ],
        },
      ];

      setResult(stages);
      setAnalyzing(false);
    }, 2000);
  };

  const deal = parseFloat(avgDeal) || 2500;
  const leads = parseInt(leadsPerMonth) || 100;
  const close = parseFloat(closeRate) / 100 || 0.15;
  const currentRevenue = Math.round(leads * close * deal);
  const improvedClose = Math.min(close + 0.1, 0.5);
  const improvedRevenue = Math.round(leads * improvedClose * deal);
  const revenueGap = improvedRevenue - currentRevenue;

  return (
    <ToolPageLayout toolId="ai-sales-funnel-analyzer">
      {!unlocked ? (
        <EmailGate onSubmit={(email) => { setUnlocked(true); console.log('Lead:', email); }} />
      ) : (
        <div className="space-y-6">
          {/* Input Form */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <h2 className="font-bold text-white mb-5 text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/30" />
              Your Sales Funnel Details
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Industry *</label>
                <input type="text" value={industry} onChange={e => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. B2B SaaS, coaching, e-commerce" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Average Deal Value *</label>
                <input type="text" value={avgDeal} onChange={e => setAvgDeal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 2500" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Monthly Leads *</label>
                <input type="text" value={leadsPerMonth} onChange={e => setLeadsPerMonth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 100" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Close Rate (%)</label>
                <input type="text" value={closeRate} onChange={e => setCloseRate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 15" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Avg Follow-Up Time (hours)</label>
                <input type="number" value={followUpTime} onChange={e => setFollowUpTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 24" style={{ colorScheme: 'dark' }} />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Touch Points Before Sale</label>
                <input type="number" value={touchPoints} onChange={e => setTouchPoints(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 5" style={{ colorScheme: 'dark' }} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Where Do You Lose Most Prospects? *</label>
                <select value={biggestLeak} onChange={e => setBiggestLeak(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                  style={{ colorScheme: 'dark' }}>
                  <option value="awareness">Not enough awareness / leads</option>
                  <option value="engagement">Leads don't engage / go cold</option>
                  <option value="proposal">Lose them at proposal stage</option>
                  <option value="closing">Can't close the deal</option>
                  <option value="retention">Clients don't stay / renew</option>
                </select>
              </div>
            </div>
            <button onClick={analyze} disabled={analyzing || !industry}
              className="w-full mt-5 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-50">
              {analyzing ? (
                <><div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" /> Analyzing Funnel...</>
              ) : (
                <><Filter className="w-4 h-4" /> Analyze My Funnel</>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Revenue Overview */}
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Current Monthly Revenue</p>
                  <p className="text-3xl font-black text-white">${currentRevenue.toLocaleString()}</p>
                  <p className="text-xs text-white/30 mt-1">{Math.round(leads * close)} deals at ${deal.toLocaleString()} avg</p>
                </div>
                <div className="bg-[#111111] border border-[#39FF14]/20 rounded-xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
                  <p className="text-xs text-[#39FF14] uppercase tracking-wider mb-1">Potential Revenue</p>
                  <p className="text-3xl font-black text-[#39FF14]">${improvedRevenue.toLocaleString()}</p>
                  <p className="text-xs text-white/30 mt-1">with funnel fixes applied</p>
                </div>
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">Revenue Left on Table</p>
                  <p className="text-3xl font-black text-amber-400">+${revenueGap.toLocaleString()}</p>
                  <p className="text-xs text-white/30 mt-1">${(revenueGap * 12).toLocaleString()}/year opportunity</p>
                </div>
              </div>

              {/* Visual Funnel */}
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
                <h2 className="font-bold text-white mb-6 text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-white/30" />
                  Funnel Visualization
                </h2>
                <div className="max-w-xl mx-auto space-y-0">
                  {result.map((stage, i) => {
                    const widthPercent = Math.max(20, (stage.entryCount / (result[0]?.entryCount || 1)) * 100);
                    const isLeak = stage.dropRate > stage.idealDropRate + 10;
                    return (
                      <div key={i}>
                        <div className="relative">
                          <div
                            className="mx-auto py-3 px-4 rounded-lg text-center transition-all relative overflow-hidden"
                            style={{
                              width: `${widthPercent}%`,
                              backgroundColor: stage.color + '15',
                              border: `1px solid ${isLeak ? '#ef444440' : stage.color + '30'}`,
                            }}
                          >
                            {isLeak && (
                              <div className="absolute top-0 left-0 right-0 h-px bg-red-500/50" />
                            )}
                            <div className="flex items-center justify-center gap-2 mb-1" style={{ color: stage.color }}>
                              {stage.icon}
                              <span className="text-xs font-bold">{stage.name}</span>
                            </div>
                            <p className="text-lg font-black text-white">{stage.entryCount.toLocaleString()}</p>
                            {isLeak && (
                              <span className="inline-flex items-center gap-1 text-xs text-red-400 mt-1">
                                <AlertTriangle className="w-2.5 h-2.5" /> Leak detected
                              </span>
                            )}
                          </div>
                        </div>
                        {i < result.length - 1 && (
                          <div className="flex items-center justify-center py-1">
                            <div className="flex items-center gap-2 text-xs text-white/30">
                              <ArrowDown className="w-3 h-3" />
                              <span className={stage.dropRate > stage.idealDropRate + 10 ? 'text-red-400' : 'text-white/30'}>
                                {stage.dropRate}% drop
                              </span>
                              <span className="text-white/15">|</span>
                              <span className="text-white/20">ideal: {stage.idealDropRate}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stage Details */}
              <div className="space-y-3">
                <h2 className="font-bold text-white text-sm">Stage-by-Stage Analysis</h2>
                {result.map((stage, i) => {
                  const isLeak = stage.dropRate > stage.idealDropRate + 10;
                  return (
                    <div key={i} className={`bg-[#111111] rounded-xl border p-5 ${isLeak ? 'border-red-500/20' : 'border-white/8'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: stage.color + '15', color: stage.color }}>
                            {stage.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm">{stage.name}</h3>
                            <p className="text-xs text-white/30">{stage.entryCount.toLocaleString()} prospects enter this stage</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${isLeak ? 'text-red-400' : 'text-[#39FF14]'}`}>
                            {stage.dropRate}% drop
                          </p>
                          <p className="text-xs text-white/25">ideal: {stage.idealDropRate}%</p>
                        </div>
                      </div>
                      {/* Drop rate bar */}
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4 relative">
                        <div className="h-full rounded-full absolute left-0" style={{ width: `${stage.idealDropRate}%`, backgroundColor: '#39FF14', opacity: 0.3 }} />
                        <div className="h-full rounded-full absolute left-0" style={{ width: `${stage.dropRate}%`, backgroundColor: isLeak ? '#ef4444' : stage.color }} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Issues</p>
                          {stage.issues.map((issue, j) => (
                            <div key={j} className="flex items-start gap-2 mb-1.5">
                              <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                              <span className="text-xs text-white/50 leading-relaxed">{issue}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Fixes</p>
                          {stage.fixes.map((fix, j) => (
                            <div key={j} className="flex items-start gap-2 mb-1.5">
                              <CheckCircle2 className="w-3 h-3 text-[#39FF14] shrink-0 mt-0.5" />
                              <span className="text-xs text-white/60 leading-relaxed">{fix}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="bg-black border border-[#39FF14]/20 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-[#39FF14] opacity-[0.06] blur-[60px] rounded-full" />
                <div className="relative">
                  <Filter className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
                  <h3 className="text-xl font-black text-white mb-2">Want a Custom Funnel Strategy?</h3>
                  <p className="text-white/40 text-sm mb-5 max-w-md mx-auto">Our team will map your entire funnel, identify every leak, and build a fix-it roadmap specific to your business.</p>
                  <a href="https://marqnetworks.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-8 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold text-sm transition-colors">
                    Book Free Funnel Review <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolPageLayout>
  );
}
