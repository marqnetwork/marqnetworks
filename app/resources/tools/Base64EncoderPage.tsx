import { useState } from 'react';
import { Binary, Copy, Check, ArrowDownUp } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

export function Base64EncoderPage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (!input.trim()) return '';
    setError('');
    try {
      if (mode === 'encode') {
        return btoa(unescape(encodeURIComponent(input)));
      } else {
        return decodeURIComponent(escape(atob(input.trim())));
      }
    } catch {
      setError(mode === 'decode' ? 'Invalid Base64 string' : 'Encoding error');
      return '';
    }
  };

  const output = process();

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    setMode(m => m === 'encode' ? 'decode' : 'encode');
    setInput(output || '');
    setError('');
  };

  return (
    <ToolPageLayout toolId="base64-encoder">
      {/* Mode Toggle */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => { setMode('encode'); setInput(''); setError(''); }}
              className={`px-4 py-2 rounded-md text-xs font-medium tracking-wide transition-all ${mode === 'encode' ? 'bg-[#39FF14] text-black' : 'text-white/50 hover:text-white/80'}`}
            >
              Encode
            </button>
            <button
              onClick={() => { setMode('decode'); setInput(''); setError(''); }}
              className={`px-4 py-2 rounded-md text-xs font-medium tracking-wide transition-all ${mode === 'decode' ? 'bg-[#39FF14] text-black' : 'text-white/50 hover:text-white/80'}`}
            >
              Decode
            </button>
          </div>
          {output && (
            <button
              onClick={toggleMode}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors ml-auto"
            >
              <ArrowDownUp className="w-3.5 h-3.5" /> Swap
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-sm">{mode === 'encode' ? 'Plain Text' : 'Base64 String'}</h2>
              <span className="text-xs text-white/25">{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={e => { setInput(e.target.value); setError(''); }}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'}
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm resize-none font-mono"
            />
            {error && (
              <p className="text-red-400 text-xs mt-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}
          </div>

          {/* Output */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-sm">{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</h2>
              {output && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/25">{output.length} chars</span>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                    {copied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4 min-h-[268px] max-h-[400px] overflow-y-auto">
              {output ? (
                <pre className="text-sm text-white/65 whitespace-pre-wrap font-mono break-all">{output}</pre>
              ) : (
                <p className="text-white/25 text-xs text-center mt-20">
                  {error ? 'Fix the error and try again' : `Enter text to ${mode}`}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h3 className="font-semibold text-white text-sm mb-3">About Base64</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white/50">
            <div>
              <p className="text-white/70 font-semibold mb-1">What is Base64?</p>
              <p>A binary-to-text encoding scheme that represents binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, /).</p>
            </div>
            <div>
              <p className="text-white/70 font-semibold mb-1">Common Uses</p>
              <p>Embedding images in CSS/HTML, encoding email attachments, passing data in URLs, API authentication tokens.</p>
            </div>
            <div>
              <p className="text-white/70 font-semibold mb-1">Size Impact</p>
              <p>Base64 encoding increases data size by ~33%. A 3-byte input becomes 4 Base64 characters.</p>
            </div>
          </div>
        </div>
    </ToolPageLayout>
  );
}