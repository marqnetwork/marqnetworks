
"use client";
import React, { useState } from 'react';
import "./LinkShortenerContent.css";

const LinkShortenerContent = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [shortenedLinks, setShortenedLinks] = useState<{original: string, shortened: string, timestamp: number}[]>([]);

  // Simulate link shortening
  const shortenLink = async () => {
    if (!longUrl.trim()) {
      setError('Please enter a URL to shorten');
      return;
    }

    // Validate URL
    try {
      new URL(longUrl);
    } catch (e) {
      setError('Please enter a valid URL including http:// or https://');
      return;
    }

    setIsShortening(true);
    setError('');
    setCopied(false);

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random short code or use custom alias
      const shortCode = customAlias || generateRandomCode(6);
      const baseUrl = 'https://mrq.net/';
      const newShortUrl = baseUrl + shortCode;
      
      setShortUrl(newShortUrl);
      
      // Add to history
      const newLink = {
        original: longUrl,
        shortened: newShortUrl,
        timestamp: Date.now()
      };
      
      setShortenedLinks(prev => [newLink, ...prev].slice(0, 10));
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsShortening(false);
    }
  };

  // Generate random code for short URL
  const generateRandomCode = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Copy shortened URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="link-shortener-container">
      {/* Hero Section */}
      <section className="link-hero-section">
        <div className="link-hero-container">
          <div className="link-hero-tag">
            <span className="link-year">2025</span>
            <span className="link-tag-text">Link Shortener Service</span>
          </div>
          
          <h1 className="link-hero-heading">
            Professional <span>Link Shortener</span> Solutions
          </h1>
          
          <p className="link-hero-subtext">
            Create short, memorable URLs for your marketing campaigns, social media, and more.
            Track clicks and manage your links efficiently with our advanced link shortening service.
          </p>
          
          <div className="link-hero-buttons">
            <button 
              className="link-btn primary"
              onClick={() => document.getElementById('shortener-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shorten URL Now
            </button>
            <button className="link-btn secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Shortener Section */}
      <section id="shortener-section" className="link-shortener-section">
        <div className="link-shortener-wrapper">
          <div className="link-shortener-content">
            <div className="link-shortener-tag">
              <span className="link-year">Create</span>
              <span className="link-tag-text">URL Shortener</span>
            </div>
            
            <h2 className="link-shortener-heading">
              Shorten URLs <span>Instantly</span>
            </h2>
            
            <div className="link-shortener-interface">
              <div className="link-form">
                <div className="link-form-group">
                  <label htmlFor="long-url">Long URL</label>
                  <input
                    id="long-url"
                    type="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://example.com/your-very-long-url-that-needs-shortening"
                    className="link-input"
                  />
                </div>
                
                <div className="link-form-group">
                  <label htmlFor="custom-alias">Custom Alias (Optional)</label>
                  <div className="link-input-group">
                    <span className="link-input-prefix">mrq.net/</span>
                    <input
                      id="custom-alias"
                      type="text"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                      placeholder="custom-name"
                      className="link-input with-prefix"
                    />
                  </div>
                  <small className="link-input-help">Only letters, numbers, hyphens and underscores allowed</small>
                </div>
                
                <div className="link-form-actions">
                  <button 
                    className="link-btn primary"
                    onClick={shortenLink}
                    disabled={isShortening}
                  >
                    {isShortening ? 'Shortening...' : 'Shorten URL'}
                  </button>
                </div>
                
                {error && (
                  <div className="link-error">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                
                {shortUrl && (
                  <div className="link-result">
                    <h3>Your Shortened URL:</h3>
                    <div className="link-result-url">
                      <input 
                        type="text" 
                        value={shortUrl} 
                        readOnly 
                        className="link-input"
                      />
                      <button 
                        className="link-btn secondary"
                        onClick={copyToClipboard}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="link-result-actions">
                      <a 
                        href={shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-btn primary small"
                      >
                        Test Link
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {shortenedLinks.length > 0 && (
                <div className="link-history">
                  <h3>Recently Shortened Links</h3>
                  <div className="link-history-list">
                    {shortenedLinks.map((link, index) => (
                      <div key={index} className="link-history-item">
                        <div className="link-history-details">
                          <span className="link-history-short">{link.shortened}</span>
                          <span className="link-history-original" title={link.original}>
                            {link.original.length > 40 ? link.original.substring(0, 40) + '...' : link.original}
                          </span>
                          <span className="link-history-time">{formatTime(link.timestamp)}</span>
                        </div>
                        <div className="link-history-actions">
                          <button 
                            className="link-btn secondary small"
                            onClick={() => {
                              navigator.clipboard.writeText(link.shortened);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 3000);
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="link-features-section">
        <div className="link-features-container">
          <div className="link-features-tag">
            <span className="link-year">Pro</span>
            <span className="link-tag-text">Features</span>
          </div>
          
          <h2 className="link-features-heading">
            Why Choose Our <span>Link Shortener</span>
          </h2>
          
          <div className="link-features-grid">
            <div className="link-feature-card">
              <div className="link-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Generate short links instantly with our high-performance engine</p>
            </div>
            
            <div className="link-feature-card">
              <div className="link-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Secure & Reliable</h3>
              <p>All links are secured with HTTPS and guaranteed 99.9% uptime</p>
            </div>
            
            <div className="link-feature-card">
              <div className="link-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3>Customizable</h3>
              <p>Create branded short links with custom aliases for better recognition</p>
            </div>
            
            <div className="link-feature-card">
              <div className="link-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3>Analytics</h3>
              <p>Track clicks, geographic data, and referrers with our advanced analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="link-cta-section">
        <div className="link-cta-container">
          <div className="link-cta-content">
            <div className="link-cta-tag">
              <span className="link-year">Ready</span>
              <span className="link-tag-text">Get Started</span>
            </div>
            
            <h2 className="link-cta-heading">
              Need Enterprise <span>Link Management?</span>
            </h2>
            
            <p className="link-cta-description">
              Looking for enterprise link management solutions, bulk shortening, or custom integrations? 
              Our team can build tailored link management systems for your business needs.
            </p>
            
            <div className="link-cta-buttons">
              <button className="link-btn primary">
                Contact Our Team
              </button>
              <button className="link-btn secondary">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkShortenerContent;