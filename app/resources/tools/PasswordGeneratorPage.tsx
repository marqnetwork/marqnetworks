import { useState, useCallback } from 'react';
import { Lock, Copy, Check, RefreshCw, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

function generatePassword(length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean; excludeAmbiguous: boolean }): string {
  let chars = '';
  if (opts.upper) chars += opts.excludeAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (opts.lower) chars += opts.excludeAmbiguous ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
  if (opts.numbers) chars += opts.excludeAmbiguous ? '23456789' : '0123456789';
  if (opts.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, x => chars[x % chars.length]).join('');
}

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', color: 'text-red-400' };
  if (score <= 4) return { score, label: 'Fair', color: 'text-yellow-400' };
  if (score <= 5) return { score, label: 'Good', color: 'text-blue-400' };
  return { score, label: 'Strong', color: 'text-[#39FF14]' };
}

export function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [count, setCount] = useState(1);

  const opts = { upper, lower, numbers, symbols, excludeAmbiguous };

  const generate = useCallback(() => {
    const generated = Array.from({ length: count }, () => generatePassword(length, opts));
    setPassword(generated[0]);
    setPasswords(generated);
  }, [length, upper, lower, numbers, symbols, excludeAmbiguous, count]);

  const handleCopy = (pwd: string, id: string) => {
    navigator.clipboard.writeText(pwd);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const strength = password ? getStrength(password) : null;
  const StrengthIcon = strength?.score && strength.score > 5 ? ShieldCheck : strength?.score && strength.score > 3 ? Shield : ShieldAlert;

  return (
    <ToolPageLayout toolId="password-generator">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Config */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white mb-5 text-sm">Password Settings</h2>

          {/* Length */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-xs text-white/50 uppercase tracking-wider">Password Length</label>
              <span className="text-xs font-bold text-[#39FF14]">{length} characters</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="w-full accent-[#39FF14]"
            />
            <div className="flex justify-between text-xs text-white/25 mt-0.5">
              <span>4</span><span>64</span>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-6">
            <h3 className="text-xs text-white/50 uppercase tracking-wider">Character Types</h3>
            {[
              { label: 'Uppercase Letters (A–Z)', value: upper, onChange: setUpper },
              { label: 'Lowercase Letters (a–z)', value: lower, onChange: setLower },
              { label: 'Numbers (0–9)', value: numbers, onChange: setNumbers },
              { label: 'Special Characters (!@#$...)', value: symbols, onChange: setSymbols },
              { label: 'Exclude Ambiguous (0/O, 1/l/I)', value: excludeAmbiguous, onChange: setExcludeAmbiguous },
            ].map(opt => (
              <label key={opt.label} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={opt.value}
                  onChange={e => opt.onChange(e.target.checked)}
                  className="w-4 h-4 accent-[#39FF14] rounded"
                />
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Generate Count */}
          <div className="mb-5">
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Generate Multiple</label>
            <select
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white text-sm [&>option]:bg-[#1a1a1a]"
              style={{ colorScheme: 'dark' }}
            >
              <option value="1">1 password</option>
              <option value="5">5 passwords</option>
              <option value="10">10 passwords</option>
              <option value="20">20 passwords</option>
            </select>
          </div>

          <button
            onClick={generate}
            className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Password{count > 1 ? 's' : ''}
          </button>
        </div>

        {/* Output */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white mb-5 text-sm">Generated Passwords</h2>

          {passwords.length > 0 ? (
            <div className="flex flex-col gap-3">
              {passwords.map((pwd, i) => {
                const str = getStrength(pwd);
                const pid = `pwd-${i}`;
                return (
                  <div key={pid} className="bg-white/3 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="flex-1 text-sm font-mono text-white/80 break-all">{pwd}</code>
                      <button
                        onClick={() => handleCopy(pwd, pid)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                      >
                        {copied === pid ? <Check className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4 text-white/40" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5, 6, 7].map(n => (
                          <div
                            key={n}
                            className={`h-1 w-4 rounded-full ${n <= str.score
                              ? str.score <= 2 ? 'bg-red-400' : str.score <= 4 ? 'bg-yellow-400' : str.score <= 5 ? 'bg-blue-400' : 'bg-[#39FF14]'
                              : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-medium ${str.color}`}>{str.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/25 text-xs">Click Generate to create secure passwords</p>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-[#111111] border border-white/8 rounded-2xl p-6">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-[#39FF14]" /> Password Security Tips
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            '✅ Use 16+ characters for accounts',
            '✅ Never reuse passwords',
            '✅ Use a password manager (1Password, Bitwarden)',
            '✅ Enable 2FA wherever possible',
            '❌ Never use personal info (name, birthdate)',
            '❌ Avoid dictionary words or common phrases',
          ].map((tip, i) => (
            <p key={i} className="text-xs text-white/40">{tip}</p>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
