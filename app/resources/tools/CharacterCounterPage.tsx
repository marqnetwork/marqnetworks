import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function CharacterCounterPage() {
  const [text, setText] = useState('');
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length || (text.trim() ? 1 : 0) : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));
  const speakTime = Math.max(1, Math.ceil(words / 130));
  const stats = [
    { label: 'Characters', value: chars, color: '#60a5fa' },
    { label: 'Without Spaces', value: charsNoSpace, color: '#a78bfa' },
    { label: 'Words', value: words, color: '#39FF14' },
    { label: 'Sentences', value: sentences, color: '#fbbf24' },
    { label: 'Paragraphs', value: paragraphs, color: '#f97316' },
    { label: 'Lines', value: lines, color: '#34d399' },
  ];
  return (
    <ToolPageLayout toolId="character-counter">
      <div className="space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30"
            placeholder="Start typing or paste text to analyze..." />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-[#111111] border border-white/8 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-white">{s.value.toLocaleString()}</p>
              <p className="text-xs mt-1" style={{ color: s.color }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="bg-[#111111] border border-white/8 rounded-xl p-4 flex-1 text-center">
            <p className="text-lg font-bold text-white">{readTime} min</p><p className="text-xs text-white/40">Reading Time</p>
          </div>
          <div className="bg-[#111111] border border-white/8 rounded-xl p-4 flex-1 text-center">
            <p className="text-lg font-bold text-white">{speakTime} min</p><p className="text-xs text-white/40">Speaking Time</p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
