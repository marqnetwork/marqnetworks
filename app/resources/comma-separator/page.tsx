"use client";
import { useState, useEffect } from "react";
import "./comma-separator.css";

// Comma Separator — MarQ Networks Resource

export default function CommaSeparatorPage() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(", ");
  const [customDelimiter, setCustomDelimiter] = useState<string>("");
  const [delimiterType, setDelimiterType] = useState<string>("comma_space");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    convertText();
  }, [input, delimiter, delimiterType, customDelimiter]);

  const handleDelimiterChange = (type: string) => {
    setDelimiterType(type);
    if (type === "comma") setDelimiter(",");
    else if (type === "comma_space") setDelimiter(", ");
    else if (type === "semicolon") setDelimiter("; ");
    else if (type === "pipe") setDelimiter(" | ");
    else if (type === "newline") setDelimiter("\n");
    else if (type === "custom") setDelimiter(customDelimiter);
  };

  const convertText = () => {
    if (!input) {
      setOutput("");
      return;
    }

    const currentDelimiter = delimiterType === "custom" ? customDelimiter : delimiter;
    
    // Split by newline, filter out empty lines, trim whitespace
    const items = input
      .split(/\n/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
      
    setOutput(items.join(currentDelimiter));
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
    <div className="cs-container">
      {/* Hero Section */}
      <section className="cs-hero-section">
        <div className="cs-hero-container">
          <div className="cs-hero-tag">
            <span className="cs-year">Free Tool</span>
            <span className="cs-tag-text">Resources</span>
          </div>

          <h1 className="cs-hero-heading">
            Comma <span>Separator</span> Tool
          </h1>

          <p className="cs-hero-subtext">
            Convert column lists to comma-separated value (CSV) strings instantly. Perfect for SQL queries, programming arrays, and data formatting.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="cs-tool-section">
        <div className="cs-tool-wrapper">
          <div className="cs-input-output-grid">
            {/* Input Panel */}
            <div className="cs-panel">
              <label className="cs-panel-label">Input List</label>
              <textarea
                className="cs-textarea"
                placeholder="Paste your list here...&#10;Item 1&#10;Item 2&#10;Item 3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck="false"
              />
            </div>

            {/* Controls Panel */}
            <div className="cs-controls">
              <div className="cs-control-group">
                <label>Delimiter</label>
                <select 
                  className="cs-select"
                  value={delimiterType}
                  onChange={(e) => handleDelimiterChange(e.target.value)}
                >
                  <option value="comma_space">Comma + Space (, )</option>
                  <option value="comma">Comma (,)</option>
                  <option value="semicolon">Semicolon (;)</option>
                  <option value="pipe">Pipe (|)</option>
                  <option value="newline">New Line</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {delimiterType === "custom" && (
                <div className="cs-control-group">
                  <label>Custom Separator</label>
                  <input
                    type="text"
                    className="cs-input"
                    value={customDelimiter}
                    onChange={(e) => {
                      setCustomDelimiter(e.target.value);
                      setDelimiter(e.target.value);
                    }}
                    placeholder="e.g. - "
                  />
                </div>
              )}

              <button 
                className="cs-action-btn cs-btn-primary" 
                onClick={convertText}
              >
                <span>Convert</span>
              </button>

              <button 
                className="cs-action-btn cs-btn-secondary" 
                onClick={handleClear}
              >
                Clear
              </button>
            </div>

            {/* Output Panel */}
            <div className="cs-panel">
              <label className="cs-panel-label">Result</label>
              <textarea
                className="cs-textarea"
                value={output}
                readOnly
                placeholder="Result will appear here..."
              />
              <button 
                className={`cs-action-btn cs-btn-secondary ${copied ? 'copied' : ''}`} 
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="cs-info-section">
        <h2>About Comma Separator Tool</h2>
        <p>
          The Comma Separator is an online tool that helps to transform lists into a continuous stream of text. While it's common to deal with lists in Excel or text files, there are scenarios where a continuous text format separated by specific delimiters is more desirable.
        </p>

        <h2>Why Use This Tool?</h2>
        <p>
          Instead of manually adding commas to hundreds of items, this tool automates the process instantly.
        </p>
        <ul>
          <li><strong>Efficiency:</strong> Avoid manually adding commas or other delimiters between list items.</li>
          <li><strong>Consistency:</strong> Ensure that each item in your list is separated by a uniform delimiter.</li>
          <li><strong>Adaptability:</strong> The tool is perfect for SQL queries (IN clauses), array initialization, or CSV formatting.</li>
        </ul>
      </section>
    </div>
  );
}
