import { useState, useMemo } from 'react';
import { PieChart, DollarSign } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

interface Channel {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

const DEFAULT_CHANNELS: Channel[] = [
  { id: 'content', name: 'Content Marketing', percentage: 25, color: '#39FF14' },
  { id: 'paid', name: 'Paid Advertising', percentage: 30, color: '#60a5fa' },
  { id: 'seo', name: 'SEO', percentage: 15, color: '#a78bfa' },
  { id: 'email', name: 'Email Marketing', percentage: 10, color: '#f472b6' },
  { id: 'social', name: 'Social Media', percentage: 10, color: '#22d3ee' },
  { id: 'analytics', name: 'Analytics & Tools', percentage: 5, color: '#fbbf24' },
  { id: 'other', name: 'Other / Reserve', percentage: 5, color: '#94a3b8' },
];

export function MarketingBudgetCalculatorPage() {
  const [totalBudget, setTotalBudget] = useState('5000');
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
  const [channels, setChannels] = useState<Channel[]>(DEFAULT_CHANNELS);

  const totalPct = useMemo(() => channels.reduce((sum, c) => sum + c.percentage, 0), [channels]);
  const budget = parseFloat(totalBudget) || 0;

  const updateChannel = (id: string, pct: number) => {
    setChannels(prev => prev.map(c => c.id === id ? { ...c, percentage: Math.max(0, Math.min(100, pct)) } : c));
  };

  const addChannel = () => {
    const colors = ['#ef4444', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];
    setChannels(prev => [
      ...prev,
      { id: `custom-${Date.now()}`, name: 'New Channel', percentage: 0, color: colors[prev.length % colors.length] },
    ]);
  };

  const removeChannel = (id: string) => {
    setChannels(prev => prev.filter(c => c.id !== id));
  };

  const renameChannel = (id: string, name: string) => {
    setChannels(prev => prev.map(c => c.id === id ? { ...c, name } : c));
  };

  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const multiplier = period === 'monthly' ? 1 : period === 'quarterly' ? 3 : 12;

  return (
    <ToolPageLayout toolId="marketing-budget-calculator">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Input */}
        <div className="md:col-span-3 bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-end gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Total Budget ($)</label>
              <input
                type="number"
                value={totalBudget}
                onChange={e => setTotalBudget(e.target.value)}
                placeholder="5000"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              {(['monthly', 'quarterly', 'annually'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${period === p ? 'bg-[#39FF14] text-black' : 'text-white/50 hover:text-white/80'}`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Allocation Warning */}
          {totalPct !== 100 && (
            <div className={`rounded-lg px-3 py-2 mb-4 text-xs ${totalPct > 100 ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'}`}>
              Total allocation: {totalPct}% — {totalPct > 100 ? `over by ${totalPct - 100}%` : `${100 - totalPct}% unallocated`}
            </div>
          )}

          {/* Channel Sliders */}
          <div className="flex flex-col gap-4">
            {channels.map(ch => (
              <div key={ch.id} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                <input
                  type="text"
                  value={ch.name}
                  onChange={e => renameChannel(ch.id, e.target.value)}
                  className="w-36 bg-transparent text-xs text-white/70 border-b border-transparent hover:border-white/20 focus:border-[#39FF14]/50 focus:outline-none py-0.5"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={ch.percentage}
                  onChange={e => updateChannel(ch.id, parseInt(e.target.value))}
                  className="flex-1 accent-[#39FF14]"
                />
                <span className="text-xs text-white/50 w-10 text-right">{ch.percentage}%</span>
                <span className="text-xs text-white/40 w-16 text-right font-mono">{fmt(Math.round(budget * ch.percentage / 100))}</span>
                <button
                  onClick={() => removeChannel(ch.id)}
                  className="text-white/20 hover:text-red-400 transition-colors text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addChannel}
            className="mt-4 text-xs text-[#39FF14] hover:text-[#2de010] transition-colors"
          >
            + Add Channel
          </button>
        </div>

        {/* Summary */}
        <div className="md:col-span-2 bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-5">Budget Summary</h2>

          <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4 mb-4">
            <p className="text-xs text-white/40 mb-1">Total {period} Budget</p>
            <p className="text-3xl font-black text-[#39FF14]">{fmt(budget)}</p>
            {period !== 'annually' && (
              <p className="text-xs text-white/30 mt-1">= {fmt(budget * (12 / multiplier))} / year</p>
            )}
          </div>

          {/* Visual bar */}
          <div className="mb-4">
            <div className="w-full h-6 rounded-full overflow-hidden flex bg-white/5">
              {channels.filter(c => c.percentage > 0).map(ch => (
                <div
                  key={ch.id}
                  className="h-full transition-all duration-300"
                  style={{ width: `${ch.percentage}%`, backgroundColor: ch.color + '99' }}
                  title={`${ch.name}: ${ch.percentage}%`}
                />
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="flex flex-col gap-2">
            {channels.filter(c => c.percentage > 0).sort((a, b) => b.percentage - a.percentage).map(ch => {
              const amount = Math.round(budget * ch.percentage / 100);
              return (
                <div key={ch.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span className="text-white/60">{ch.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/30">{ch.percentage}%</span>
                    <span className="text-white/70 font-mono w-16 text-right">{fmt(amount)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Period breakdown */}
          {period === 'monthly' && budget > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-white/30 mb-2">Annual Projection</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Quarterly</p>
                  <p className="text-sm font-semibold text-white/70">{fmt(budget * 3)}</p>
                </div>
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Annual</p>
                  <p className="text-sm font-semibold text-white/70">{fmt(budget * 12)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Benchmarks */}
      <div className="mt-6 bg-[#111111] rounded-2xl border border-white/8 p-6">
        <h3 className="font-semibold text-white text-sm mb-3">Industry Benchmarks</h3>
        <div className="grid sm:grid-cols-4 gap-4 text-xs text-white/50">
          <div>
            <p className="text-white/70 font-semibold mb-1">Startups</p>
            <p>12–20% of revenue on marketing</p>
          </div>
          <div>
            <p className="text-white/70 font-semibold mb-1">B2B Companies</p>
            <p>6–12% of revenue on marketing</p>
          </div>
          <div>
            <p className="text-white/70 font-semibold mb-1">E-commerce</p>
            <p>15–25% of revenue on marketing</p>
          </div>
          <div>
            <p className="text-white/70 font-semibold mb-1">SaaS</p>
            <p>20–50% of revenue on marketing</p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}