import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState('10000'); const [rate, setRate] = useState('7'); const [years, setYears] = useState('10'); const [monthly, setMonthly] = useState('200'); const [compound, setCompound] = useState('12');
  const p = parseFloat(principal) || 0; const r = (parseFloat(rate) || 0) / 100; const t = parseFloat(years) || 1; const m = parseFloat(monthly) || 0; const n = parseFloat(compound) || 12;
  const futureVal = p * Math.pow(1 + r / n, n * t) + m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
  const totalContributed = p + m * 12 * t; const totalInterest = futureVal - totalContributed;
  const yearlyData = Array.from({ length: Math.min(t, 50) }, (_, i) => {
    const yr = i + 1; const fv = p * Math.pow(1 + r / n, n * yr) + m * ((Math.pow(1 + r / n, n * yr) - 1) / (r / n));
    return { year: yr, value: fv };
  });
  return (
    <ToolPageLayout toolId="compound-interest-calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Initial Investment ($)</label><input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Annual Interest Rate (%)</label><input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Monthly Contribution ($)</label><input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Time Period (Years)</label><input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Compound Frequency</label><select value={compound} onChange={e => setCompound(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}><option value="1">Annually</option><option value="4">Quarterly</option><option value="12">Monthly</option><option value="365">Daily</option></select></div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-3">
          <div className="bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl p-5 text-center"><p className="text-xs text-[#39FF14] uppercase tracking-wider">Future Value</p><p className="text-3xl font-black text-[#39FF14] mt-1">${Math.round(futureVal).toLocaleString()}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Total Contributed</p><p className="text-lg font-bold text-white">${Math.round(totalContributed).toLocaleString()}</p></div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Interest Earned</p><p className="text-lg font-bold text-[#39FF14]">${Math.round(totalInterest).toLocaleString()}</p></div>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-xl p-4 max-h-[200px] overflow-y-auto">
            <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Growth Timeline</p>
            {yearlyData.map(d => (
              <div key={d.year} className="flex items-center gap-3 py-1 border-b border-white/5 last:border-0">
                <span className="text-xs text-white/30 w-12">Year {d.year}</span>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[#39FF14] rounded-full" style={{ width: `${(d.value / futureVal) * 100}%` }} /></div>
                <span className="text-xs text-white/60 font-mono w-24 text-right">${Math.round(d.value).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
