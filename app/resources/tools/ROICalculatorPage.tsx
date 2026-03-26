import { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, Users, Zap, ArrowRight, Lock } from 'lucide-react';
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
        <h3 className="font-bold mb-2 text-white">Unlock Your ROI Report</h3>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">Enter your details to access the full AI Automation ROI Calculator and get your personalized report.</p>
        <div className="flex flex-col gap-3 text-left">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
          />
          <input
            type="email"
            placeholder="Work email *"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
          />
          <button
            onClick={() => email.includes('@') && onSubmit(email)}
            className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors mt-1 text-sm tracking-wide"
          >
            Calculate My ROI →
          </button>
          <p className="text-xs text-white/25 text-center">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}

interface ROIResult {
  annualTimeSaved: number;
  annualMoneySaved: number;
  roiPercent: number;
  paybackMonths: number;
  fiveYearValue: number;
}

export function ROICalculatorPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [result, setResult] = useState<ROIResult | null>(null);

  const [employees, setEmployees] = useState('5');
  const [hourlyRate, setHourlyRate] = useState('50');
  const [hoursPerWeek, setHoursPerWeek] = useState('10');
  const [automationCost, setAutomationCost] = useState('500');
  const [errorReduction, setErrorReduction] = useState('40');
  const [processesCount, setProcessesCount] = useState('3');

  const calculate = () => {
    const emp = parseFloat(employees) || 0;
    const rate = parseFloat(hourlyRate) || 0;
    const hrs = parseFloat(hoursPerWeek) || 0;
    const cost = parseFloat(automationCost) || 0;
    const errRed = parseFloat(errorReduction) / 100 || 0;
    const procs = parseFloat(processesCount) || 1;

    const weeklyTimeSaved = emp * hrs * procs * 0.7;
    const annualTimeSaved = weeklyTimeSaved * 52;
    const annualMoneySaved = annualTimeSaved * rate + (annualTimeSaved * rate * errRed * 0.3);
    const annualCost = cost * 12;
    const netAnnual = annualMoneySaved - annualCost;
    const roiPercent = annualCost > 0 ? ((netAnnual / annualCost) * 100) : 0;
    const paybackMonths = annualMoneySaved > 0 ? Math.ceil((cost * 12) / (annualMoneySaved / 12)) : 0;
    const fiveYearValue = netAnnual * 5;

    setResult({ annualTimeSaved, annualMoneySaved, roiPercent, paybackMonths, fiveYearValue });
  };

  return (
    <ToolPageLayout toolId="ai-automation-roi-calculator">
      {!unlocked ? (
          <EmailGate onSubmit={(email) => { setUnlocked(true); }} />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <h2 className="font-bold text-white mb-5 text-sm">Your Business Details</h2>
              <div className="flex flex-col gap-5">
                <Slider label="Number of Employees Affected" value={employees} onChange={setEmployees} min="1" max="500" unit="people" icon={<Users className="w-4 h-4 text-blue-400" />} />
                <Slider label="Average Hourly Rate / Cost" value={hourlyRate} onChange={setHourlyRate} min="10" max="500" unit="$/hr" icon={<DollarSign className="w-4 h-4 text-[#39FF14]" />} />
                <Slider label="Manual Hours Wasted Per Week (per employee)" value={hoursPerWeek} onChange={setHoursPerWeek} min="1" max="40" unit="hrs/wk" icon={<Clock className="w-4 h-4 text-purple-400" />} />
                <Slider label="Number of Processes to Automate" value={processesCount} onChange={setProcessesCount} min="1" max="20" unit="processes" icon={<Zap className="w-4 h-4 text-[#39FF14]" />} />
                <Slider label="Expected Error Reduction" value={errorReduction} onChange={setErrorReduction} min="0" max="100" unit="%" icon={<TrendingUp className="w-4 h-4 text-cyan-400" />} />
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Monthly Automation Cost ($)</label>
                  <input
                    type="number"
                    value={automationCost}
                    onChange={e => setAutomationCost(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white text-sm placeholder-white/30"
                    placeholder="e.g. 500"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                <button
                  onClick={calculate}
                  className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate My ROI
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <h2 className="font-bold text-white mb-5 text-sm">Your ROI Report</h2>
              {result ? (
                <div className="flex flex-col gap-3">
                  <ResultCard
                    label="Annual Time Saved"
                    value={`${Math.round(result.annualTimeSaved).toLocaleString()} hours`}
                    sub={`${Math.round(result.annualTimeSaved / 52)} hrs/week saved`}
                    color="blue"
                    icon={<Clock className="w-4 h-4" />}
                  />
                  <ResultCard
                    label="Annual Money Saved"
                    value={`$${Math.round(result.annualMoneySaved).toLocaleString()}`}
                    sub="Including productivity + error reduction savings"
                    color="green"
                    icon={<DollarSign className="w-4 h-4" />}
                  />
                  <ResultCard
                    label="Return on Investment"
                    value={`${Math.round(result.roiPercent)}% ROI`}
                    sub={result.roiPercent > 200 ? '🔥 Exceptional return!' : result.roiPercent > 100 ? '✅ Strong return' : '⚠️ Consider optimizing cost'}
                    color={result.roiPercent > 200 ? 'lime' : result.roiPercent > 100 ? 'green' : 'yellow'}
                    icon={<TrendingUp className="w-4 h-4" />}
                  />
                  <ResultCard
                    label="Payback Period"
                    value={`${result.paybackMonths} months`}
                    sub="Time to recoup your investment"
                    color="purple"
                    icon={<Calculator className="w-4 h-4" />}
                  />
                  <div className="bg-black border border-[#39FF14]/20 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
                    <p className="text-xs text-white/40 uppercase tracking-wider">5-Year Value Created</p>
                    <p className="text-3xl font-black text-[#39FF14] mt-1">${Math.round(result.fiveYearValue).toLocaleString()}</p>
                    <p className="text-xs text-white/30 mt-1">Net savings over 5 years from automation</p>
                  </div>
                  <a
                    href="https://marqnetworks.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 border border-[#39FF14]/30 text-[#39FF14] rounded-xl font-semibold hover:bg-[#39FF14]/10 transition-colors text-sm"
                  >
                    Book Free Automation Strategy Call <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                  <div className="w-12 h-12 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-[#39FF14] opacity-40" />
                  </div>
                  <p className="text-white/30 text-xs">Adjust the sliders and click Calculate to see your ROI</p>
                </div>
              )}
            </div>
          </div>
        )}
    </ToolPageLayout>
  );
}

function Slider({ label, value, onChange, min, max, unit, icon }: {
  label: string; value: string; onChange: (v: string) => void;
  min: string; max: string; unit: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs text-white/50 flex items-center gap-1.5 uppercase tracking-wider">{icon}{label}</label>
        <span className="text-xs font-bold text-[#39FF14]">{Number(value).toLocaleString()} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full accent-[#39FF14]"
      />
      <div className="flex justify-between text-xs text-white/25 mt-0.5">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub, color, icon }: {
  label: string; value: string; sub: string; color: string; icon: React.ReactNode;
}) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue:   { bg: 'rgba(96,165,250,0.08)',  text: '#60a5fa', border: 'rgba(96,165,250,0.2)' },
    green:  { bg: 'rgba(52,211,153,0.08)',  text: '#34d399', border: 'rgba(52,211,153,0.2)' },
    lime:   { bg: 'rgba(57,255,20,0.08)',   text: '#39FF14', border: 'rgba(57,255,20,0.2)' },
    purple: { bg: 'rgba(167,139,250,0.08)', text: '#a78bfa', border: 'rgba(167,139,250,0.2)' },
    yellow: { bg: 'rgba(251,191,36,0.08)',  text: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
      <div className="flex items-center gap-2 mb-1" style={{ color: c.text }}>
        {icon}
        <span className="text-xs opacity-80">{label}</span>
      </div>
      <p className="font-black text-xl text-white">{value}</p>
      <p className="text-xs text-white/30 mt-0.5">{sub}</p>
    </div>
  );
}
