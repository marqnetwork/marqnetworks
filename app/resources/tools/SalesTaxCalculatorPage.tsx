import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function SalesTaxCalculatorPage() {
  const [amount, setAmount] = useState('100'); const [rate, setRate] = useState('8.25');
  const a = parseFloat(amount) || 0; const r = parseFloat(rate) || 0;
  const tax = a * (r / 100); const total = a + tax;
  return (
    <ToolPageLayout toolId="sales-tax-calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Amount Before Tax</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" placeholder="100" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Tax Rate (%)</label><input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.01" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" placeholder="8.25" style={{ colorScheme: 'dark' }} /></div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-3">
          <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Pre-Tax Amount</p><p className="text-xl font-black text-white">${a.toFixed(2)}</p></div>
          <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Tax Amount ({r}%)</p><p className="text-xl font-black text-amber-400">${tax.toFixed(2)}</p></div>
          <div className="bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl p-4"><p className="text-xs text-[#39FF14]">Total (incl. tax)</p><p className="text-2xl font-black text-[#39FF14]">${total.toFixed(2)}</p></div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
