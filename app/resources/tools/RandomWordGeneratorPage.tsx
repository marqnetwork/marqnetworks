import { useState, useCallback } from 'react';
import { Dices, Copy, Check, RefreshCw } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const WORDS = {
  nouns: ['mountain','ocean','forest','galaxy','thunder','crystal','shadow','garden','castle','rhythm','whisper','horizon','journey','legend','phoenix','compass','anchor','puzzle','melody','canvas','beacon','arrow','bridge','canyon','desert','island','meteor','nebula','orbit','prism','quartz','river','summit','temple','valley','zenith','breeze','cascade','delta','ember','frost','glacier','harbor','ivory','jungle','lantern','marble','nexus','opal','pearl'],
  adjectives: ['brilliant','crimson','elegant','fierce','golden','humble','infinite','jade','keen','luminous','mystic','noble','opaque','pristine','quiet','radiant','serene','tender','unique','vivid','wild','azure','bold','calm','daring','epic','frosty','gentle','harmonic','iconic','jovial','kinetic','lush','magnetic','nimble','organic','placid','quirky','robust','stellar'],
  verbs: ['accelerate','breathe','compose','discover','embrace','flourish','generate','harvest','illuminate','journey','kindle','launch','manifest','navigate','observe','persist','question','restore','sculpt','transform','unite','venture','wander','yield','amplify','balance','cultivate','design','elevate','forge','guide','honor','inspire','justify','knit','liberate','motivate','nurture','optimize','pioneer'],
  adverbs: ['boldly','calmly','deeply','eagerly','fiercely','gently','happily','intensely','joyfully','keenly','lightly','mindfully','naturally','openly','patiently','quietly','rapidly','smoothly','tenderly','uniquely','vividly','warmly','zealously','brightly','carefully','diligently','efficiently','freely','gracefully','honestly'],
};

type WordType = keyof typeof WORDS | 'all';

export function RandomWordGeneratorPage() {
  const [count, setCount] = useState(10);
  const [wordType, setWordType] = useState<WordType>('all');
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pool = wordType === 'all'
      ? [...WORDS.nouns, ...WORDS.adjectives, ...WORDS.verbs, ...WORDS.adverbs]
      : WORDS[wordType];
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    setGenerated(result);
  }, [count, wordType]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout toolId="random-word-generator">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-5">Options</h2>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Word Type</label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: 'all' as WordType, label: 'All Types' },
                  { value: 'nouns' as WordType, label: 'Nouns' },
                  { value: 'adjectives' as WordType, label: 'Adjectives' },
                  { value: 'verbs' as WordType, label: 'Verbs' },
                  { value: 'adverbs' as WordType, label: 'Adverbs' },
                ].map(t => (
                  <button
                    key={t.value}
                    onClick={() => setWordType(t.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${wordType === t.value ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white/50 hover:bg-white/8'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Count ({count})</label>
              <input
                type="range"
                min={1}
                max={100}
                value={count}
                onChange={e => setCount(parseInt(e.target.value))}
                className="w-full accent-[#39FF14]"
              />
              <div className="flex justify-between text-xs text-white/25 mt-1">
                <span>1</span><span>100</span>
              </div>
            </div>

            <button
              onClick={generate}
              className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              <RefreshCw className="w-4 h-4" /> Generate Words
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="md:col-span-2 bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-sm">Generated Words</h2>
            {generated.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(generated.join(', '))}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>
            )}
          </div>
          {generated.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {generated.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  onClick={() => { navigator.clipboard.writeText(word); }}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:border-[#39FF14]/40 hover:text-[#39FF14] transition-all cursor-pointer"
                  title="Click to copy"
                >
                  {word}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <p className="text-white/25 text-xs">Click Generate to create random words</p>
            </div>
          )}

          {generated.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-xs text-white/30 mb-2">As a comma-separated list:</p>
              <p className="text-xs text-white/50 bg-white/3 rounded-lg p-3 font-mono">{generated.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
