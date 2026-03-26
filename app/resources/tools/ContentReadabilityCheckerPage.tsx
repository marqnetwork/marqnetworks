import { useState, useMemo } from 'react';
import { BookOpen, Zap } from 'lucide-react';
import { AIEnhanceButton } from '../../components/AIEnhanceButton';
import { ToolPageLayout } from '../../components/ToolPageLayout';

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyzeReadability(text: string) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.replace(/[^a-zA-Z0-9]/g, '').length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const paragraphCount = Math.max(1, paragraphs.length);
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;

  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const avgSyllablesPerWord = wordCount > 0 ? syllables / wordCount : 0;
  const avgWordsPerSentence = wordCount / sentenceCount;

  // Complex words (3+ syllables)
  const complexWords = words.filter(w => countSyllables(w) >= 3);
  const complexWordPct = wordCount > 0 ? (complexWords.length / wordCount) * 100 : 0;

  // Long sentences (20+ words)
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length >= 20);
  const longSentencePct = sentenceCount > 0 ? (longSentences.length / sentenceCount) * 100 : 0;

  // Passive voice estimation (simple heuristic)
  const passivePatterns = /\b(was|were|is|are|been|being|be)\s+\w+ed\b/gi;
  const passiveMatches = text.match(passivePatterns) || [];
  const passiveVoicePct = sentenceCount > 0 ? (passiveMatches.length / sentenceCount) * 100 : 0;

  // Transition words
  const transitions = ['however','therefore','furthermore','moreover','consequently','nevertheless','meanwhile','additionally','in addition','on the other hand','for example','in contrast','similarly','likewise','as a result','in conclusion','finally','first','second','third','next','then','also','besides','indeed','certainly','clearly','obviously','undoubtedly'];
  const transitionCount = transitions.reduce((count, t) => {
    const regex = new RegExp(`\\b${t}\\b`, 'gi');
    return count + (text.match(regex) || []).length;
  }, 0);
  const transitionPct = sentenceCount > 0 ? (transitionCount / sentenceCount) * 100 : 0;

  // Flesch Reading Ease
  const fleschEase = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  const fleschEaseClamped = Math.max(0, Math.min(100, fleschEase));

  // Flesch-Kincaid Grade Level
  const fleschKincaid = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
  const gradeLevel = Math.max(1, Math.min(18, Math.round(fleschKincaid)));

  // Gunning Fog Index
  const fogIndex = 0.4 * (avgWordsPerSentence + complexWordPct);

  // Reading time (avg 200 wpm)
  const readingTimeMin = Math.ceil(wordCount / 200);
  const speakingTimeMin = Math.ceil(wordCount / 130);

  // Grade label
  const gradeLevelLabel = gradeLevel <= 5 ? 'Elementary' : gradeLevel <= 8 ? 'Middle School' : gradeLevel <= 12 ? 'High School' : 'College';
  const easeLabel = fleschEaseClamped >= 80 ? 'Very Easy' : fleschEaseClamped >= 60 ? 'Easy' : fleschEaseClamped >= 40 ? 'Moderate' : fleschEaseClamped >= 20 ? 'Difficult' : 'Very Difficult';
  const easeColor = fleschEaseClamped >= 60 ? '#39FF14' : fleschEaseClamped >= 40 ? '#fbbf24' : '#ef4444';

  return {
    wordCount, sentenceCount, paragraphCount, charCount, charCountNoSpaces,
    avgWordsPerSentence, avgSyllablesPerWord, complexWordPct, longSentencePct,
    passiveVoicePct, transitionPct,
    fleschEase: fleschEaseClamped, fleschKincaid: gradeLevel, fogIndex,
    readingTimeMin, speakingTimeMin,
    gradeLevelLabel, easeLabel, easeColor,
    complexWords, longSentences: longSentences.length,
  };
}

export function ContentReadabilityCheckerPage() {
  const [text, setText] = useState('');
  const analysis = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length >= 3 ? analyzeReadability(text) : null, [text]);

  return (
    <ToolPageLayout toolId="content-readability-checker">
        <div className="grid md:grid-cols-5 gap-4">
          {/* Input */}
          <div className="md:col-span-3 bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs text-white/40 uppercase tracking-wider">Paste Your Content</label>
              {text.trim() && <span className="text-xs text-white/25">{text.split(/\s+/).filter(Boolean).length} words</span>}
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your blog post, article, email copy, or any content here to analyze its readability..."
              rows={16}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm resize-none leading-relaxed"
            />
          </div>

          {/* Results Sidebar */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {analysis ? (
              <>
                {/* Reading Ease */}
                <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 text-center">
                  <p className="text-xs text-white/40 mb-3 uppercase tracking-wider">Flesch Reading Ease</p>
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                      <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
                      <circle cx="48" cy="48" r="40" fill="none" stroke={analysis.easeColor} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(analysis.fleschEase / 100) * 251.3} 251.3`} className="transition-all duration-700" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black text-white">{Math.round(analysis.fleschEase)}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: analysis.easeColor }}>{analysis.easeLabel}</p>
                </div>

                {/* Grade Level */}
                <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-white/30">Grade Level</p>
                      <p className="text-2xl font-black text-white mt-1">{analysis.fleschKincaid}</p>
                      <p className="text-xs text-white/40">{analysis.gradeLevelLabel}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/30">Fog Index</p>
                      <p className="text-2xl font-black text-white mt-1">{analysis.fogIndex.toFixed(1)}</p>
                      <p className="text-xs text-white/40">{analysis.fogIndex <= 12 ? 'Readable' : 'Complex'}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                  <h3 className="font-semibold text-white text-sm mb-3">Statistics</h3>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                    {[
                      ['Words', analysis.wordCount],
                      ['Sentences', analysis.sentenceCount],
                      ['Paragraphs', analysis.paragraphCount],
                      ['Characters', analysis.charCount.toLocaleString()],
                      ['Avg Words/Sentence', analysis.avgWordsPerSentence.toFixed(1)],
                      ['Avg Syllables/Word', analysis.avgSyllablesPerWord.toFixed(2)],
                      ['Reading Time', `${analysis.readingTimeMin} min`],
                      ['Speaking Time', `${analysis.speakingTimeMin} min`],
                    ].map(([label, val]) => (
                      <div key={label as string} className="flex justify-between">
                        <span className="text-white/40">{label}</span>
                        <span className="text-white/70 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Metrics */}
                <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                  <h3 className="font-semibold text-white text-sm mb-3">Writing Quality</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: 'Complex Words', pct: analysis.complexWordPct, target: '< 15%', good: analysis.complexWordPct < 15, color: '#a78bfa' },
                      { label: 'Long Sentences', pct: analysis.longSentencePct, target: '< 25%', good: analysis.longSentencePct < 25, color: '#f472b6' },
                      { label: 'Passive Voice', pct: analysis.passiveVoicePct, target: '< 15%', good: analysis.passiveVoicePct < 15, color: '#fbbf24' },
                      { label: 'Transition Words', pct: analysis.transitionPct, target: '> 25%', good: analysis.transitionPct > 25, color: '#34d399' },
                    ].map(m => (
                      <div key={m.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/50">{m.label}</span>
                          <span className={m.good ? 'text-[#39FF14]' : 'text-white/40'}>
                            {m.pct.toFixed(1)}% <span className="text-white/20">(target {m.target})</span>
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, m.pct)}%`, backgroundColor: m.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 flex flex-col items-center justify-center text-center py-20">
                <BookOpen className="w-10 h-10 text-white/10 mb-3" />
                <p className="text-white/25 text-xs">Paste at least 3 words to see analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Enhance */}
        {analysis && (
          <div className="mt-4 bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#39FF14]" />
              <h3 className="font-semibold text-white text-sm">AI Readability Improvements</h3>
            </div>
            <p className="text-xs text-white/40 mb-3">Get AI suggestions to simplify complex sentences and improve readability.</p>
            <AIEnhanceButton
              prompt={`Analyze this content's readability and provide specific improvement suggestions:\n\nFlesch Reading Ease: ${Math.round(analysis.fleschEase)} (${analysis.easeLabel})\nGrade Level: ${analysis.fleschKincaid} (${analysis.gradeLevelLabel})\nAvg words/sentence: ${analysis.avgWordsPerSentence.toFixed(1)}\nComplex words: ${analysis.complexWordPct.toFixed(1)}%\nPassive voice: ${analysis.passiveVoicePct.toFixed(1)}%\n\nContent (first 500 chars): "${text.slice(0, 500)}"\n\nProvide:\n1. Top 3 specific sentences that should be simplified (rewrite them)\n2. Complex words that could be replaced with simpler alternatives\n3. Passive voice instances to convert to active voice\n4. Overall readability improvement tips`}
              systemPrompt="You are a content editor specializing in readability optimization. Help simplify content while preserving meaning. Target 8th grade reading level for web content."
              buttonLabel="Get AI Improvement Suggestions"
            />
          </div>
        )}
    </ToolPageLayout>
  );
}