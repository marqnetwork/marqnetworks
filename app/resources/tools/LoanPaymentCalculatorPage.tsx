import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function LoanPaymentCalculatorPage() {
  const [principal, setPrincipal] = useState('250000'); const [rate, setRate] = useState('6.5'); const [years, setYears] = useState('30');
  const p = parseFloat(principal) || 0; const r = (parseFloat(rate) || 0) / 100 / 12; const n = (parseFloat(years) || 1) * 12;
  const monthly = r > 0 ? p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
  const totalPaid = monthly * n; const totalInterest = totalPaid - p;
  return (
    <ToolPageLayout toolId="loan-payment-calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Loan Amount ($)</label><input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Annual Interest Rate (%)</label><input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Loan Term (Years)</label><input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-3">
          <div className="bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl p-5 text-center"><p className="text-xs text-[#39FF14] uppercase tracking-wider">Monthly Payment</p><p className="text-3xl font-black text-[#39FF14] mt-1">${monthly.toFixed(2)}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Principal</p><p className="text-lg font-bold text-white">${p.toLocaleString()}</p></div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Total Interest</p><p className="text-lg font-bold text-amber-400">${Math.round(totalInterest).toLocaleString()}</p></div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Total Paid</p><p className="text-lg font-bold text-white">${Math.round(totalPaid).toLocaleString()}</p></div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Payments</p><p className="text-lg font-bold text-white">{n}</p></div>
          </div>
          {/* Simple bar showing principal vs interest */}
          <div className="bg-white/3 border border-white/5 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-2">Principal vs Interest</p>
            <div className="h-6 rounded-full overflow-hidden flex">
              <div className="bg-[#39FF14] h-full" style={{ width: `${(p / totalPaid) * 100}%` }} />
              <div className="bg-amber-400 h-full" style={{ width: `${(totalInterest / totalPaid) * 100}%` }} />
            </div>
            <div className="flex justify-between mt-1 text-xs"><span className="text-[#39FF14]">Principal {((p / totalPaid) * 100).toFixed(0)}%</span><span className="text-amber-400">Interest {((totalInterest / totalPaid) * 100).toFixed(0)}%</span></div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
