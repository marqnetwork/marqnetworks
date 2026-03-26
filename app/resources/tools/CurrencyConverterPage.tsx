import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { ArrowLeftRight } from 'lucide-react';
const RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36, AUD: 1.53, CHF: 0.88, CNY: 7.24, INR: 83.1, MXN: 17.15, BRL: 4.97, KRW: 1320, SGD: 1.34, HKD: 7.82, SEK: 10.42, NOK: 10.55, NZD: 1.63, ZAR: 18.2, AED: 3.67, SAR: 3.75 };
const NAMES: Record<string, string> = { USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen', CAD: 'Canadian Dollar', AUD: 'Australian Dollar', CHF: 'Swiss Franc', CNY: 'Chinese Yuan', INR: 'Indian Rupee', MXN: 'Mexican Peso', BRL: 'Brazilian Real', KRW: 'South Korean Won', SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar', SEK: 'Swedish Krona', NOK: 'Norwegian Krone', NZD: 'New Zealand Dollar', ZAR: 'South African Rand', AED: 'UAE Dirham', SAR: 'Saudi Riyal' };
export function CurrencyConverterPage() {
  const [amount, setAmount] = useState('1000'); const [from, setFrom] = useState('USD'); const [to, setTo] = useState('EUR');
  const a = parseFloat(amount) || 0; const converted = a * (RATES[to] / RATES[from]); const rateDisplay = RATES[to] / RATES[from];
  const swap = () => { setFrom(to); setTo(from); };
  return (
    <ToolPageLayout toolId="currency-converter">
      <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-5">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} />
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>{Object.keys(RATES).map(c => <option key={c} value={c}>{c} — {NAMES[c]}</option>)}</select>
          </div>
          <button onClick={swap} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#39FF14]/15 hover:border-[#39FF14]/30 transition-all mb-4"><ArrowLeftRight className="w-4 h-4 text-white/50" /></button>
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Converted</label>
            <div className="w-full px-4 py-3 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] text-sm font-bold">{converted.toFixed(2)}</div>
            <select value={to} onChange={e => setTo(e.target.value)} className="w-full mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>{Object.keys(RATES).map(c => <option key={c} value={c}>{c} — {NAMES[c]}</option>)}</select>
          </div>
        </div>
        <div className="text-center text-xs text-white/30">1 {from} = {rateDisplay.toFixed(4)} {to}</div>
        <p className="text-xs text-white/20 text-center">Rates are approximate and for reference only. Last updated: March 2026.</p>
      </div>
    </ToolPageLayout>
  );
}
