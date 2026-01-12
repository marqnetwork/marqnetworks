"use client";
import { useState, useMemo } from "react";
import "./word-counter.css";

// Word Counter — MarQ Networks Resource
// Features: Word count, character count, paragraph count, sentence count, reading time

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        paragraphs: 0,
        sentences: 0,
        readingTime: 0
      };
    }

    const words = trimmedText.split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim().length > 0).length;
    const sentences = trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Average reading speed: 200 words per minute
    const readingTime = Math.ceil(words / 200);

    return {
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      sentences,
      readingTime
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="wc-container">
      {/* Hero Section */}
      <section className="wc-hero-section">
        <div className="wc-hero-container">
          <div className="wc-hero-tag">
            <span className="wc-year">Free Tool</span>
            <span className="wc-tag-text">Resources</span>
          </div>

          <h1 className="wc-hero-heading">
            Online <span>Word Counter</span> Tool
          </h1>

          <p className="wc-hero-subtext">
            A simple, powerful tool to count words, characters, sentences, and paragraphs in real-time. 
            Perfect for writers, SEO professionals, and content creators.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="wc-tool-section">
        <div className="wc-tool-wrapper">
          <div className="wc-controls">
            <button onClick={handleCopy} className="wc-btn wc-btn-secondary" disabled={!text}>
              Copy Text
            </button>
            <button onClick={handleClear} className="wc-btn wc-btn-secondary" disabled={!text}>
              Clear
            </button>
          </div>

          <div className="wc-textarea-container">
            <textarea
              className="wc-textarea"
              placeholder="Type or paste your text here to begin counting..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck="false"
            />
          </div>

          <div className="wc-stats-grid">
            <div className="wc-stat-card">
              <div className="wc-stat-value">{stats.words}</div>
              <div className="wc-stat-label">Words</div>
            </div>
            <div className="wc-stat-card">
              <div className="wc-stat-value">{stats.characters}</div>
              <div className="wc-stat-label">Characters</div>
            </div>
            <div className="wc-stat-card">
              <div className="wc-stat-value">{stats.charactersNoSpaces}</div>
              <div className="wc-stat-label">Char (No Spaces)</div>
            </div>
            <div className="wc-stat-card">
              <div className="wc-stat-value">{stats.paragraphs}</div>
              <div className="wc-stat-label">Paragraphs</div>
            </div>
            <div className="wc-stat-card">
              <div className="wc-stat-value">{stats.sentences}</div>
              <div className="wc-stat-label">Sentences</div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="wc-info-section">
        <h2>About Word Counter Tool</h2>
        <p>
          If you work with text and copywriting a lot, such as writers, students, bloggers, journalists, and anyone who needs to keep track of the number of words in their text, count the words, paragraphs, or even the characters in your documents, you want to use a Word Counter tool.
        </p>
        <p>
          MarQ Networks Word Counter Tool is a free online tool that allows users to count the number of words, paragraphs, characters, and characters with spaces in any given text. Paste the text you want to count and the tool will do the rest.
        </p>

        <h2>How To Use This Tool?</h2>
        <p>
          The tool is easy to use for anyone. All you need to do is copy and paste the text document inside the toolbox. The tool will then count the Words, Characters, and Paragraphs in the text immediately.
        </p>
        <ul>
          <li>Copy the text you want to analyze.</li>
          <li>Paste the text inside the input box above.</li>
          <li>Instantly see your Words, Characters, and Paragraph counts update.</li>
        </ul>

        <h2>Benefits of Using a Word Counter</h2>
        <ul>
          <li><strong>Save Time:</strong> Counting words manually is tedious. Our tool gives you instant results.</li>
          <li><strong>Meet Requirements:</strong> Perfect for assignments or articles with strict word count limits.</li>
          <li><strong>Analyze Structure:</strong> Get insights into your writing's complexity and length.</li>
        </ul>
      </section>
    </div>
  );
}
