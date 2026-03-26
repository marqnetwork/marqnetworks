import { useState, useMemo } from 'react';
import { Scale } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

export function BreakEvenCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [variableCost, setVariableCost] = useState('');
  const [currentUnits, setCurrentUnits] = useState('');

  const results = useMemo(() => {
    const fc = parseFloat(fixedCosts) || 0;
    const ppu = parseFloat(pricePerUnit) || 0;
    const vc = parseFloat(variableCost) || 0;
    const cu = parseFloat(currentUnits) || 0;

    if (fc <= 0 || ppu <= 0 || ppu <= vc) return null;

    const contribution = ppu - vc;
    const breakEvenUnits = Math.ceil(fc / contribution);
    const breakEvenRevenue = breakEvenUnits * ppu;
    const contributionMargin = (contribution / ppu) * 100;

    const currentRevenue = cu * ppu;
    const currentCosts = fc + (cu * vc);
    const currentProfit = currentRevenue - currentCosts;
    const unitsToBreakEven = Math.max(0, breakEvenUnits - cu);

    return {
      breakEvenUnits,
      breakEvenRevenue,
      contribution,
      contributionMargin,
      currentRevenue,
      currentCosts,
      currentProfit,
      unitsToBreakEven,
      currentUnits: cu,
    };
  }, [fixedCosts, pricePerUnit, variableCost, currentUnits]);

  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <ToolPageLayout toolId="break-even-calculator">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-5">Enter Your Numbers</h2>
          <div className="flex flex-col gap-5">
            {[
              { label: 'Fixed Costs (monthly)', value: fixedCosts, set: setFixedCosts, ph: 'e.g. 5000', hint: 'Rent, salaries, insurance, subscriptions' },
              { label: 'Price Per Unit ($)', value: pricePerUnit, set: setPricePerUnit, ph: 'e.g. 50', hint: 'What you charge per unit/service' },
              { label: 'Variable Cost Per Unit ($)', value: variableCost, set: setVariableCost, ph: 'e.g. 20', hint: 'Materials, shipping, commissions per unit' },
              { label: 'Current Monthly Units Sold', value: currentUnits, set: setCurrentUnits, ph: 'e.g. 150', hint: 'Optional — to see how close you are' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">{f.label}</label>
                <input
                  type="number"
                  value={f.value}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                  style={{ colorScheme: 'dark' }}
                />
                <p className="text-xs text-white/25 mt-1">{f.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-5">Break-Even Analysis</h2>

          {results ? (
            <div className="flex flex-col gap-3">
              <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4">
                <p className="text-xs text-white/40 mb-1">Break-Even Point</p>
                <p className="text-3xl font-black text-[#39FF14]">{results.breakEvenUnits.toLocaleString()} units</p>
                <p className="text-sm text-white/40 mt-1">= {fmt(results.breakEvenRevenue)} in revenue</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                  <p className="text-xs text-white/40 mb-1">Contribution / Unit</p>
                  <p className="text-lg font-black text-white">{fmt(results.contribution)}</p>
                </div>
                <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                  <p className="text-xs text-white/40 mb-1">Contribution Margin</p>
                  <p className="text-lg font-black text-white">{results.contributionMargin.toFixed(1)}%</p>
                </div>
              </div>

              {results.currentUnits > 0 && (
                <>
                  <div className="mt-2 pt-3 border-t border-white/5">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Your Current Position</p>
                    <div className={`rounded-xl p-4 border ${results.currentProfit >= 0 ? 'bg-[#39FF14]/5 border-[#39FF14]/20' : 'bg-red-500/5 border-red-500/20'}`}>
                      <p className="text-xs text-white/40 mb-1">Monthly Profit / Loss</p>
                      <p className={`text-2xl font-black ${results.currentProfit >= 0 ? 'text-[#39FF14]' : 'text-red-400'}`}>
                        {results.currentProfit >= 0 ? '+' : ''}{fmt(results.currentProfit)}
                      </p>
                    </div>
                  </div>

                  {results.unitsToBreakEven > 0 && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
                      <p className="text-xs text-white/40 mb-1">Units Until Break-Even</p>
                      <p className="text-lg font-black text-yellow-400">{results.unitsToBreakEven.toLocaleString()} more units needed</p>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs text-white/30 mb-1">
                      <span>0</span>
                      <span>{results.currentUnits.toLocaleString()} / {results.breakEvenUnits.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${results.currentProfit >= 0 ? 'bg-[#39FF14]/60' : 'bg-yellow-500/60'}`}
                        style={{ width: `${Math.min(100, (results.currentUnits / results.breakEvenUnits) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/25 mt-1 text-center">
                      {Math.min(100, ((results.currentUnits / results.breakEvenUnits) * 100)).toFixed(0)}% to break-even
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Scale className="w-10 h-10 text-white/10 mb-3" />
              <p className="text-white/25 text-xs">
                {parseFloat(pricePerUnit || '0') <= parseFloat(variableCost || '0') && parseFloat(pricePerUnit || '0') > 0
                  ? 'Price must be higher than variable cost'
                  : 'Enter your costs and pricing to calculate'}
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
