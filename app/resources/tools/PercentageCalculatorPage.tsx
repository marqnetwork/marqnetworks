import { useState } from 'react';
import { Percent, ArrowRight } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

function CalcCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
      <h3 className="font-semibold text-white text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

function NumInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || '0'}
        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
        style={{ colorScheme: 'dark' }}
      />
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4 mt-4">
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <p className="text-2xl font-black text-[#39FF14]">{value}</p>
    </div>
  );
}

export function PercentageCalculatorPage() {
  const [pctOf_pct, setPctOf_pct] = useState('');
  const [pctOf_num, setPctOf_num] = useState('');
  const [whatPct_part, setWhatPct_part] = useState('');
  const [whatPct_whole, setWhatPct_whole] = useState('');
  const [change_from, setChange_from] = useState('');
  const [change_to, setChange_to] = useState('');
  const [inc_num, setInc_num] = useState('');
  const [inc_pct, setInc_pct] = useState('');

  const pctOfResult = pctOf_pct && pctOf_num ? ((parseFloat(pctOf_pct) / 100) * parseFloat(pctOf_num)).toFixed(4).replace(/\.?0+$/, '') : '';
  const whatPctResult = whatPct_part && whatPct_whole && parseFloat(whatPct_whole) !== 0 ? ((parseFloat(whatPct_part) / parseFloat(whatPct_whole)) * 100).toFixed(4).replace(/\.?0+$/, '') + '%' : '';
  const changeResult = change_from && change_to && parseFloat(change_from) !== 0 ? (((parseFloat(change_to) - parseFloat(change_from)) / parseFloat(change_from)) * 100).toFixed(4).replace(/\.?0+$/, '') + '%' : '';
  const incResult = inc_num && inc_pct ? (parseFloat(inc_num) * (1 + parseFloat(inc_pct) / 100)).toFixed(4).replace(/\.?0+$/, '') : '';
  const decResult = inc_num && inc_pct ? (parseFloat(inc_num) * (1 - parseFloat(inc_pct) / 100)).toFixed(4).replace(/\.?0+$/, '') : '';

  return (
    <ToolPageLayout toolId="percentage-calculator">
      <div className="grid md:grid-cols-2 gap-4">
        <CalcCard title="What is X% of Y?">
          <div className="flex items-end gap-2">
            <div className="flex-1"><NumInput label="Percentage" value={pctOf_pct} onChange={setPctOf_pct} placeholder="25" /></div>
            <span className="pb-3 text-white/30 text-sm">% of</span>
            <div className="flex-1"><NumInput label="Number" value={pctOf_num} onChange={setPctOf_num} placeholder="200" /></div>
          </div>
          {pctOfResult && <Result label={`${pctOf_pct}% of ${pctOf_num}`} value={pctOfResult} />}
        </CalcCard>

        <CalcCard title="X is what % of Y?">
          <div className="flex items-end gap-2">
            <div className="flex-1"><NumInput label="Part" value={whatPct_part} onChange={setWhatPct_part} placeholder="50" /></div>
            <span className="pb-3 text-white/30 text-sm">of</span>
            <div className="flex-1"><NumInput label="Whole" value={whatPct_whole} onChange={setWhatPct_whole} placeholder="200" /></div>
          </div>
          {whatPctResult && <Result label={`${whatPct_part} is what % of ${whatPct_whole}?`} value={whatPctResult} />}
        </CalcCard>

        <CalcCard title="Percentage Change">
          <div className="flex items-end gap-2">
            <div className="flex-1"><NumInput label="From" value={change_from} onChange={setChange_from} placeholder="100" /></div>
            <ArrowRight className="w-4 h-4 text-white/30 mb-3 shrink-0" />
            <div className="flex-1"><NumInput label="To" value={change_to} onChange={setChange_to} placeholder="150" /></div>
          </div>
          {changeResult && (
            <Result
              label={`Change from ${change_from} to ${change_to}`}
              value={`${parseFloat(changeResult) > 0 ? '+' : ''}${changeResult}`}
            />
          )}
        </CalcCard>

        <CalcCard title="Increase / Decrease by %">
          <div className="flex items-end gap-2">
            <div className="flex-1"><NumInput label="Number" value={inc_num} onChange={setInc_num} placeholder="200" /></div>
            <span className="pb-3 text-white/30 text-sm">±</span>
            <div className="flex-1"><NumInput label="Percent" value={inc_pct} onChange={setInc_pct} placeholder="15" /></div>
          </div>
          {incResult && decResult && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-3">
                <p className="text-xs text-white/40 mb-1">+{inc_pct}%</p>
                <p className="text-lg font-black text-[#39FF14]">{incResult}</p>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                <p className="text-xs text-white/40 mb-1">-{inc_pct}%</p>
                <p className="text-lg font-black text-red-400">{decResult}</p>
              </div>
            </div>
          )}
        </CalcCard>
      </div>

      <div className="mt-6 bg-[#111111] rounded-2xl border border-white/8 p-6">
        <h3 className="font-semibold text-white text-sm mb-3">Quick Reference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { label: '10% of 250', val: '25' },
            { label: '15% of 80', val: '12' },
            { label: '20% of 500', val: '100' },
            { label: '25% of 400', val: '100' },
            { label: '33% of 300', val: '99' },
            { label: '50% of 180', val: '90' },
            { label: '75% of 200', val: '150' },
            { label: '100% of 50', val: '50' },
          ].map(r => (
            <div key={r.label} className="bg-white/3 rounded-lg p-2 text-center">
              <p className="text-white/40">{r.label}</p>
              <p className="text-white/80 font-semibold mt-0.5">{r.val}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
