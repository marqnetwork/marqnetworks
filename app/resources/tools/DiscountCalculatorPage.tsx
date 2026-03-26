import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function DiscountCalculatorPage() {
  const [price, setPrice] = useState('100'); const [discount, setDiscount] = useState('20');
  const p = parseFloat(price) || 0; const d = parseFloat(discount) || 0;
  const saved = p * (d / 100); const final_ = p - saved;
  return (
    <ToolPageLayout toolId="discount-calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Original Price</label><input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Discount (%)</label><input type="range" min="0" max="100" value={discount} onChange={e => setDiscount(e.target.value)} className="w-full accent-[#39FF14]" /><div className="flex justify-between text-xs text-white/30"><span>0%</span><span className="text-[#39FF14] font-bold">{discount}%</span><span>100%</span></div></div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-3">
          <div className="bg-white/3 border border-white/5 rounded-xl p-4"><p className="text-xs text-white/40">Original Price</p><p className="text-xl font-black text-white">${p.toFixed(2)}</p></div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"><p className="text-xs text-red-400">You Save ({d}% off)</p><p className="text-xl font-black text-red-400">-${saved.toFixed(2)}</p></div>
          <div className="bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-xl p-4"><p className="text-xs text-[#39FF14]">Final Price</p><p className="text-2xl font-black text-[#39FF14]">${final_.toFixed(2)}</p></div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
