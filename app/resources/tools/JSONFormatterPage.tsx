import { useState } from 'react';
import { FileJson, Copy, Check, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const SAMPLE_JSON = `{
  "name": "MarQ Networks",
  "type": "AI Marketing Agency",
  "services": ["SEO", "Paid Ads", "AI Automation", "Content Marketing"],
  "team": {
    "size": 25,
    "remote": true,
    "locations": ["US", "UK", "Canada"]
  },
  "stats": {
    "clients": 150,
    "averageROI": "340%",
    "yearsActive": 5
  }
}`;

type Tab = 'format' | 'minify' | 'validate' | 'convert';

export function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);
  const [activeTab, setActiveTab] = useState<Tab>('format');
  const [sortKeys, setSortKeys] = useState(false);

  const parseJSON = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      setError('');
      setValid(true);
      return parsed;
    } catch (e: any) {
      setError(e.message);
      setValid(false);
      return null;
    }
  };

  const handleFormat = () => {
    const parsed = parseJSON(input);
    if (!parsed) return;
    try {
      let result = parsed;
      if (sortKeys) {
        result = sortObjectKeys(parsed);
      }
      setOutput(JSON.stringify(result, null, indent));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleMinify = () => {
    const parsed = parseJSON(input);
    if (!parsed) return;
    setOutput(JSON.stringify(parsed));
  };

  const handleValidate = () => {
    const parsed = parseJSON(input);
    if (!parsed) return;
    const stats = getStats(input, parsed);
    setOutput(`✅ VALID JSON\n\nStats:\n• Total keys: ${stats.keys}\n• Nested objects: ${stats.objects}\n• Arrays: ${stats.arrays}\n• String values: ${stats.strings}\n• Number values: ${stats.numbers}\n• Boolean values: ${stats.booleans}\n• Null values: ${stats.nulls}\n• Estimated depth: ${stats.depth}\n• Minified size: ${JSON.stringify(parsed).length} bytes\n• Formatted size: ${JSON.stringify(parsed, null, 2).length} bytes`);
  };

  const handleConvert = () => {
    const parsed = parseJSON(input);
    if (!parsed) return;
    // Convert JSON to CSV-like or YAML-like format
    const yaml = jsonToYaml(parsed, 0);
    setOutput(yaml);
  };

  const sortObjectKeys = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(sortObjectKeys);
    if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).sort().reduce((acc: any, key) => {
        acc[key] = sortObjectKeys(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  };

  const getStats = (raw: string, obj: any) => {
    const str = JSON.stringify(obj);
    return {
      keys: (str.match(/"/g) || []).length / 2,
      objects: (str.match(/\{/g) || []).length,
      arrays: (str.match(/\[/g) || []).length,
      strings: (str.match(/:\s*"/g) || []).length,
      numbers: (str.match(/:\s*\d/g) || []).length,
      booleans: (str.match(/:\s*(true|false)/g) || []).length,
      nulls: (str.match(/:\s*null/g) || []).length,
      depth: Math.max(...raw.split('\n').map(l => l.match(/^\s+/)?.[0].length || 0)) / 2,
    };
  };

  const jsonToYaml = (obj: any, depth: number): string => {
    const indent = '  '.repeat(depth);
    if (Array.isArray(obj)) {
      return obj.map(item => `${indent}- ${typeof item === 'object' ? '\n' + jsonToYaml(item, depth + 1) : JSON.stringify(item)}`).join('\n');
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).map(([k, v]) => {
        if (typeof v === 'object' && v !== null) {
          return `${indent}${k}:\n${jsonToYaml(v, depth + 1)}`;
        }
        return `${indent}${k}: ${v === null ? 'null' : typeof v === 'string' ? `"${v}"` : v}`;
      }).join('\n');
    }
    return `${indent}${obj}`;
  };

  const handleAction = () => {
    if (!input.trim()) {
      setError('Please enter JSON to process');
      return;
    }
    switch (activeTab) {
      case 'format': handleFormat(); break;
      case 'minify': handleMinify(); break;
      case 'validate': handleValidate(); break;
      case 'convert': handleConvert(); break;
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const tabs: { id: Tab; label: string; desc: string }[] = [
    { id: 'format', label: '✨ Format', desc: 'Beautify JSON' },
    { id: 'minify', label: '📦 Minify', desc: 'Compress JSON' },
    { id: 'validate', label: '✅ Validate', desc: 'Check validity' },
    { id: 'convert', label: '🔄 To YAML', desc: 'Convert to YAML' },
  ];

  return (
    <ToolPageLayout toolId="ai-json-formatter">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeTab === tab.id
                ? 'bg-[#39FF14] text-black'
                : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-white text-sm">JSON Input</h2>
            <div className="flex gap-2">
              <button
                onClick={() => { setInput(SAMPLE_JSON); setError(''); setValid(null); }}
                className="text-xs text-[#39FF14] hover:text-[#2de010] transition-colors"
              >
                Load Sample
              </button>
              {input && (
                <button onClick={() => { setInput(''); setOutput(''); setError(''); setValid(null); }} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); setValid(null); setError(''); }}
            placeholder={`Paste your JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 30\n}`}
            rows={16}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none font-mono text-sm resize-none transition-all text-white placeholder-white/25 ${
              valid === true ? 'border-[#39FF14]/40 bg-[#39FF14]/5' :
              valid === false ? 'border-red-500/40 bg-red-500/5' :
              'border-white/10 bg-white/5'
            }`}
            spellCheck={false}
          />

          {/* Validation Status */}
          {valid !== null && (
            <div className={`flex items-center gap-2 mt-2 text-sm ${valid ? 'text-[#39FF14]' : 'text-red-400'}`}>
              {valid ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {valid ? '✅ Valid JSON' : `❌ ${error}`}
            </div>
          )}
          {error && valid === false && !input && (
            <div className="flex items-center gap-2 mt-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Options */}
          {activeTab === 'format' && (
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <label className="text-white/40 text-xs">Indent:</label>
                <select
                  value={indent}
                  onChange={e => setIndent(Number(e.target.value))}
                  className="border border-white/10 bg-white/5 rounded-lg px-2 py-1 text-xs text-white [&>option]:bg-[#1a1a1a]"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="1">1 tab</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={sortKeys} onChange={e => setSortKeys(e.target.checked)} className="accent-[#39FF14]" />
                <span className="text-white/40 text-xs">Sort keys</span>
              </label>
            </div>
          )}

          <button
            onClick={handleAction}
            className="w-full mt-4 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            <FileJson className="w-4 h-4" />
            {tabs.find(t => t.id === activeTab)?.label.split(' ')[1]} JSON
          </button>
        </div>

        {/* Output */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-white text-sm">Output</h2>
            {output && (
              <button onClick={() => handleCopy(output, 'output')} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                {copied === 'output' ? <Check className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4" />}
                {copied === 'output' ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {output ? (
            <div className="relative">
              <pre className="bg-black border border-[#39FF14]/10 text-[#39FF14] rounded-xl p-4 text-xs font-mono overflow-auto max-h-[400px] whitespace-pre-wrap">
                {output}
              </pre>
              <div className="mt-2 flex gap-3 text-xs text-white/30">
                <span>{output.length} bytes</span>
                <span>{output.split('\n').length} lines</span>
              </div>
            </div>
          ) : (
            <div className="bg-black border border-white/5 rounded-xl p-4 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <FileJson className="w-10 h-10 text-white/10 mx-auto mb-2" />
                <p className="text-white/25 text-sm">Formatted output will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* JSON Cheatsheet */}
      <div className="mt-6 bg-[#111111] border border-white/8 rounded-2xl p-6">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm"><FileJson className="w-4 h-4 text-cyan-400" /> JSON Quick Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          {[
            { type: 'String', example: '"Hello World"', color: 'text-[#39FF14]' },
            { type: 'Number', example: '42 or 3.14', color: 'text-yellow-400' },
            { type: 'Boolean', example: 'true or false', color: 'text-blue-400' },
            { type: 'Null', example: 'null', color: 'text-red-400' },
            { type: 'Object', example: '{"key": "value"}', color: 'text-purple-400' },
            { type: 'Array', example: '[1, 2, 3]', color: 'text-cyan-400' },
            { type: 'Nested', example: '{"a": {"b": 1}}', color: 'text-pink-400' },
            { type: 'Array of objects', example: '[{"id":1}]', color: 'text-orange-400' },
          ].map(item => (
            <div key={item.type} className="bg-white/3 border border-white/5 rounded-lg p-3">
              <div className="text-white/30 mb-1">{item.type}</div>
              <code className={item.color}>{item.example}</code>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}