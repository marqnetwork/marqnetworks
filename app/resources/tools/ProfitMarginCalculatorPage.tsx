import { useState, useMemo } from 'react';
import { DollarSign } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

export function ProfitMarginCalculatorPage() {
  const [cost, setCost] = useState('');
  const [revenue, setRevenue] = useState('');
  const [mode, setMode] = useState<'margin' | 'markup'>('margin');

  const results = useMemo(() => {
    const c = parseFloat(cost) || 0;
    const r = parseFloat(revenue) || 0;
    if (c <= 0 || r <= 0) return null;
    const profit = r - c;
    const margin = (profit / r) * 100;
    const markup = (profit / c) * 100;
    return { profit, margin, markup, cost: c, revenue: r };
  }, [cost, revenue]);

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <ToolPageLayout toolId="profit-margin-calculator">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex gap-2 mb-6">
            {(['margin', 'markup'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${mode === m ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20'}`}
              >
                {m === 'margin' ? 'Cost → Revenue' : 'Cost + Markup %'}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Cost Price ($)</label>
              <input
                type="number"
                value={cost}
                onChange={e => setCost(e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            {mode === 'margin' ? (
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Selling Price ($)</label>
                <input
                  type="number"
                  value={revenue}
                  onChange={e => setRevenue(e.target.value)}
                  placeholder="e.g. 80"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Markup Percentage (%)</label>
                <input
                  type="number"
                  value={revenue}
                  onChange={e => {
                    setRevenue(e.target.value);
                  }}
                  placeholder="e.g. 60"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-5">Results</h2>
          {(() => {
            const c = parseFloat(cost) || 0;
            const r = mode === 'markup'
              ? c * (1 + (parseFloat(revenue) || 0) / 100)
              : parseFloat(revenue) || 0;
            if (c <= 0 || r <= 0) {
              return (
                <div className="flex items-center justify-center py-16">
                  <p className="text-white/25 text-xs">Enter cost and selling price to see results</p>
                </div>
              );
            }
            const profit = r - c;
            const margin = (profit / r) * 100;
            const markup = (profit / c) * 100;
            return (
              <div className="flex flex-col gap-3">
                <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4">
                  <p className="text-xs text-white/40 mb-1">Net Profit</p>
                  <p className={`text-3xl font-black ${profit >= 0 ? 'text-[#39FF14]' : 'text-red-400'}`}>${fmt(profit)}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                    <p className="text-xs text-white/40 mb-1">Profit Margin</p>
                    <p className="text-xl font-black text-white">{margin.toFixed(2)}%</p>
                  </div>
                  <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                    <p className="text-xs text-white/40 mb-1">Markup</p>
                    <p className="text-xl font-black text-white">{markup.toFixed(2)}%</p>
                  </div>
                  <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                    <p className="text-xs text-white/40 mb-1">Cost</p>
                    <p className="text-lg font-semibold text-white/70">${fmt(c)}</p>
                  </div>
                  <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                    <p className="text-xs text-white/40 mb-1">Revenue</p>
                    <p className="text-lg font-semibold text-white/70">${fmt(r)}</p>
                  </div>
                </div>
                {/* Visual bar */}
                <div className="mt-2">
                  <p className="text-xs text-white/30 mb-2">Revenue Breakdown</p>
                  <div className="w-full h-6 rounded-full bg-white/5 overflow-hidden flex">
                    <div className="h-full bg-red-500/60 flex items-center justify-center text-[10px] text-white/80 font-medium" style={{ width: `${Math.min(100, (c / r) * 100)}%` }}>
                      {((c / r) * 100).toFixed(0)}% Cost
                    </div>
                    <div className="h-full bg-[#39FF14]/40 flex items-center justify-center text-[10px] text-white/80 font-medium" style={{ width: `${Math.max(0, (profit / r) * 100)}%` }}>
                      {((profit / r) * 100).toFixed(0)}% Profit
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <div className="mt-6 bg-[#111111] rounded-2xl border border-white/8 p-6">
        <h3 className="font-semibold text-white text-sm mb-3">Margin vs Markup</h3>
        <div className="grid grid-cols-2 gap-4 text-xs text-white/50">
          <div>
            <p className="text-white/70 font-semibold mb-1">Profit Margin</p>
            <p>Profit ÷ Revenue × 100</p>
            <p className="mt-1 text-white/30">How much of each dollar of revenue is profit</p>
          </div>
          <div>
            <p className="text-white/70 font-semibold mb-1">Markup</p>
            <p>Profit ÷ Cost × 100</p>
            <p className="mt-1 text-white/30">How much you add on top of cost</p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
