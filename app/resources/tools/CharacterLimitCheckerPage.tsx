import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
const LIMITS = [
  { platform: 'Twitter / X Post', limit: 280, color: '#1DA1F2' },
  { platform: 'Instagram Caption', limit: 2200, color: '#E4405F' },
  { platform: 'Instagram Bio', limit: 150, color: '#E4405F' },
  { platform: 'LinkedIn Post', limit: 3000, color: '#0077B5' },
  { platform: 'LinkedIn Headline', limit: 120, color: '#0077B5' },
  { platform: 'Facebook Post', limit: 63206, color: '#1877F2' },
  { platform: 'YouTube Title', limit: 100, color: '#FF0000' },
  { platform: 'YouTube Description', limit: 5000, color: '#FF0000' },
  { platform: 'TikTok Caption', limit: 2200, color: '#000000' },
  { platform: 'Pinterest Pin', limit: 500, color: '#BD081C' },
  { platform: 'Meta Title (SEO)', limit: 60, color: '#34d399' },
  { platform: 'Meta Description (SEO)', limit: 160, color: '#34d399' },
];
export function CharacterLimitCheckerPage() {
  const [text, setText] = useState('');
  const len = text.length;
  return (
    <ToolPageLayout toolId="character-limit-checker">
      <div className="space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Your Text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="Type or paste your text to check against all platform limits..." />
          <p className="text-xs text-white/30 mt-2">{len} characters</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LIMITS.map(p => {
            const pct = Math.min(100, (len / p.limit) * 100);
            const over = len > p.limit;
            return (
              <div key={p.platform} className={`bg-[#111111] border rounded-xl p-4 ${over ? 'border-red-500/30' : 'border-white/8'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/70">{p.platform}</span>
                  <span className={`text-xs font-bold ${over ? 'text-red-400' : 'text-[#39FF14]'}`}>{len}/{p.limit}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: over ? '#ef4444' : p.color }} />
                </div>
                {over && <p className="text-xs text-red-400 mt-1">{len - p.limit} over limit</p>}
              </div>
            );
          })}
        </div>
      </div>
    </ToolPageLayout>
  );
}
