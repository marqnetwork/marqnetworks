"use client";
import { useState, useEffect } from "react";
import "./random-word-generator.css";
import { RelatedToolsSection } from "../../components/RelatedToolsSection";

// Random Word Generator — MarQ Networks Tool

type WordCategory = "all" | "nouns" | "verbs" | "adjectives";

interface DatamuseWord {
  word: string;
  tags?: string[];
}

export default function RandomWordGeneratorPage() {
  const [category, setCategory] = useState<WordCategory>("all");
  const [count, setCount] = useState<number>(10);
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate words on mount
  useEffect(() => {
    generateWords();
  }, []);

  const generateWords = async () => {
    setIsLoading(true);
    setCopied(false);
    
    const newWords: string[] = [];
    const maxRetries = 10;
    let attempts = 0;

    try {
      while (newWords.length < count && attempts < maxRetries) {
        attempts++;
        // Random letter to start with to ensure variety
        const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); 
        
        // Fetch from Datamuse API
        // sp=${randomLetter}* : Words starting with the random letter
        // md=p : Get metadata including parts of speech
        // max=500 : Fetch enough candidates
        const response = await fetch(`https://api.datamuse.com/words?sp=${randomLetter}*&md=p&max=500`);
        if (!response.ok) continue;
        
        const data: DatamuseWord[] = await response.json();

        // Filter based on category and validity
        const filtered = data.filter(item => {
          // Filter out phrases (words with spaces or hyphens)
          if (item.word.includes(" ") || item.word.includes("-")) return false;

          // Filter by category
          if (category === "all") return true;
          
          const tags = item.tags || [];
          // Datamuse tags: 'n' = noun, 'v' = verb, 'adj' = adjective
          if (category === "nouns" && tags.includes("n")) return true;
          if (category === "verbs" && tags.includes("v")) return true;
          if (category === "adjectives" && tags.includes("adj")) return true;
          
          return false;
        });

        // Shuffle the filtered results to avoid always getting the most common words
        const shuffled = filtered.sort(() => 0.5 - Math.random());

        // Add valid words to our list
        for (const item of shuffled) {
          if (newWords.length >= count) break;
          // Avoid duplicates
          if (!newWords.includes(item.word)) {
            newWords.push(item.word);
          }
        }
      }
      
      setGeneratedWords(newWords);
    } catch (error) {
      console.error("Failed to fetch words:", error);
      // If API fails, we could show an error or just leave empty
      // Ideally we would have a fallback, but per user request "not locally stored"
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWords.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rwg-container">
      {/* Hero Section */}
      <section className="rwg-hero-section">
        <div className="rwg-hero-container">
          <div className="rwg-hero-tag">
            <span className="rwg-year">Free Tool</span>
            <span className="rwg-tag-text">Tools</span>
          </div>

          <h1 className="rwg-hero-heading">
            Random <span>Word</span> Generator
          </h1>

          <p className="rwg-hero-subtext">
            Discover unique words for writing, brainstorming, or learning. Filter by nouns, verbs, or adjectives to spark your creativity.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="rwg-tool-section">
        <div className="rwg-tool-wrapper">
          {/* Controls */}
          <div className="rwg-controls">
            <div className="rwg-control-group">
              <label>Number of Words</label>
              <input
                type="number"
                className="rwg-input"
                value={count}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setCount(isNaN(val) ? 1 : Math.min(Math.max(1, val), 100));
                }}
                min="1"
                max="100"
              />
            </div>

            <div className="rwg-control-group">
              <label>Word Type</label>
              <select
                className="rwg-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as WordCategory)}
              >
                <option value="all">All Words (Mixed)</option>
                <option value="nouns">Nouns Only</option>
                <option value="verbs">Verbs Only</option>
                <option value="adjectives">Adjectives Only</option>
              </select>
            </div>

            <button 
              className="rwg-btn" 
              onClick={generateWords}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'wait' : 'pointer' }}
            >
              {isLoading ? 'Generating...' : 'Generate Words'}
            </button>
          </div>

          {/* Output */}
          <div className="rwg-output-container">
            <div className="rwg-output-header">
              <span className="rwg-output-count">
                Generated {generatedWords.length} {generatedWords.length === 1 ? 'word' : 'words'}
              </span>
              <button 
                className={`rwg-copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                disabled={generatedWords.length === 0}
              >
                {copied ? 'Copied List!' : 'Copy List'}
              </button>
            </div>
            
            <div className="rwg-words-grid">
              {generatedWords.map((word, index) => (
                <div key={index} className="rwg-word-card">
                  {word}
                </div>
              ))}
              {generatedWords.length === 0 && !isLoading && (
                <div className="rwg-empty-state" style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666", padding: "2rem" }}>
                  Click "Generate Words" to start.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rwg-info-section">
        <h2>What is a Random Word Generator?</h2>
        <p>
          The Random Word Generator is a dynamic free online tool designed to produce words at the click of a button. At its core, it aims to assist users in discovering words they might not encounter in their daily lexicon. Whether you're a writer, an educator seeking new vocabulary for students, or just a curious soul, this tool has something for everyone.
        </p>

        <h2>How to Use</h2>
        <ul>
          <li><strong>Select Count:</strong> Enter the number of words you want to generate (up to 100).</li>
          <li><strong>Choose Category:</strong> Select from All Words, Nouns, Verbs, or Adjectives.</li>
          <li><strong>Generate:</strong> Click the button to get your random list instantly.</li>
        </ul>

        <h2>Why Use This Tool?</h2>
        <p>
          <strong>Boost Creativity:</strong> Break through writer's block by introducing fresh words into your writing process.
          <br/>
          <strong>Educational Tool:</strong> Teachers can use it to introduce new vocabulary to students, making learning fun and engaging.
          <br/>
          <strong>Game Development:</strong> For game developers, it's a handy tool to generate random challenges or naming elements.
        </p>
      </section>

      <RelatedToolsSection currentSlug="random-word-generator" />
    </div>
  );
}
