import { useState } from 'react';
import { Slash, Copy, Check, ArrowRight } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

function slugify(text: string, separator: string = '-'): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, separator)
    .replace(new RegExp(`${separator === '-' ? '-' : '\\' + separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator === '-' ? '-' : '\\' + separator}|${separator === '-' ? '-' : '\\' + separator}$`, 'g'), '');
}

const STOP_WORDS = new Set(['a','an','the','and','or','but','in','on','at','to','for','of','with','by','from','is','it','as','was','are','be','been','being','has','have','had','do','does','did','will','would','could','should','may','might','shall','can','this','that','these','those','i','we','you','he','she','they','me','him','her','us','them','my','your','his','its','our','their']);

function slugifyClean(text: string, sep: string = '-'): string {
  const words = text.toLowerCase().split(/\s+/).filter(w => !STOP_WORDS.has(w));
  return slugify(words.join(' '), sep);
}

export function SlugGeneratorPage() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('-');
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const baseSlug = removeStopWords ? slugifyClean(input, separator) : slugify(input, separator);
  const slug = maxLength > 0 ? baseSlug.split(separator).slice(0, maxLength).join(separator) : baseSlug;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const variations = input.trim() ? [
    { label: 'Standard', value: slugify(input) },
    { label: 'No Stop Words', value: slugifyClean(input) },
    { label: 'Short (5 words)', value: slugify(input).split('-').slice(0, 5).join('-') },
    { label: 'Underscore', value: slugify(input, '_') },
  ] : [];

  return (
    <ToolPageLayout toolId="slug-generator">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-4">Input Text</h2>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 10 Best Email Marketing Tools for Small Businesses in 2025"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm resize-none"
          />

          <div className="flex flex-col gap-4 mt-5">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Separator</label>
              <div className="flex gap-2">
                {[{ v: '-', l: 'Hyphen (-)' }, { v: '_', l: 'Underscore (_)' }].map(s => (
                  <button
                    key={s.v}
                    onClick={() => setSeparator(s.v)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${separator === s.v ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white/50 hover:bg-white/8'}`}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={removeStopWords} onChange={e => setRemoveStopWords(e.target.checked)} className="accent-[#39FF14] w-4 h-4" />
              <span className="text-xs text-white/50">Remove stop words (a, the, and, for, in, of...)</span>
            </label>

            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Max Words (0 = unlimited)</label>
              <input
                type="number"
                min={0}
                max={20}
                value={maxLength}
                onChange={e => setMaxLength(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-4">Generated Slug</h2>

          {slug ? (
            <>
              {/* Primary slug */}
              <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-white/40">Your Slug</p>
                  <button onClick={() => handleCopy(slug, 'main')} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                    {copied === 'main' ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}
                    {copied === 'main' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-[#39FF14] font-mono text-sm break-all">/{slug}</p>
                <p className="text-xs text-white/30 mt-2 break-all">yourdomain.com/{slug}</p>
              </div>

              {/* Variations */}
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Variations</p>
              <div className="flex flex-col gap-2">
                {variations.map(v => (
                  <div key={v.label} className="flex items-center justify-between bg-white/3 border border-white/5 rounded-lg p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/40 mb-0.5">{v.label}</p>
                      <p className="text-xs text-white/60 font-mono truncate">/{v.value}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(v.value, v.label)}
                      className="text-white/30 hover:text-[#39FF14] transition-colors shrink-0 ml-2"
                    >
                      {copied === v.label ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Characters</p>
                  <p className="text-sm font-semibold text-white/70">{slug.length}</p>
                </div>
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Words</p>
                  <p className="text-sm font-semibold text-white/70">{slug.split(separator).length}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-20">
              <p className="text-white/25 text-xs">Enter text to generate a slug</p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}