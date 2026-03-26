import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function WordFrequencyCounterPage() {
  const [text, setText] = useState('');
  const getFreq = () => {
    const words = text.toLowerCase().replace(/[^a-z0-9\s'-]/g, '').split(/\s+/).filter(Boolean);
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq).sort((a, b) => b[1] - a[1]);
  };
  const freq = text.trim() ? getFreq() : [];
  const maxCount = freq.length > 0 ? freq[0][1] : 1;
  return (
    <ToolPageLayout toolId="word-frequency-counter">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Paste Your Text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={14} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="Paste text to analyze word frequency..." />
          <p className="text-xs text-white/30 mt-2">{freq.length} unique words found</p>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 max-h-[500px] overflow-y-auto">
          <label className="block text-xs text-white/50 mb-3 uppercase tracking-wider">Word Frequency</label>
          {freq.length === 0 ? (
            <p className="text-xs text-white/25 text-center py-10">Enter text to see word frequency</p>
          ) : (
            <div className="space-y-1.5">
              {freq.slice(0, 50).map(([word, count], i) => (
                <div key={word} className="flex items-center gap-3">
                  <span className="text-xs text-white/25 w-6 text-right">{i + 1}</span>
                  <span className="text-xs text-white/70 w-24 truncate">{word}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden">
                    <div className="h-full rounded flex items-center px-2" style={{ width: `${(count / maxCount) * 100}%`, backgroundColor: i < 3 ? '#39FF14' : i < 10 ? 'rgba(57,255,20,0.4)' : 'rgba(255,255,255,0.1)' }}>
                      <span className="text-xs font-bold text-black">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
              {freq.length > 50 && <p className="text-xs text-white/25 text-center pt-2">Showing top 50 of {freq.length}</p>}
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
