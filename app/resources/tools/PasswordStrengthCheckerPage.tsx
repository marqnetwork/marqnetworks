import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
export function PasswordStrengthCheckerPage() {
  const [pw, setPw] = useState('');
  const checks = [
    { label: 'At least 8 characters', pass: pw.length >= 8 },
    { label: 'At least 12 characters (recommended)', pass: pw.length >= 12 },
    { label: 'Contains uppercase letter', pass: /[A-Z]/.test(pw) },
    { label: 'Contains lowercase letter', pass: /[a-z]/.test(pw) },
    { label: 'Contains number', pass: /[0-9]/.test(pw) },
    { label: 'Contains special character', pass: /[^A-Za-z0-9]/.test(pw) },
    { label: 'No common patterns (123, abc, qwerty)', pass: pw.length > 0 && !/(?:123|abc|qwerty|password|letmein)/i.test(pw) },
  ];
  const score = checks.filter(c => c.pass).length;
  const strength = score <= 2 ? { label: 'Very Weak', color: '#ef4444', percent: 15 } : score <= 3 ? { label: 'Weak', color: '#f97316', percent: 30 } : score <= 4 ? { label: 'Fair', color: '#fbbf24', percent: 50 } : score <= 5 ? { label: 'Strong', color: '#34d399', percent: 75 } : { label: 'Very Strong', color: '#39FF14', percent: 100 };
  const entropy = pw.length * Math.log2(((/[a-z]/.test(pw) ? 26 : 0) + (/[A-Z]/.test(pw) ? 26 : 0) + (/[0-9]/.test(pw) ? 10 : 0) + (/[^A-Za-z0-9]/.test(pw) ? 32 : 0)) || 1);
  const crackTime = entropy < 28 ? 'Instantly' : entropy < 36 ? 'Minutes' : entropy < 60 ? 'Hours to Days' : entropy < 80 ? 'Years' : 'Centuries+';
  return (
    <ToolPageLayout toolId="password-strength-checker">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Enter Password</label>
          <input type="text" value={pw} onChange={e => setPw(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="Type a password to check..." />
          {pw && (
            <>
              <div className="mt-4 mb-2 flex items-center justify-between"><span className="text-xs font-bold" style={{ color: strength.color }}>{strength.label}</span><span className="text-xs text-white/30">{score}/7</span></div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${strength.percent}%`, backgroundColor: strength.color }} /></div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/3 border border-white/5 rounded-lg p-3"><p className="text-xs text-white/40">Entropy</p><p className="text-sm font-bold text-white">{Math.round(entropy)} bits</p></div>
                <div className="bg-white/3 border border-white/5 rounded-lg p-3"><p className="text-xs text-white/40">Time to Crack</p><p className="text-sm font-bold text-white">{crackTime}</p></div>
              </div>
            </>
          )}
        </div>
        {pw && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-2">
            {checks.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                {c.pass ? <CheckCircle2 className="w-4 h-4 text-[#39FF14]" /> : <XCircle className="w-4 h-4 text-white/20" />}
                <span className={`text-xs ${c.pass ? 'text-white/70' : 'text-white/30'}`}>{c.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
