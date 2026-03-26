import { useState } from 'react';
import { Eraser, Copy, Check, ArrowRight } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

interface CleanOption {
  id: string;
  label: string;
  description: string;
  fn: (text: string) => string;
}

const CLEAN_OPTIONS: CleanOption[] = [
  { id: 'extra-spaces', label: 'Remove Extra Spaces', description: 'Collapse multiple spaces into one', fn: t => t.replace(/  +/g, ' ') },
  { id: 'trim-lines', label: 'Trim Line Whitespace', description: 'Remove leading/trailing spaces from each line', fn: t => t.split('\n').map(l => l.trim()).join('\n') },
  { id: 'empty-lines', label: 'Remove Empty Lines', description: 'Delete blank lines from the text', fn: t => t.split('\n').filter(l => l.trim().length > 0).join('\n') },
  { id: 'strip-html', label: 'Strip HTML Tags', description: 'Remove all HTML/XML tags', fn: t => t.replace(/<[^>]*>/g, '') },
  { id: 'remove-urls', label: 'Remove URLs', description: 'Strip all web links from text', fn: t => t.replace(/https?:\/\/[^\s]*/g, '') },
  { id: 'remove-emails', label: 'Remove Email Addresses', description: 'Strip email addresses from text', fn: t => t.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '') },
  { id: 'lowercase', label: 'Convert to Lowercase', description: 'Make all text lowercase', fn: t => t.toLowerCase() },
  { id: 'uppercase', label: 'Convert to UPPERCASE', description: 'Make all text uppercase', fn: t => t.toUpperCase() },
  { id: 'title-case', label: 'Title Case', description: 'Capitalize first letter of each word', fn: t => t.replace(/\b\w/g, c => c.toUpperCase()) },
  { id: 'sentence-case', label: 'Sentence Case', description: 'Capitalize first letter of each sentence', fn: t => t.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase()) },
  { id: 'remove-numbers', label: 'Remove Numbers', description: 'Delete all digits from text', fn: t => t.replace(/[0-9]/g, '') },
  { id: 'remove-special', label: 'Remove Special Characters', description: 'Keep only letters, numbers, and spaces', fn: t => t.replace(/[^a-zA-Z0-9\s]/g, '') },
  { id: 'remove-punctuation', label: 'Remove Punctuation', description: 'Strip all punctuation marks', fn: t => t.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '') },
  { id: 'fix-quotes', label: 'Fix Quotation Marks', description: 'Convert smart quotes to straight quotes', fn: t => t.replace(/['']/g, "'").replace(/[""]/g, '"') },
  { id: 'single-newline', label: 'Single Line (Remove Newlines)', description: 'Convert to one continuous line of text', fn: t => t.replace(/\n+/g, ' ').replace(/  +/g, ' ').trim() },
];

export function TextCleanerPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const toggleOption = (id: string) => {
    setSelected(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const handleClean = () => {
    if (!input.trim()) return;
    const activeOpts = CLEAN_OPTIONS.filter(o => selected.has(o.id));
    if (activeOpts.length === 0) { setOutput(input); return; }
    let result = input;
    for (const opt of activeOpts) result = opt.fn(result);
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectAll = () => setSelected(new Set(CLEAN_OPTIONS.map(o => o.id)));
  const selectNone = () => setSelected(new Set());
  const quickPresets = [
    { label: 'Basic Cleanup', ids: ['extra-spaces', 'trim-lines', 'empty-lines', 'fix-quotes'] },
    { label: 'Copy-Paste Fix', ids: ['strip-html', 'extra-spaces', 'trim-lines', 'fix-quotes', 'remove-urls'] },
    { label: 'Normalize Case', ids: ['sentence-case', 'trim-lines', 'extra-spaces'] },
    { label: 'Social Media', ids: ['extra-spaces', 'trim-lines', 'empty-lines', 'strip-html', 'fix-quotes'] },
  ];

  return (
    <ToolPageLayout toolId="text-cleaner">
      {/* Quick Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {quickPresets.map(preset => (
          <button
            key={preset.label}
            onClick={() => setSelected(new Set(preset.ids))}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 hover:border-[#39FF14]/40 hover:text-[#39FF14] transition-all"
          >
            ⚡ {preset.label}
          </button>
        ))}
        <button onClick={selectAll} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white/80 transition-all">Select All</button>
        <button onClick={selectNone} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white/80 transition-all">Clear All</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Options */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
          <h2 className="font-bold text-white mb-4 text-sm">Cleaning Options ({selected.size} selected)</h2>
          <div className="flex flex-col gap-1 max-h-[450px] overflow-y-auto pr-1">
            {CLEAN_OPTIONS.map(opt => (
              <label key={opt.id} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                <input
                  type="checkbox"
                  checked={selected.has(opt.id)}
                  onChange={() => toggleOption(opt.id)}
                  className="w-4 h-4 mt-0.5 accent-[#39FF14] shrink-0"
                />
                <div>
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{opt.label}</div>
                  <div className="text-xs text-white/30">{opt.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-white text-sm">Input Text</h2>
            {input && <button onClick={() => { setInput(''); setOutput(''); }} className="text-xs text-red-400 hover:text-red-300 transition-colors">Clear</button>}
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your messy text here..."
            rows={14}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 resize-none text-sm text-white/75 placeholder-white/25"
          />
          <p className="text-xs text-white/30 mt-2">{input.length} chars, {input.split(/\s+/).filter(Boolean).length} words</p>
          <button
            onClick={handleClean}
            disabled={!input.trim() || selected.size === 0}
            className="w-full mt-3 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all disabled:opacity-30 flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            <Eraser className="w-4 h-4" />
            Clean Text ({selected.size} rules)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Output */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-white text-sm">Cleaned Output</h2>
            {output && (
              <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                {copied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          {output ? (
            <>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4 max-h-[350px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-white/70 font-sans">{output}</pre>
              </div>
              <div className="mt-3 flex gap-3 text-xs text-white/30">
                <span>{output.length} chars</span>
                <span>{output.split(/\s+/).filter(Boolean).length} words</span>
                {input.length > 0 && (
                  <span className="text-[#39FF14]">-{((1 - output.length / input.length) * 100).toFixed(0)}% size</span>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-center gap-2">
              <Eraser className="w-8 h-8 text-white/10" />
              <p className="text-white/25 text-xs">Output will appear here</p>
            </div>
          )}

          {output && input !== output && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Changes Made:</p>
              <div className="text-xs text-white/35">
                {Array.from(selected).map(id => {
                  const opt = CLEAN_OPTIONS.find(o => o.id === id);
                  return opt ? <div key={id} className="flex items-center gap-1"><span className="text-[#39FF14]">✓</span> {opt.label}</div> : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}