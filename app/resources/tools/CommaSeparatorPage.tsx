import { useState } from 'react';
import { Table2, Copy, Check, ArrowRight, ArrowDown } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

type Delimiter = ',' | ';' | '\t' | '|' | '\n';

const DELIMITERS: { value: Delimiter; label: string }[] = [
  { value: ',', label: 'Comma (,)' },
  { value: ';', label: 'Semicolon (;)' },
  { value: '\t', label: 'Tab' },
  { value: '|', label: 'Pipe (|)' },
  { value: '\n', label: 'New Line' },
];

export function CommaSeparatorPage() {
  const [input, setInput] = useState('');
  const [fromDelim, setFromDelim] = useState<Delimiter>('\n');
  const [toDelim, setToDelim] = useState<Delimiter>(',');
  const [trimItems, setTrimItems] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [wrapQuotes, setWrapQuotes] = useState(false);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    if (!input.trim()) return '';
    let items = input.split(fromDelim === '\t' ? /\t/ : fromDelim === '\n' ? /\n/ : fromDelim);
    if (trimItems) items = items.map(i => i.trim());
    if (removeEmpty) items = items.filter(i => i.length > 0);
    if (wrapQuotes) items = items.map(i => `"${i}"`);
    const sep = toDelim === '\t' ? '\t' : toDelim === '\n' ? '\n' : `${toDelim} `;
    return items.join(sep);
  };

  const output = convert();

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const itemCount = output ? output.split(toDelim === '\t' ? /\t/ : toDelim === '\n' ? /\n/ : toDelim).filter(i => i.trim()).length : 0;

  return (
    <ToolPageLayout toolId="comma-separator">
      {/* Options */}
      <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 mb-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Input Separator</label>
            <select
              value={fromDelim}
              onChange={e => setFromDelim(e.target.value as Delimiter)}
              className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
              style={{ colorScheme: 'dark' }}
            >
              {DELIMITERS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
          <ArrowRight className="w-4 h-4 text-white/20 mb-2.5 shrink-0 hidden sm:block" />
          <ArrowDown className="w-4 h-4 text-white/20 shrink-0 sm:hidden" />
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Output Separator</label>
            <select
              value={toDelim}
              onChange={e => setToDelim(e.target.value as Delimiter)}
              className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
              style={{ colorScheme: 'dark' }}
            >
              {DELIMITERS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={trimItems} onChange={e => setTrimItems(e.target.checked)} className="accent-[#39FF14] w-3.5 h-3.5" />
              <span className="text-xs text-white/50">Trim</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={removeEmpty} onChange={e => setRemoveEmpty(e.target.checked)} className="accent-[#39FF14] w-3.5 h-3.5" />
              <span className="text-xs text-white/50">Remove empty</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={wrapQuotes} onChange={e => setWrapQuotes(e.target.checked)} className="accent-[#39FF14] w-3.5 h-3.5" />
              <span className="text-xs text-white/50">Wrap quotes</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-4">Input</h2>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={"Paste your list here...\nOne item per line\nOr comma-separated"}
            rows={14}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm resize-none font-mono"
          />
        </div>

        {/* Output */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-sm">Output</h2>
            <div className="flex items-center gap-3">
              {output && <span className="text-xs text-white/25">{itemCount} items</span>}
              {output && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-xl p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
            {output ? (
              <pre className="text-sm text-white/65 whitespace-pre-wrap font-mono break-all">{output}</pre>
            ) : (
              <p className="text-white/25 text-xs text-center mt-20">Output will appear here</p>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
