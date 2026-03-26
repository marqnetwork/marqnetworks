"use client";
import { useState, useEffect } from "react";
import "./lorem-generator.css";

// Lorem Ipsum Generator — MarQ Networks Tool

const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, lacus. Aliquam rutrum. Angustamice`;

export default function LoremGeneratorPage() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words" | "list">("paragraphs");
  const [count, setCount] = useState<number>(5);
  const [htmlMarkup, setHtmlMarkup] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generateLorem = () => {
    setCopied(false);
    let result = "";
    const sentences = LOREM_TEXT.split(". ");
    const words = LOREM_TEXT.replace(/[.,]/g, "").split(" ");

    if (type === "words") {
      let generatedWords = [];
      for (let i = 0; i < count; i++) {
        generatedWords.push(words[i % words.length]);
      }
      result = generatedWords.join(" ");
    } else if (type === "sentences") {
      let generatedSentences = [];
      for (let i = 0; i < count; i++) {
        let sentence = sentences[i % sentences.length];
        if (!sentence.endsWith(".")) sentence += ".";
        generatedSentences.push(sentence);
      }
      result = generatedSentences.join(" ");
    } else if (type === "paragraphs") {
      let generatedParagraphs = [];
      for (let i = 0; i < count; i++) {
        // Create a paragraph from multiple sentences
        let paragraph = sentences.slice(0, 5 + (i % 3)).join(". ") + ".";
        if (htmlMarkup) {
          generatedParagraphs.push(`<p>${paragraph}</p>`);
        } else {
          generatedParagraphs.push(paragraph);
        }
      }
      result = generatedParagraphs.join("\n\n");
    } else if (type === "list") {
      let listItems = [];
      for (let i = 0; i < count; i++) {
        let item = sentences[i % sentences.length].substring(0, 20 + (i * 5));
        if (htmlMarkup) {
          listItems.push(`<li>${item}</li>`);
        } else {
          listItems.push(item);
        }
      }
      if (htmlMarkup) {
        result = `<ul>\n${listItems.join("\n")}\n</ul>`;
      } else {
        result = listItems.join("\n");
      }
    }

    setOutput(result);
  };

  // Generate initial content on mount
  useEffect(() => {
    generateLorem();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lorem-container">
      {/* Hero Section */}
      <section className="lorem-hero-section">
        <div className="lorem-hero-container">
          <div className="lorem-hero-tag">
            <span className="lorem-year">Free Tool</span>
            <span className="lorem-tag-text">Tools</span>
          </div>

          <h1 className="lorem-hero-heading">
            Lorem Ipsum <span>Generator</span>
          </h1>

          <p className="lorem-hero-subtext">
            Generate standard dummy text for your designs. Select paragraphs, sentences, words, or lists with optional HTML markup.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="lorem-tool-section">
        <div className="lorem-tool-wrapper">
          {/* Controls */}
          <div className="lorem-controls">
            <div className="lorem-control-group">
              <label>Select Type</label>
              <select 
                className="lorem-select"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
                <option value="list">List Items</option>
              </select>
            </div>

            <div className="lorem-control-group">
              <label>Number</label>
              <input 
                type="number" 
                className="lorem-input"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="100"
              />
            </div>

            <div className="lorem-control-group">
              <label className="lorem-checkbox-wrapper">
                <input 
                  type="checkbox" 
                  className="lorem-checkbox"
                  checked={htmlMarkup}
                  onChange={(e) => setHtmlMarkup(e.target.checked)}
                />
                HTML Markup
              </label>
            </div>

            <button className="lorem-btn lorem-btn-primary" onClick={generateLorem}>
              Generate Lorem Ipsum
            </button>
          </div>

          {/* Output */}
          <div className="lorem-output-container">
            <button 
              className={`lorem-copy-btn ${copied ? "copied" : ""}`} 
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy Text"}
            </button>
            <textarea
              className="lorem-textarea"
              value={output}
              readOnly
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="lorem-info-section">
        <h2>About Lorem Ipsum Generator</h2>
        <p>
          Lorem Ipsum is a type of filler text used in the printing and typesetting industry when the actual text is not available. It has been used as a standard for centuries. Its purpose is to create a natural-looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout and design.
        </p>

        <h2>Why Use This Tool?</h2>
        <p>
          A Lorem Ipsum Generator is a tool that produces dummy text that looks like Latin but is made up of random letters and words. It helps designers and developers fill spaces in their layouts before the final content is ready.
        </p>
        <ul>
          <li><strong>Saves Time:</strong> Quickly generate placeholder text without typing manually.</li>
          <li><strong>Focus on Design:</strong> Allows stakeholders to focus on the visual layout rather than reading the copy.</li>
          <li><strong>Flexible Options:</strong> Generate words, sentences, paragraphs, or lists with optional HTML tags.</li>
        </ul>
      </section>
    </div>
  );
}
