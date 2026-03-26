import { useState, useMemo } from 'react';
import { Copy, Trash2, Check } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

export function WordCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);
    const readingTime = Math.max(1, Math.ceil(words / 238));
    const speakingTime = Math.max(1, Math.ceil(words / 130));

    const wordList = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'any', 'too', 'she', 'use', 'with', 'this', 'that', 'have', 'from', 'they', 'been', 'will', 'your', 'what', 'when', 'were', 'than', 'then', 'them', 'some', 'into', 'also', 'more', 'just', 'like', 'over', 'such', 'only', 'even', 'most', 'made', 'after', 'about', 'these', 'which', 'their', 'there', 'could', 'other', 'would', 'should', 'first', 'being']);
    const filteredWords = wordList.filter(w => !stopWords.has(w));
    const freq: Record<string, number> = {};
    filteredWords.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const topWords = Object.entries(freq).sort(([, a], [, b]) => b - a).slice(0, 8);

    const matchedWords = text.match(/\b\w+\b/g) ?? ([] as string[]);
    const totalWordLength = matchedWords.reduce((acc, w) => acc + w.length, 0);
    const avgWordLength = words > 0 ? totalWordLength / words : 0;

    return { chars, charsNoSpaces, words, sentences, paragraphs, readingTime, speakingTime, topWords, avgWordLength };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const StatCard = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
    <div className="rounded-xl p-4 border" style={{ backgroundColor: `${color}18`, borderColor: `${color}30` }}>
      <div className="text-xl font-black text-white">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="text-xs text-white/40 mt-0.5">{label}</div>
    </div>
  );

  return (
    <ToolPageLayout toolId="word-counter">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Text Area */}
        <div className="md:col-span-2 bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-white text-sm">Your Text</h2>
            <div className="flex gap-2">
              {text && (
                <button onClick={handleCopy} className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4 text-white/40" />}
                </button>
              )}
              {text && (
                <button onClick={() => setText('')} className="p-2 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Start typing or paste your text here to analyze it instantly..."
            rows={16}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 resize-none text-sm text-white/80 placeholder-white/25"
          />
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/30">
            <span>{stats.words} words</span>
            <span>{stats.chars} characters</span>
            <span>{stats.sentences} sentences</span>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="flex flex-col gap-4">
          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Words" value={stats.words} color="#60a5fa" />
            <StatCard label="Characters" value={stats.chars} color="#a78bfa" />
            <StatCard label="Sentences" value={stats.sentences} color="#34d399" />
            <StatCard label="Paragraphs" value={stats.paragraphs} color="#39FF14" />
          </div>

          {/* Time estimates */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
            <h3 className="font-semibold text-white/70 mb-3 text-xs uppercase tracking-wider">Time Estimates</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Reading time', value: `${stats.readingTime} min` },
                { label: 'Speaking time', value: `${stats.speakingTime} min` },
                { label: 'No-space chars', value: stats.charsNoSpaces },
                { label: 'Avg word length', value: `${stats.avgWordLength.toFixed(1)} chars` },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-white/40">{item.label}</span>
                  <span className="font-semibold text-white/80">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Words */}
          {stats.topWords.length > 0 && (
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
              <h3 className="font-semibold text-white/70 mb-3 text-xs uppercase tracking-wider">Top Keywords</h3>
              <div className="flex flex-col gap-2">
                {stats.topWords.map(([word, count]) => (
                  <div key={word} className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm text-white/70 font-medium">{word}</span>
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#39FF14] rounded-full"
                          style={{ width: `${Math.min(100, (count / stats.words) * 100 * 20)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-white/30 w-6 text-right">{count}x</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Targets */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
            <h3 className="font-semibold text-white/70 mb-3 text-xs uppercase tracking-wider">Content Targets</h3>
            {[
              { label: 'Tweet', target: 280, unit: 'chars' },
              { label: 'Meta description', target: 155, unit: 'chars' },
              { label: 'Blog post (min)', target: 800, unit: 'words' },
              { label: 'Long-form article', target: 2000, unit: 'words' },
            ].map(item => {
              const current = item.unit === 'chars' ? stats.chars : stats.words;
              const pct = Math.min(100, Math.round((current / item.target) * 100));
              return (
                <div key={item.label} className="mb-2.5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40">{item.label}</span>
                    <span className={current <= item.target ? 'text-[#39FF14]' : 'text-red-400'}>
                      {current}/{item.target} {item.unit}
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct >= 100 ? 'bg-[#39FF14]' : 'bg-white/20'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
