import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
const UNITS: Record<string, Record<string, number>> = {
  Length: { Meters: 1, Kilometers: 0.001, Centimeters: 100, Millimeters: 1000, Miles: 0.000621371, Yards: 1.09361, Feet: 3.28084, Inches: 39.3701 },
  Weight: { Kilograms: 1, Grams: 1000, Milligrams: 1000000, Pounds: 2.20462, Ounces: 35.274, Tons: 0.001 },
  Temperature: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
  Volume: { Liters: 1, Milliliters: 1000, Gallons: 0.264172, Quarts: 1.05669, Cups: 4.22675, 'Fluid Oz': 33.814 },
  Area: { 'Sq Meters': 1, 'Sq Km': 0.000001, 'Sq Feet': 10.7639, Acres: 0.000247105, Hectares: 0.0001 },
  Speed: { 'm/s': 1, 'km/h': 3.6, 'mph': 2.23694, Knots: 1.94384 },
};
export function UnitConverterPage() {
  const [category, setCategory] = useState('Length'); const [from, setFrom] = useState('Meters'); const [to, setTo] = useState('Feet'); const [value, setValue] = useState('1');
  const cats = Object.keys(UNITS); const units = Object.keys(UNITS[category] || {});
  const convert = () => {
    const v = parseFloat(value) || 0;
    if (category === 'Temperature') {
      let celsius = from === 'Celsius' ? v : from === 'Fahrenheit' ? (v - 32) * 5/9 : v - 273.15;
      return to === 'Celsius' ? celsius : to === 'Fahrenheit' ? celsius * 9/5 + 32 : celsius + 273.15;
    }
    const base = v / (UNITS[category][from] || 1);
    return base * (UNITS[category][to] || 1);
  };
  const result = convert();
  return (
    <ToolPageLayout toolId="unit-converter">
      <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-5">
        <div className="flex flex-wrap gap-2">
          {cats.map(c => <button key={c} onClick={() => { setCategory(c); const u = Object.keys(UNITS[c]); setFrom(u[0]); setTo(u[1]); }} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${c === category ? 'bg-[#39FF14] text-black font-semibold' : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20'}`}>{c}</button>)}
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Value</label>
            <input type="number" value={value} onChange={e => setValue(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} />
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>{units.map(u => <option key={u} value={u}>{u}</option>)}</select>
          </div>
          <span className="text-white/20 text-xl self-center pb-6">=</span>
          <div>
            <label className="block text-xs text-[#39FF14] mb-1.5 uppercase tracking-wider">Result</label>
            <div className="w-full px-4 py-3 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] text-sm font-bold">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
            <select value={to} onChange={e => setTo(e.target.value)} className="w-full mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>{units.map(u => <option key={u} value={u}>{u}</option>)}</select>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
