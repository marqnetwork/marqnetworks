import { useMemo, useState } from 'react';
import { AIEnhanceButton } from '../../components/AIEnhanceButton';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Type, BarChart3, Zap } from 'lucide-react';

const POWER_WORDS = new Set(['free','new','proven','secret','exclusive','limited','guaranteed','instant','discover','unlock','ultimate','essential','surprising','shocking','incredible','powerful','remarkable','revolutionary','you','your','now','today','how','why','best','top','easy','simple','fast','quick','hack','tricks','mistakes','avoid','never','always','must','need','stop','start','transform','boost','skyrocket','double','triple','massive','huge','tiny','little','big','epic','insane','crazy','brilliant','genius','deadly','killer','mind-blowing']);
const EMOTIONAL_WORDS = new Set(['love','hate','fear','joy','angry','happy','sad','excited','anxious','proud','ashamed','grateful','frustrated','curious','surprised','disgusted','inspired','devastated','thrilled','terrified','heartbroken','obsessed','passionate','furious','delighted','worried','confident','lonely','hopeful','desperate']);
const COMMON_WORDS = new Set(['the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','of','in','to','for','with','on','at','by','from','as','into','through','during','before','after','above','below','between','under','this','that','these','those','it','its','and','but','or','so','if','then','than','when','while','where','how','what','which','who','whom','whose']);

function analyzeHeadline(headline: string) {
  const words = headline.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = headline.length;
  const lowerWords = words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''));

  // Power words
  const powerWordsFound = lowerWords.filter(w => POWER_WORDS.has(w));
  const powerWordPct = wordCount > 0 ? (powerWordsFound.length / wordCount) * 100 : 0;

  // Emotional words
  const emotionalWordsFound = lowerWords.filter(w => EMOTIONAL_WORDS.has(w));
  const emotionalPct = wordCount > 0 ? (emotionalWordsFound.length / wordCount) * 100 : 0;

  // Common words
  const commonWordsFound = lowerWords.filter(w => COMMON_WORDS.has(w));
  const commonPct = wordCount > 0 ? (commonWordsFound.length / wordCount) * 100 : 0;

  // Uncommon words
  const uncommonPct = wordCount > 0 ? ((wordCount - commonWordsFound.length - powerWordsFound.length - emotionalWordsFound.length) / wordCount) * 100 : 0;

  // Has number
  const hasNumber = /\d/.test(headline);

  // Starts with number
  const startsWithNumber = /^\d/.test(headline.trim());

  // Contains question
  const isQuestion = headline.trim().endsWith('?');

  // Contains colon (subheadline pattern)
  const hasColon = headline.includes(':');

  // Sentiment
  const posWords = ['best','top','amazing','great','awesome','perfect','excellent','outstanding','incredible','wonderful','brilliant'];
  const negWords = ['worst','bad','terrible','horrible','awful','ugly','disgusting','pathetic','stupid','dumb','never','stop','avoid','mistakes','wrong'];
  const posCount = lowerWords.filter(w => posWords.includes(w)).length;
  const negCount = lowerWords.filter(w => negWords.includes(w)).length;
  const sentiment = posCount > negCount ? 'Positive' : negCount > posCount ? 'Negative' : 'Neutral';

  // Calculate score
  let score = 40; // baseline

  // Word count scoring (ideal 6-12 words)
  if (wordCount >= 6 && wordCount <= 12) score += 15;
  else if (wordCount >= 4 && wordCount <= 15) score += 8;
  else score -= 5;

  // Character count (ideal 50-70 chars)
  if (charCount >= 50 && charCount <= 70) score += 10;
  else if (charCount >= 40 && charCount <= 80) score += 5;

  // Power words
  if (powerWordsFound.length >= 1) score += 10;
  if (powerWordsFound.length >= 2) score += 5;

  // Emotional words
  if (emotionalWordsFound.length >= 1) score += 8;

  // Number presence
  if (hasNumber) score += 7;
  if (startsWithNumber) score += 3;

  // Question or colon
  if (isQuestion) score += 5;
  if (hasColon) score += 3;

  // Common word penalty (too many = boring)
  if (commonPct > 60) score -= 5;

  // Cap score
  score = Math.max(0, Math.min(100, score));

  const grade = score >= 80 ? 'A' : score >= 65 ? 'B' : score >= 50 ? 'C' : score >= 35 ? 'D' : 'F';
  const gradeColor = score >= 80 ? 'text-[#39FF14]' : score >= 65 ? 'text-blue-400' : score >= 50 ? 'text-yellow-400' : score >= 35 ? 'text-orange-400' : 'text-red-400';
  const ringColor = score >= 80 ? '#39FF14' : score >= 65 ? '#60a5fa' : score >= 50 ? '#fbbf24' : score >= 35 ? '#fb923c' : '#ef4444';

  return {
    wordCount, charCount, score, grade, gradeColor, ringColor,
    powerWordsFound, emotionalWordsFound, commonWordsFound,
    powerWordPct, emotionalPct, commonPct, uncommonPct,
    hasNumber, startsWithNumber, isQuestion, hasColon, sentiment,
  };
}

export function HeadlineAnalyzerPage() {
  const [headline, setHeadline] = useState('');
  const analysis = useMemo(() => headline.trim() ? analyzeHeadline(headline) : null, [headline]);

  return (
    <ToolPageLayout toolId="headline-analyzer">
      {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 mb-6">
          <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Enter Your Headline</label>
          <input
            type="text"
            value={headline}
            onChange={e => setHeadline(e.target.value)}
            placeholder="e.g. 10 Proven Email Marketing Strategies That Double Your Revenue"
            className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
          />
        </div>

        {analysis && (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Score */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 flex flex-col items-center justify-center text-center">
              <div className="relative w-28 h-28 mb-4">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle
                    cx="56" cy="56" r="48" fill="none"
                    stroke={analysis.ringColor}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(analysis.score / 100) * 301.6} 301.6`}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-black ${analysis.gradeColor}`}>{analysis.score}</span>
                  <span className="text-xs text-white/30">/ 100</span>
                </div>
              </div>
              <span className={`text-lg font-black ${analysis.gradeColor}`}>Grade: {analysis.grade}</span>
              <p className="text-xs text-white/30 mt-1">
                {analysis.score >= 80 ? 'Excellent headline!' : analysis.score >= 65 ? 'Good — minor tweaks could help' : analysis.score >= 50 ? 'Average — room for improvement' : 'Needs significant improvement'}
              </p>
            </div>

            {/* Word Breakdown */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <h3 className="font-semibold text-white text-sm mb-4">Word Balance</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Common', pct: analysis.commonPct, color: '#94a3b8', ideal: '20-30%' },
                  { label: 'Uncommon', pct: analysis.uncommonPct, color: '#60a5fa', ideal: '10-20%' },
                  { label: 'Power', pct: analysis.powerWordPct, color: '#39FF14', ideal: '10-20%' },
                  { label: 'Emotional', pct: analysis.emotionalPct, color: '#f472b6', ideal: '10-15%' },
                ].map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/50">{b.label} Words</span>
                      <span className="text-white/30">{b.pct.toFixed(0)}% <span className="text-white/15">(ideal {b.ideal})</span></span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, b.pct)}%`, backgroundColor: b.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Words</p>
                  <p className={`text-sm font-semibold ${analysis.wordCount >= 6 && analysis.wordCount <= 12 ? 'text-[#39FF14]' : 'text-white/60'}`}>{analysis.wordCount}</p>
                </div>
                <div className="bg-white/3 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/30">Characters</p>
                  <p className={`text-sm font-semibold ${analysis.charCount >= 50 && analysis.charCount <= 70 ? 'text-[#39FF14]' : 'text-white/60'}`}>{analysis.charCount}</p>
                </div>
              </div>
            </div>

            {/* Signals */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <h3 className="font-semibold text-white text-sm mb-4">Engagement Signals</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Contains Number', pass: analysis.hasNumber },
                  { label: 'Starts with Number', pass: analysis.startsWithNumber },
                  { label: 'Is a Question', pass: analysis.isQuestion },
                  { label: 'Uses Colon/Subhead', pass: analysis.hasColon },
                  { label: 'Has Power Words', pass: analysis.powerWordsFound.length > 0 },
                  { label: 'Has Emotional Words', pass: analysis.emotionalWordsFound.length > 0 },
                  { label: 'Ideal Length (6-12 words)', pass: analysis.wordCount >= 6 && analysis.wordCount <= 12 },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <span className="text-white/50">{s.label}</span>
                    <span className={s.pass ? 'text-[#39FF14]' : 'text-white/20'}>{s.pass ? '✓' : '✗'}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-xs text-white/30">Sentiment</p>
                <p className="text-sm text-white/60 font-medium">{analysis.sentiment}</p>
              </div>

              {analysis.powerWordsFound.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-white/30 mb-1">Power Words Found</p>
                  <div className="flex flex-wrap gap-1">
                    {analysis.powerWordsFound.map((w, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#39FF14]/10 text-[#39FF14] rounded text-xs">{w}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Enhance */}
        {analysis && (
          <div className="mt-4 bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#39FF14]" />
              <h3 className="font-semibold text-white text-sm">Want Better Headlines?</h3>
            </div>
            <p className="text-xs text-white/40 mb-3">AI can generate 5 improved variations based on your headline's analysis.</p>
            <AIEnhanceButton
              prompt={`Analyze this headline and generate 5 improved variations that score higher for engagement. Original headline: "${headline}"\n\nCurrent score: ${analysis.score}/100. Power words: ${analysis.powerWordsFound.length}. Emotional words: ${analysis.emotionalWordsFound.length}. Has number: ${analysis.hasNumber}.\n\nFor each variation, briefly explain why it would perform better. Format as a numbered list.`}
              systemPrompt="You are a headline writing expert specializing in high-converting marketing copy. Generate 5 headline variations that improve engagement, click-through rates, and emotional impact."
              buttonLabel="Generate AI Headlines"
            />
          </div>
        )}
    </ToolPageLayout>
  );
}
