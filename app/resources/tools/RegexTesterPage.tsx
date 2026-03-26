import { useState, useMemo } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
export function RegexTesterPage() {
  const [pattern, setPattern] = useState(''); const [flags, setFlags] = useState('g'); const [text, setText] = useState('');
  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: '' };
    try { const re = new RegExp(pattern, flags); const m: { text: string; index: number; groups: string[] }[] = []; let match;
      if (flags.includes('g')) { while ((match = re.exec(text)) !== null) { m.push({ text: match[0], index: match.index, groups: match.slice(1) }); if (!match[0]) break; } }
      else { match = re.exec(text); if (match) m.push({ text: match[0], index: match.index, groups: match.slice(1) }); }
      return { matches: m, error: '' };
    } catch (e: any) { return { matches: [], error: e.message }; }
  }, [pattern, flags, text]);
  const highlighted = useMemo(() => {
    if (!pattern || !text || error) return null;
    try { const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'); let lastIndex = 0; const parts: { text: string; match: boolean }[] = [];
      let match; while ((match = re.exec(text)) !== null) { if (match.index > lastIndex) parts.push({ text: text.slice(lastIndex, match.index), match: false }); parts.push({ text: match[0], match: true }); lastIndex = match.index + match[0].length; if (!match[0]) break; }
      if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), match: false }); return parts;
    } catch { return null; }
  }, [pattern, flags, text, error]);
  return (
    <ToolPageLayout toolId="regex-tester">
      <div className="space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1"><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Regular Expression</label><input value={pattern} onChange={e => setPattern(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#39FF14] text-sm font-mono focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="e.g. \b\w+@\w+\.\w+\b" /></div>
            <div className="w-24"><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Flags</label><input value={flags} onChange={e => setFlags(e.target.value)} className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#39FF14]/50" placeholder="gi" /></div>
          </div>
          {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Test String</label><textarea value={text} onChange={e => setText(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="Enter text to test against the regex..." /></div>
        </div>
        {highlighted && highlighted.length > 0 && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <label className="block text-xs text-white/50 mb-3 uppercase tracking-wider">Match Highlighting</label>
            <div className="px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-sm font-mono whitespace-pre-wrap">{highlighted.map((p, i) => p.match ? <mark key={i} className="bg-[#39FF14]/30 text-[#39FF14] px-0.5 rounded">{p.text}</mark> : <span key={i} className="text-white/70">{p.text}</span>)}</div>
          </div>
        )}
        {matches.length > 0 && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <label className="block text-xs text-white/50 mb-3 uppercase tracking-wider">{matches.length} Match{matches.length > 1 ? 'es' : ''} Found</label>
            <div className="space-y-2">{matches.map((m, i) => (
              <div key={i} className="bg-white/3 rounded-lg px-4 py-2.5 flex items-center gap-4">
                <span className="text-xs text-white/30 w-6">#{i + 1}</span>
                <code className="text-sm text-[#39FF14] font-mono">"{m.text}"</code>
                <span className="text-xs text-white/25 ml-auto">index: {m.index}</span>
                {m.groups.length > 0 && <span className="text-xs text-purple-400">groups: [{m.groups.join(', ')}]</span>}
              </div>
            ))}</div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
