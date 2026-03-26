import { useState, useCallback, useRef } from 'react';
import { Palette, Copy, Check, RefreshCw } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round((1 - rr - k) / (1 - k) * 100),
    m: Math.round((1 - gg - k) / (1 - k) * 100),
    y: Math.round((1 - bb - k) / (1 - k) * 100),
    k: Math.round(k * 100),
  };
}

function generatePalette(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [30, 50, 60, 70, 80, 85, 90, 95].map(l => {
    const r2 = hslToHex(h, s, l);
    return r2;
  });
}

function generateComplementary(hex: string): { complementary: string; analogous: string[]; triadic: string[] } {
  const rgb = hexToRgb(hex);
  if (!rgb) return { complementary: '#000000', analogous: [], triadic: [] };
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return {
    complementary: hslToHex((h + 180) % 360, s, l),
    analogous: [hslToHex((h + 30) % 360, s, l), hslToHex((h - 30 + 360) % 360, s, l)],
    triadic: [hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)],
  };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const NAMED_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#0a1628', '#1e3a8a', '#334155', '#64748b', '#94a3b8', '#ffffff',
];

export function ColorPickerPage() {
  const [hex, setHex] = useState('#3b82f6');
  const [copied, setCopied] = useState<string | null>(null);

  const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const palette = generatePalette(hex);
  const { complementary, analogous, triadic } = generateComplementary(hex);

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyBtn = ({ val, id }: { val: string; id: string }) => (
    <button onClick={() => handleCopy(val, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
      {copied === id ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5 text-white/30" />}
    </button>
  );

  const isDark = hsl.l < 50;

  const formats = [
    { label: 'HEX', value: hex.toUpperCase(), id: 'hex' },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, id: 'rgb' },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, id: 'hsl' },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, id: 'cmyk' },
    { label: 'CSS Variable', value: `--color-primary: ${hex};`, id: 'css-var' },
    { label: 'Tailwind', value: `bg-[${hex}]`, id: 'tw' },
  ];

  return (
    <ToolPageLayout toolId="color-picker">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Picker */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white mb-5 text-sm">Color Picker</h2>

          {/* Big Color Preview */}
          <div
            className="w-full h-36 rounded-2xl mb-5 flex items-center justify-center text-xl font-black"
            style={{ backgroundColor: hex, color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)' }}
          >
            {hex.toUpperCase()}
          </div>

          {/* Color Input */}
          <div className="flex items-center gap-3 mb-5">
            <input
              type="color"
              value={hex}
              onChange={e => setHex(e.target.value)}
              className="w-14 h-14 rounded-xl cursor-pointer border border-white/10 p-1 bg-transparent"
            />
            <div className="flex-1">
              <label className="text-xs text-white/40 block mb-1 uppercase tracking-wider">HEX Code</label>
              <input
                type="text"
                value={hex}
                onChange={e => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) setHex(val);
                }}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white text-sm font-mono uppercase"
              />
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <label className="text-xs text-white/40 block mb-2 uppercase tracking-wider">Quick Presets</label>
            <div className="flex flex-wrap gap-2">
              {NAMED_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setHex(c)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${hex === c ? 'border-[#39FF14] scale-110' : 'border-white/10 hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="mt-5 flex flex-col gap-3">
            {[
              { label: 'R', value: rgb.r, max: 255, color: '#ef4444' },
              { label: 'G', value: rgb.g, max: 255, color: '#22c55e' },
              { label: 'B', value: rgb.b, max: 255, color: '#3b82f6' },
            ].map(ch => (
              <div key={ch.label} className="flex items-center gap-3">
                <span className="text-xs font-bold w-4" style={{ color: ch.color }}>{ch.label}</span>
                <input
                  type="range"
                  min="0"
                  max={ch.max}
                  value={ch.value}
                  style={{ accentColor: ch.color }}
                  onChange={e => {
                    const v = Number(e.target.value);
                    const newRgb = { ...rgb, [ch.label.toLowerCase()]: v };
                    const toHex = (n: number) => n.toString(16).padStart(2, '0');
                    setHex(`#${toHex(newRgb.r)}${toHex(newRgb.g)}${toHex(newRgb.b)}`);
                  }}
                  className="flex-1"
                />
                <span className="text-xs text-white/40 w-8 text-right">{ch.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formats & Palette */}
        <div className="flex flex-col gap-4">
          {/* Formats */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <h2 className="font-bold text-white mb-4 text-sm">Color Formats</h2>
            <div className="flex flex-col gap-2">
              {formats.map(f => (
                <div key={f.id} className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
                  <div>
                    <span className="text-xs text-white/35 block">{f.label}</span>
                    <code className="text-sm font-mono text-white/75">{f.value}</code>
                  </div>
                  <CopyBtn val={f.value} id={f.id} />
                </div>
              ))}
            </div>
          </div>

          {/* Color Harmony */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <h2 className="font-bold text-white mb-4 text-sm">Color Harmony</h2>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs text-white/40 mb-2">Complementary</p>
                <div className="flex gap-2">
                  {[hex, complementary].map(c => (
                    <button key={c} onClick={() => setHex(c)} className="flex-1 h-12 rounded-xl border border-white/10 hover:border-white/30 transition-colors" style={{ backgroundColor: c }} title={c} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-2">Analogous</p>
                <div className="flex gap-2">
                  {[analogous[0], hex, analogous[1]].map((c, i) => (
                    <button key={i} onClick={() => setHex(c)} className="flex-1 h-12 rounded-xl border border-white/10 hover:border-white/30 transition-colors" style={{ backgroundColor: c }} title={c} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-2">Triadic</p>
                <div className="flex gap-2">
                  {[hex, triadic[0], triadic[1]].map((c, i) => (
                    <button key={i} onClick={() => setHex(c)} className="flex-1 h-12 rounded-xl border border-white/10 hover:border-white/30 transition-colors" style={{ backgroundColor: c }} title={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tints/Shades */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <h2 className="font-bold text-white mb-4 text-sm">Tints & Shades</h2>
            <div className="flex gap-1">
              {palette.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setHex(c)}
                  className="flex-1 h-12 rounded-lg border border-white/5 hover:scale-105 transition-transform"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}