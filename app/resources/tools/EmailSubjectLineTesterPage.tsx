import { useState, useMemo } from 'react';
import { Mail, Zap } from 'lucide-react';
import { AIEnhanceButton } from '../../components/AIEnhanceButton';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const SPAM_WORDS = new Set(['free','winner','congratulations','click here','act now','limited time','urgent','order now','buy now','earn money','cash','credit','discount','no cost','guarantee','no obligation','risk free','subscribe','unsubscribe','offer','deal','bargain','bonus','lowest price','save big','100%','million','billion','prize','selected','chosen','claim','apply now','call now','visit','compare rates','double your','increase','incredible deal','luxury','once in a lifetime','promise','satisfaction','special promotion','while supplies last']);

const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2702}-\u{27B0}\u{24C2}-\u{1F251}]/gu;

function analyzeSubject(subject: string) {
  const words = subject.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = subject.length;
  const lowerWords = words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''));

  // Spam words
  const spamWordsFound = lowerWords.filter(w => SPAM_WORDS.has(w));
  const spamScore = Math.min(100, spamWordsFound.length * 20);

  // Personalization
  const hasPersonalization = /\{.*?\}|\[.*?\]/.test(subject) || subject.toLowerCase().includes('you') || subject.toLowerCase().includes('your');

  // Urgency
  const urgencyWords = ['now','today','hurry','last','final','ending','deadline','tomorrow','tonight','limited','expires','soon','quick','fast','immediately'];
  const hasUrgency = lowerWords.some(w => urgencyWords.includes(w));

  // Curiosity
  const curiosityWords = ['secret','surprising','unexpected','weird','strange','shocking','revealed','truth','hidden','what','why','how','discover'];
  const hasCuriosity = lowerWords.some(w => curiosityWords.includes(w));

  // Number
  const hasNumber = /\d/.test(subject);

  // Emoji
  const hasEmoji = EMOJI_REGEX.test(subject);

  // Question
  const isQuestion = subject.trim().endsWith('?');

  // ALL CAPS words
  const capsWords = words.filter(w => w.length > 1 && w === w.toUpperCase() && /[A-Z]/.test(w));
  const hasTooManyCaps = capsWords.length > 1;

  // Exclamation marks
  const exclamCount = (subject.match(/!/g) || []).length;
  const tooManyExclam = exclamCount > 1;

  // Preview text length
  const previewFit = charCount <= 50;

  // Calculate scores
  let openRateScore = 50;

  // Length scoring (ideal 28-50 chars, 4-9 words)
  if (charCount >= 28 && charCount <= 50) openRateScore += 12;
  else if (charCount >= 20 && charCount <= 60) openRateScore += 6;
  else if (charCount > 80) openRateScore -= 8;

  if (wordCount >= 4 && wordCount <= 9) openRateScore += 8;
  else if (wordCount >= 3 && wordCount <= 12) openRateScore += 4;

  if (hasPersonalization) openRateScore += 8;
  if (hasUrgency) openRateScore += 6;
  if (hasCuriosity) openRateScore += 7;
  if (hasNumber) openRateScore += 5;
  if (isQuestion) openRateScore += 4;
  if (hasEmoji) openRateScore += 3;

  // Penalties
  if (spamWordsFound.length > 0) openRateScore -= spamWordsFound.length * 5;
  if (hasTooManyCaps) openRateScore -= 8;
  if (tooManyExclam) openRateScore -= 6;

  openRateScore = Math.max(0, Math.min(100, openRateScore));

  const deliverabilityScore = Math.max(0, 100 - spamScore - (hasTooManyCaps ? 15 : 0) - (tooManyExclam ? 10 : 0));

  const grade = openRateScore >= 80 ? 'A' : openRateScore >= 65 ? 'B' : openRateScore >= 50 ? 'C' : openRateScore >= 35 ? 'D' : 'F';
  const gradeColor = openRateScore >= 80 ? 'text-[#39FF14]' : openRateScore >= 65 ? 'text-blue-400' : openRateScore >= 50 ? 'text-yellow-400' : openRateScore >= 35 ? 'text-orange-400' : 'text-red-400';
  const ringColor = openRateScore >= 80 ? '#39FF14' : openRateScore >= 65 ? '#60a5fa' : openRateScore >= 50 ? '#fbbf24' : openRateScore >= 35 ? '#fb923c' : '#ef4444';

  return {
    wordCount, charCount, openRateScore, deliverabilityScore, grade, gradeColor, ringColor,
    spamWordsFound, hasPersonalization, hasUrgency, hasCuriosity, hasNumber, hasEmoji,
    isQuestion, hasTooManyCaps, tooManyExclam, previewFit, spamScore,
  };
}

export function EmailSubjectLineTesterPage() {
  const [subject, setSubject] = useState('');
  const analysis = useMemo(() => subject.trim() ? analyzeSubject(subject) : null, [subject]);

  return (
    <ToolPageLayout toolId="email-subject-line-tester">
      {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 mb-6">
          <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Subject Line</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder='e.g. Your 7-step plan to double email revenue is here'
            className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
          />
          {/* Email Preview */}
          {subject.trim() && (
            <div className="mt-4 bg-white/3 border border-white/5 rounded-xl p-4">
              <p className="text-xs text-white/25 mb-2">Inbox Preview</p>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#60a5fa]/20 flex items-center justify-center shrink-0 text-xs text-[#60a5fa] font-bold">M</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/80 font-semibold">MarQ Networks</span>
                    <span className="text-xs text-white/25">10:30 AM</span>
                  </div>
                  <p className="text-sm text-white/60 truncate">{subject}</p>
                  <p className="text-xs text-white/25 truncate mt-0.5">Preview text would appear here to provide additional context...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {analysis && (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Scores */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <h3 className="font-semibold text-white text-sm mb-4 text-center">Open Rate Potential</h3>
              <div className="flex justify-center mb-4">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle cx="56" cy="56" r="48" fill="none" stroke={analysis.ringColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(analysis.openRateScore / 100) * 301.6} 301.6`} className="transition-all duration-700" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${analysis.gradeColor}`}>{analysis.openRateScore}</span>
                    <span className="text-xs text-white/30">/ 100</span>
                  </div>
                </div>
              </div>
              <p className={`text-center text-sm font-semibold ${analysis.gradeColor}`}>Grade: {analysis.grade}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Words</p>
                  <p className={`text-sm font-semibold ${analysis.wordCount >= 4 && analysis.wordCount <= 9 ? 'text-[#39FF14]' : 'text-white/60'}`}>{analysis.wordCount}</p>
                </div>
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Characters</p>
                  <p className={`text-sm font-semibold ${analysis.charCount >= 28 && analysis.charCount <= 50 ? 'text-[#39FF14]' : 'text-white/60'}`}>{analysis.charCount}</p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <h3 className="font-semibold text-white text-sm mb-4">Engagement Factors</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Personalization (you/your)', pass: analysis.hasPersonalization, weight: '+8' },
                  { label: 'Creates Urgency', pass: analysis.hasUrgency, weight: '+6' },
                  { label: 'Sparks Curiosity', pass: analysis.hasCuriosity, weight: '+7' },
                  { label: 'Contains a Number', pass: analysis.hasNumber, weight: '+5' },
                  { label: 'Asks a Question', pass: analysis.isQuestion, weight: '+4' },
                  { label: 'Uses Emoji', pass: analysis.hasEmoji, weight: '+3' },
                  { label: 'Fits Preview (≤50 chars)', pass: analysis.previewFit, weight: '+5' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${s.pass ? 'bg-[#39FF14]/15 text-[#39FF14]' : 'bg-white/5 text-white/20'}`}>
                        {s.pass ? '✓' : '✗'}
                      </span>
                      <span className="text-white/50">{s.label}</span>
                    </div>
                    <span className={`font-mono ${s.pass ? 'text-[#39FF14]/50' : 'text-white/15'}`}>{s.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spam / Deliverability */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <h3 className="font-semibold text-white text-sm mb-4">Deliverability</h3>
              <div className={`rounded-xl p-4 mb-4 border ${analysis.deliverabilityScore >= 80 ? 'bg-[#39FF14]/5 border-[#39FF14]/20' : analysis.deliverabilityScore >= 50 ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <p className="text-xs text-white/40 mb-1">Deliverability Score</p>
                <p className={`text-2xl font-black ${analysis.deliverabilityScore >= 80 ? 'text-[#39FF14]' : analysis.deliverabilityScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {analysis.deliverabilityScore}/100
                </p>
              </div>

              <h4 className="text-xs text-white/40 uppercase tracking-wider mb-2">Red Flags</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Spam Trigger Words', bad: analysis.spamWordsFound.length > 0, detail: analysis.spamWordsFound.length > 0 ? analysis.spamWordsFound.join(', ') : 'None found' },
                  { label: 'Excessive CAPS', bad: analysis.hasTooManyCaps, detail: analysis.hasTooManyCaps ? 'Multiple ALL-CAPS words' : 'OK' },
                  { label: 'Too Many Exclamations', bad: analysis.tooManyExclam, detail: analysis.tooManyExclam ? `${(subject.match(/!/g) || []).length} exclamation marks` : 'OK' },
                ].map(f => (
                  <div key={f.label} className={`text-xs rounded-lg p-2 ${f.bad ? 'bg-red-500/5 border border-red-500/15' : 'bg-white/3'}`}>
                    <div className="flex items-center gap-1.5">
                      <span className={f.bad ? 'text-red-400' : 'text-[#39FF14]'}>{f.bad ? '⚠' : '✓'}</span>
                      <span className={f.bad ? 'text-red-400/80' : 'text-white/50'}>{f.label}</span>
                    </div>
                    <p className="text-white/30 mt-0.5 ml-5">{f.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Enhance */}
        {analysis && (
          <div className="mt-4 bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#39FF14]" />
              <h3 className="font-semibold text-white text-sm">Generate Better Subject Lines</h3>
            </div>
            <p className="text-xs text-white/40 mb-3">AI can generate 5 optimized alternatives based on your subject line's analysis.</p>
            <AIEnhanceButton
              prompt={`Generate 5 improved email subject line variations for: "${subject}"\n\nCurrent score: ${analysis.openRateScore}/100. Deliverability: ${analysis.deliverabilityScore}/100.\nStrengths: ${[analysis.hasPersonalization && 'personalization', analysis.hasUrgency && 'urgency', analysis.hasCuriosity && 'curiosity', analysis.hasNumber && 'number'].filter(Boolean).join(', ') || 'none detected'}.\nWeaknesses: ${[!analysis.hasPersonalization && 'no personalization', !analysis.hasUrgency && 'no urgency', analysis.spamWordsFound.length > 0 && 'spam words'].filter(Boolean).join(', ')}.\n\nFor each variation, explain what makes it better. Aim for 28-50 characters, include power words, and avoid spam triggers.`}
              systemPrompt="You are an email marketing expert specializing in subject lines that maximize open rates while maintaining high deliverability."
              buttonLabel="Generate AI Subject Lines"
            />
          </div>
        )}
    </ToolPageLayout>
  );
}