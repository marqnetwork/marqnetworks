"use client";
import { useState, useEffect } from "react";
import "./remove-line-breaks.css";
import { RelatedToolsSection } from "../../components/RelatedToolsSection";

// Remove Line Breaks — MarQ Networks Tool

export default function RemoveLineBreaksPage() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"line_breaks_only" | "all_breaks">("line_breaks_only");
  const [copied, setCopied] = useState<boolean>(false);

  const convertText = () => {
    if (!input) {
      setOutput("");
      return;
    }

    let result = input;

    // Normalize line endings to \n
    result = result.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    if (mode === "line_breaks_only") {
        // 1. Identify paragraphs (2 or more newlines) and temporarily replace them
        const paragraphToken = "___PARAGRAPH_TOKEN___";
        result = result.replace(/\n{2,}/g, paragraphToken);
        
        // 2. Replace remaining single newlines with space
        result = result.replace(/\n/g, " ");
        
        // 3. Restore paragraphs (normalized to double newline)
        result = result.replace(new RegExp(paragraphToken, 'g'), "\n\n");
    } else {
        // Remove all line breaks (replace with space)
        result = result.replace(/\n+/g, " ");
    }
    
    setOutput(result.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="rlb-container">
      {/* Hero Section */}
      <section className="rlb-hero-section">
        <div className="rlb-hero-container">
          <div className="rlb-hero-tag">
            <span className="rlb-year">Free Tool</span>
            <span className="rlb-tag-text">Tools</span>
          </div>

          <h1 className="rlb-hero-heading">
            Remove <span>Line Breaks</span>
          </h1>

          <p className="rlb-hero-subtext">
            Clean up text formatting by removing unwanted line breaks. Perfect for fixing text copied from PDFs, emails, or websites.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="rlb-tool-section">
        <div className="rlb-tool-wrapper">
          <div className="rlb-input-output-grid">
            {/* Input Panel */}
            <div className="rlb-panel">
              <label className="rlb-panel-label">Input Text</label>
              <textarea
                className="rlb-textarea"
                placeholder="Paste your text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck="false"
              />
            </div>

            {/* Controls Panel */}
            <div className="rlb-controls">
              <div className="rlb-control-group">
                <label>Formatting Option</label>
                <div className="rlb-radio-group">
                  <label className="rlb-radio-label">
                    <input
                      type="radio"
                      className="rlb-radio"
                      checked={mode === "line_breaks_only"}
                      onChange={() => setMode("line_breaks_only")}
                    />
                    Remove line breaks only
                  </label>
                  <label className="rlb-radio-label">
                    <input
                      type="radio"
                      className="rlb-radio"
                      checked={mode === "all_breaks"}
                      onChange={() => setMode("all_breaks")}
                    />
                    Remove line breaks & paragraph breaks
                  </label>
                </div>
              </div>

              <button 
                className="rlb-action-btn rlb-btn-primary" 
                onClick={convertText}
              >
                <span>Format Text</span>
              </button>

              <button 
                className="rlb-action-btn rlb-btn-secondary" 
                onClick={handleClear}
              >
                Clear
              </button>
            </div>

            {/* Output Panel */}
            <div className="rlb-panel">
              <label className="rlb-panel-label">Result</label>
              <textarea
                className="rlb-textarea"
                value={output}
                readOnly
                placeholder="Formatted text will appear here..."
              />
              <button 
                className={`rlb-action-btn rlb-btn-secondary ${copied ? 'copied' : ''}`} 
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rlb-info-section">
        <h2>About Remove Line Breaks Tool</h2>
        <p>
          The Remove Line Breaks tool is an intuitive utility that helps to refine and streamline textual content by eliminating unwanted line and paragraph breaks. Spacing and presentation can greatly impact the reader experience.
        </p>

        <h2>How it Works</h2>
        <ul>
          <li><strong>Remove line breaks only:</strong> This option meticulously removes line breaks within your text, turning multiline content into a single continuous line. It retains paragraph separations, ensuring that distinct sections or ideas remain separated for clarity.</li>
          <li><strong>Remove line breaks and paragraph breaks:</strong> Choosing this will not only remove line breaks but also eliminate paragraph breaks. The result is a compact block of text, devoid of any breaks or spaces.</li>
        </ul>

        <h2>Why Use This Tool?</h2>
        <p>
          Whether you're consolidating data, preparing content for publishing, or cleaning up imported text, this tool offers a quick fix for messy formatting.
        </p>
        <ul>
          <li><strong>Clean Emails:</strong> Fix jagged text copied from email clients.</li>
          <li><strong>Fix PDF Copying:</strong> Resolve issues where copying from PDFs adds hard line breaks at the end of every line.</li>
          <li><strong>Optimize Web Content:</strong> Ensure content fits seamlessly within web templates without excessive breaks.</li>
        </ul>
      </section>

      <RelatedToolsSection currentSlug="remove-line-breaks" />
    </div>
  );
}
