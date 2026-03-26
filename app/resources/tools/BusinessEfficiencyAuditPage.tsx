import { useState } from 'react';
import {
  ClipboardCheck, Lock, Users, DollarSign, Wrench, AlertTriangle,
  CheckCircle2, ArrowRight, ChevronRight, Zap, Clock, TrendingUp,
  BarChart3, Settings, Target, RefreshCw
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
        <h3 className="font-bold mb-2 text-white">Unlock Your Efficiency Audit</h3>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">Enter your details to get a personalized business efficiency audit with actionable recommendations.</p>
        <div className="flex flex-col gap-3 text-left">
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <input type="email" placeholder="Work email *" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <button onClick={() => email.includes('@') && onSubmit(email)}
            className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors mt-1 text-sm tracking-wide">
            Start My Audit →
          </button>
          <p className="text-xs text-white/25 text-center">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}

interface AuditCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  score: number;
  maxScore: number;
  issues: string[];
  fixes: string[];
}

export function BusinessEfficiencyAuditPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [result, setResult] = useState<AuditCategory[] | null>(null);

  const [teamSize, setTeamSize] = useState('2-10');
  const [revenue, setRevenue] = useState('100k-500k');
  const [tools, setTools] = useState('');
  const [challenges, setChallenges] = useState('');
  const [automationLevel, setAutomationLevel] = useState('low');
  const [meetingsPerWeek, setMeetingsPerWeek] = useState('5');
  const [manualProcesses, setManualProcesses] = useState('5');

  const runAudit = () => {
    const meetings = parseInt(meetingsPerWeek) || 5;
    const manual = parseInt(manualProcesses) || 5;
    const teamMultiplier = teamSize === '50+' ? 4 : teamSize === '11-50' ? 3 : teamSize === '2-10' ? 2 : 1;
    const autoScore = automationLevel === 'high' ? 85 : automationLevel === 'medium' ? 60 : 30;

    const categories: AuditCategory[] = [
      {
        name: 'Process Automation',
        icon: <Settings className="w-4 h-4" />,
        color: '#60a5fa',
        score: autoScore,
        maxScore: 100,
        issues: [
          `${manual} manual processes identified — costing ~${manual * teamMultiplier * 3} hrs/week`,
          automationLevel === 'low' ? 'No automation infrastructure in place' : 'Automation coverage is incomplete',
          'Data entry and reporting are still largely manual',
        ],
        fixes: [
          'Implement workflow automation (Zapier, Make, or n8n)',
          'Automate data entry with AI extraction tools',
          'Set up automated reporting dashboards',
        ],
      },
      {
        name: 'Communication & Meetings',
        icon: <Users className="w-4 h-4" />,
        color: '#a78bfa',
        score: Math.max(20, 100 - meetings * 8),
        maxScore: 100,
        issues: [
          `${meetings} meetings/week — ${meetings > 8 ? 'significantly' : 'somewhat'} above optimal`,
          `Estimated ${meetings * teamMultiplier * 0.75} total team-hours/week in meetings`,
          meetings > 6 ? 'High meeting load suggests unclear async communication' : 'Meeting load is manageable but could be optimized',
        ],
        fixes: [
          'Adopt async-first communication (Loom, Slack threads)',
          `Reduce meetings by ${Math.max(1, Math.floor(meetings * 0.3))} per week with written updates`,
          'Implement "no-meeting" blocks for deep work',
        ],
      },
      {
        name: 'Tool Stack Efficiency',
        icon: <Wrench className="w-4 h-4" />,
        color: '#34d399',
        score: tools.split(',').filter(Boolean).length > 5 ? 45 : tools.split(',').filter(Boolean).length > 3 ? 65 : 80,
        maxScore: 100,
        issues: [
          tools ? `Using ${tools.split(',').filter(Boolean).length} tools — potential for consolidation` : 'Tool stack not specified — likely fragmented',
          'Data silos between disconnected tools',
          'Context switching between platforms reduces productivity by ~40%',
        ],
        fixes: [
          'Consolidate to 2-3 core platforms with integrations',
          'Ensure all tools sync data automatically',
          'Create a single source of truth for key metrics',
        ],
      },
      {
        name: 'Revenue Operations',
        icon: <DollarSign className="w-4 h-4" />,
        color: '#fbbf24',
        score: revenue === '1m+' ? 70 : revenue === '500k-1m' ? 60 : 50,
        maxScore: 100,
        issues: [
          'Lead follow-up likely takes >24 hours (industry average)',
          'Sales pipeline visibility may be limited',
          'Client onboarding process is not fully automated',
        ],
        fixes: [
          'Automate lead follow-up within 5 minutes of inquiry',
          'Implement CRM pipeline with stage-based automation',
          'Build automated onboarding sequence (email + tasks)',
        ],
      },
      {
        name: 'Growth Readiness',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#39FF14',
        score: Math.round((autoScore * 0.3) + (Math.max(20, 100 - meetings * 8) * 0.2) + ((revenue === '1m+' ? 70 : 50) * 0.5)),
        maxScore: 100,
        issues: [
          challenges || 'Key operational challenges need to be addressed before scaling',
          'Current processes may not scale with 2x team growth',
          'Knowledge is likely concentrated in key individuals',
        ],
        fixes: [
          'Document all core processes into SOPs',
          'Build systems that work without key-person dependency',
          'Create scalable templates for repeatable tasks',
        ],
      },
    ];

    setResult(categories);
  };

  const overallScore = result
    ? Math.round(result.reduce((sum, c) => sum + c.score, 0) / result.length)
    : 0;

  const getGrade = (score: number) => {
    if (score >= 80) return { label: 'A', color: '#39FF14', desc: 'Excellent — minor optimizations needed' };
    if (score >= 65) return { label: 'B', color: '#34d399', desc: 'Good — several improvement opportunities' };
    if (score >= 50) return { label: 'C', color: '#fbbf24', desc: 'Average — significant improvements possible' };
    if (score >= 35) return { label: 'D', color: '#f97316', desc: 'Below Average — urgent action recommended' };
    return { label: 'F', color: '#ef4444', desc: 'Critical — immediate intervention needed' };
  };

  const teamHoursSaved = result
    ? Math.round(result.reduce((sum, c) => sum + (100 - c.score) * 0.4, 0) * (teamSize === '50+' ? 4 : teamSize === '11-50' ? 3 : 2))
    : 0;

  const annualSavings = teamHoursSaved * 52 * 50;

  return (
    <ToolPageLayout toolId="ai-business-efficiency-audit">
      {!unlocked ? (
            <EmailGate onSubmit={(email) => { setUnlocked(true); console.log('Lead:', email); }} />
          ) : (
            <div className="space-y-6">
              {/* Input Form */}
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
                <h2 className="font-bold text-white mb-5 text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4 text-white/30" />
                  Tell Us About Your Business
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Team Size *</label>
                    <select value={teamSize} onChange={e => setTeamSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                      style={{ colorScheme: 'dark' }}>
                      <option value="1">Solo / 1 person</option>
                      <option value="2-10">2-10 people</option>
                      <option value="11-50">11-50 people</option>
                      <option value="50+">50+ people</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Annual Revenue *</label>
                    <select value={revenue} onChange={e => setRevenue(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                      style={{ colorScheme: 'dark' }}>
                      <option value="under-100k">Under $100K</option>
                      <option value="100k-500k">$100K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m+">$1M+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Automation Level *</label>
                    <select value={automationLevel} onChange={e => setAutomationLevel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                      style={{ colorScheme: 'dark' }}>
                      <option value="low">Low (mostly manual)</option>
                      <option value="medium">Medium (some automation)</option>
                      <option value="high">High (well automated)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Meetings Per Week</label>
                    <input type="number" value={meetingsPerWeek} onChange={e => setMeetingsPerWeek(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                      placeholder="e.g. 8" style={{ colorScheme: 'dark' }} />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Manual Processes Count</label>
                    <input type="number" value={manualProcesses} onChange={e => setManualProcesses(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                      placeholder="e.g. 5" style={{ colorScheme: 'dark' }} />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Current Tools (comma-separated)</label>
                    <input type="text" value={tools} onChange={e => setTools(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                      placeholder="e.g. Slack, Trello, HubSpot" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Biggest Challenges</label>
                    <textarea value={challenges} onChange={e => setChallenges(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30 resize-none"
                      rows={3} placeholder="e.g. slow client onboarding, too many manual follow-ups, inconsistent reporting" />
                  </div>
                </div>
                <button onClick={runAudit}
                  className="w-full mt-5 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide">
                  <ClipboardCheck className="w-4 h-4" /> Run Efficiency Audit
                </button>
              </div>

              {/* Results */}
              {result && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 flex items-center justify-center"
                          style={{ borderColor: getGrade(overallScore).color + '40' }}>
                          <div className="text-center">
                            <span className="text-4xl font-black" style={{ color: getGrade(overallScore).color }}>{overallScore}</span>
                            <span className="text-white/30 text-sm">/100</span>
                          </div>
                        </div>
                        <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-lg"
                          style={{ backgroundColor: getGrade(overallScore).color }}>
                          {getGrade(overallScore).label}
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-black text-white">Overall Efficiency Score</h2>
                        <p className="text-sm mt-1" style={{ color: getGrade(overallScore).color }}>{getGrade(overallScore).desc}</p>
                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2">
                            <p className="text-xs text-blue-400">Hours Recoverable/Week</p>
                            <p className="text-lg font-black text-white">{teamHoursSaved}</p>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                            <p className="text-xs text-green-400">Annual Savings Potential</p>
                            <p className="text-lg font-black text-white">${annualSavings.toLocaleString()}</p>
                          </div>
                          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-4 py-2">
                            <p className="text-xs text-purple-400">Areas to Improve</p>
                            <p className="text-lg font-black text-white">{result.filter(c => c.score < 65).length} of {result.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {result.map((cat, i) => (
                      <div key={i} className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: cat.color + '15', color: cat.color }}>
                              {cat.icon}
                            </div>
                            <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                          </div>
                          <span className="text-sm font-black" style={{ color: cat.score >= 65 ? '#39FF14' : cat.score >= 45 ? '#fbbf24' : '#ef4444' }}>
                            {cat.score}/100
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${cat.score}%`, backgroundColor: cat.color }} />
                        </div>
                        {/* Issues */}
                        <div className="mb-3">
                          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Issues Found</p>
                          {cat.issues.map((issue, j) => (
                            <div key={j} className="flex items-start gap-2 mb-1.5">
                              <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                              <span className="text-xs text-white/50 leading-relaxed">{issue}</span>
                            </div>
                          ))}
                        </div>
                        {/* Fixes */}
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Recommended Fixes</p>
                          {cat.fixes.map((fix, j) => (
                            <div key={j} className="flex items-start gap-2 mb-1.5">
                              <CheckCircle2 className="w-3 h-3 text-[#39FF14] shrink-0 mt-0.5" />
                              <span className="text-xs text-white/60 leading-relaxed">{fix}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Wins */}
                  <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
                    <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#39FF14]" /> Top 5 Quick Wins (Next 30 Days)
                    </h3>
                    <div className="grid md:grid-cols-5 gap-3">
                      {[
                        { num: 1, text: 'Automate your most repetitive task', icon: <RefreshCw className="w-4 h-4" /> },
                        { num: 2, text: 'Create SOPs for top 3 processes', icon: <ClipboardCheck className="w-4 h-4" /> },
                        { num: 3, text: 'Eliminate 2+ recurring meetings', icon: <Clock className="w-4 h-4" /> },
                        { num: 4, text: 'Set up automated follow-ups', icon: <Target className="w-4 h-4" /> },
                        { num: 5, text: 'Consolidate your tool stack', icon: <Wrench className="w-4 h-4" /> },
                      ].map(item => (
                        <div key={item.num} className="bg-black border border-white/10 rounded-xl p-4 text-center">
                          <div className="w-8 h-8 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mx-auto mb-2 text-[#39FF14]">
                            {item.icon}
                          </div>
                          <p className="text-xs text-white/60 leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-black border border-[#39FF14]/20 rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-[#39FF14] opacity-[0.06] blur-[60px] rounded-full" />
                    <div className="relative">
                      <BarChart3 className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
                      <h3 className="text-xl font-black text-white mb-2">Want a Human-Reviewed Deep Audit?</h3>
                      <p className="text-white/40 text-sm mb-5 max-w-md mx-auto">Our team at MarQ Networks will review your operations in detail and build a custom efficiency roadmap.</p>
                      <a href="https://marqnetworks.com" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-3 px-8 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold text-sm transition-colors">
                        Book Free Strategy Call <ArrowRight className="w-4 h-4" />
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
