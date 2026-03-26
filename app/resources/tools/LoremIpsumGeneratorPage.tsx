import { useState } from 'react';
import { Pilcrow, Copy, Check, RefreshCw } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit'.split(' ');

function generateWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
  }
  words[0] = 'Lorem';
  return words.join(' ') + '.';
}

function generateSentences(count: number): string {
  const sentences: string[] = [];
  let wordIdx = 0;
  for (let i = 0; i < count; i++) {
    const len = 8 + Math.floor(Math.random() * 12);
    const words: string[] = [];
    for (let j = 0; j < len; j++) {
      words.push(LOREM_WORDS[wordIdx % LOREM_WORDS.length]);
      wordIdx++;
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    sentences.push(words.join(' ') + '.');
  }
  if (sentences[0]) sentences[0] = 'Lorem ' + sentences[0].slice(sentences[0].indexOf(' ') + 1);
  return sentences.join(' ');
}

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateSentences(4 + Math.floor(Math.random() * 4)));
  }
  return paragraphs.join('\n\n');
}

export function LoremIpsumGeneratorPage() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const generate = () => {
    let text = '';
    if (type === 'words') text = generateWords(count);
    else if (type === 'sentences') text = generateSentences(count);
    else text = generateParagraphs(count);
    if (!startWithLorem && text.startsWith('Lorem')) {
      text = text.charAt(0).toLowerCase() + text.slice(1);
      text = text.replace(/^lorem/i, text.split(' ')[0]);
    }
    setOutput(text);
    setKey(k => k + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout toolId="lorem-ipsum-generator">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-5">Options</h2>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Type</label>
              <div className="flex flex-col gap-1.5">
                {(['paragraphs', 'sentences', 'words'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${type === t ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white/50 hover:bg-white/8'}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">
                Count ({count})
              </label>
              <input
                type="range"
                min={1}
                max={type === 'words' ? 500 : type === 'sentences' ? 50 : 20}
                value={count}
                onChange={e => setCount(parseInt(e.target.value))}
                className="w-full accent-[#39FF14]"
              />
              <div className="flex justify-between text-xs text-white/25 mt-1">
                <span>1</span>
                <span>{type === 'words' ? 500 : type === 'sentences' ? 50 : 20}</span>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={e => setStartWithLorem(e.target.checked)}
                className="accent-[#39FF14] w-4 h-4"
              />
              <span className="text-xs text-white/50">Start with "Lorem ipsum..."</span>
            </label>

            <button
              onClick={generate}
              className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              <RefreshCw className="w-4 h-4" /> Generate
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="md:col-span-2 bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-sm">Generated Text</h2>
            {output && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/25">{output.split(/\s+/).length} words</span>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
          </div>
          {output ? (
            <div className="bg-white/3 border border-white/5 rounded-xl p-4 max-h-[500px] overflow-y-auto">
              <p className="text-sm text-white/65 leading-relaxed whitespace-pre-wrap">{output}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <p className="text-white/25 text-xs">Click Generate to create placeholder text</p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
