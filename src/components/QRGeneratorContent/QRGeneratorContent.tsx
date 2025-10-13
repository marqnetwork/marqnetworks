
"use client";
import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import './QRGeneratorContent.css';

const QRGeneratorContent = () => {
  const [qrData, setQrData] = useState('https://marqnetworks.com');
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrImage, setQrImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code
  const generateQRCode = async () => {
    if (!qrData.trim()) {
      setError('Please enter data for the QR code');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Generate QR code as data URL
      const dataUrl = await QRCode.toDataURL(qrData, {
        width: qrSize,
        margin: 1,
        color: {
          dark: qrColor,
          light: bgColor
        },
        errorCorrectionLevel: 'M'
      });
      
      setQrImage(dataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Download QR code as image
  const downloadQRCode = () => {
    if (!qrImage) return;
    
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate QR code on initial load
  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className="qr-generator-container">
      {/* Hero Section */}
      <section className="qr-hero-section">
        <div className="qr-hero-container">
          <div className="qr-hero-tag">
            <span className="qr-year">2025</span>
            <span className="qr-tag-text">QR Generator Service</span>
          </div>
          
          <h1 className="qr-hero-heading">
            Professional <span>QR Code Generator</span> Solutions
          </h1>
          
          <p className="qr-hero-subtext">
            Create custom QR codes for your business, products, or personal use.
            Fast, secure, and highly customizable QR code generation.
          </p>
          
          <div className="qr-hero-buttons">
            <button 
              className="qr-btn primary"
              onClick={() => document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Create QR Code Now
            </button>
            <button className="qr-btn secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator-section" className="qr-generator-section">
        <div className="qr-generator-wrapper">
          <div className="qr-generator-content">
            <div className="qr-generator-tag">
              <span className="qr-year">Create</span>
              <span className="qr-tag-text">QR Code Generator</span>
            </div>
            
            <h2 className="qr-generator-heading">
              Generate QR Codes <span>Instantly</span>
            </h2>
            
            <div className="qr-generator-interface">
              <div className="qr-generator-form">
                <div className="qr-form-group">
                  <label htmlFor="qr-data">QR Code Content</label>
                  <input
                    id="qr-data"
                    type="text"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="Enter URL, text, or contact info"
                    className="qr-input"
                  />
                </div>
                
                <div className="qr-form-row">
                  <div className="qr-form-group">
                    <label htmlFor="qr-size">Size (px)</label>
                    <input
                      id="qr-size"
                      type="number"
                      min="100"
                      max="1000"
                      value={qrSize}
                      onChange={(e) => setQrSize(Number(e.target.value))}
                      className="qr-input"
                    />
                  </div>
                  
                  <div className="qr-form-group">
                    <label htmlFor="qr-color">QR Color</label>
                    <input
                      id="qr-color"
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="qr-color-input"
                    />
                  </div>
                  
                  <div className="qr-form-group">
                    <label htmlFor="bg-color">Background</label>
                    <input
                      id="bg-color"
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="qr-color-input"
                    />
                  </div>
                </div>
                
                <div className="qr-form-actions">
                  <button 
                    className="qr-btn primary"
                    onClick={generateQRCode}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate QR Code'}
                  </button>
                </div>
                
                {error && (
                  <div className="qr-error">
                    <strong>Error:</strong> {error}
                  </div>
                )}
              </div>
              
              <div className="qr-preview">
                <div className="qr-preview-container">
                  {qrImage ? (
                    <img 
                      src={qrImage} 
                      alt="Generated QR Code" 
                      className="qr-preview-image"
                    />
                  ) : (
                    <div className="qr-placeholder">
                      <div className="qr-placeholder-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <rect x="7" y="7" width="3" height="3"/>
                          <rect x="14" y="7" width="3" height="3"/>
                          <rect x="7" y="14" width="3" height="3"/>
                          <rect x="14" y="14" width="3" height="3"/>
                        </svg>
                      </div>
                      <p>QR Code will appear here</p>
                    </div>
                  )}
                </div>
                
                {qrImage && (
                  <div className="qr-preview-actions">
                    <button 
                      className="qr-btn primary"
                      onClick={downloadQRCode}
                    >
                      Download QR Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="qr-features-section">
        <div className="qr-features-container">
          <div className="qr-features-tag">
            <span className="qr-year">Pro</span>
            <span className="qr-tag-text">Features</span>
          </div>
          
          <h2 className="qr-features-heading">
            Why Choose Our <span>QR Generator</span>
          </h2>
          
          <div className="qr-features-grid">
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Generate QR codes instantly with our high-performance engine</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Secure & Private</h3>
              <p>All QR code generation happens locally in your browser - no data sent to servers</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3>Customizable</h3>
              <p>Personalize your QR codes with custom colors, sizes, and formats</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <h3>Multiple Formats</h3>
              <p>Generate QR codes for URLs, text, contact info, and more</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="qr-cta-section">
        <div className="qr-cta-container">
          <div className="qr-cta-content">
            <div className="qr-cta-tag">
              <span className="qr-year">Ready</span>
              <span className="qr-tag-text">Get Started</span>
            </div>
            
            <h2 className="qr-cta-heading">
              Need Custom QR <span>Solutions?</span>
            </h2>
            
            <p className="qr-cta-description">
              Looking for enterprise QR code solutions, bulk generation, or custom integrations? 
              Our team can build tailored QR code systems for your business needs.
            </p>
            
            <div className="qr-cta-buttons">
              <button className="qr-btn primary">
                Contact Our Team
              </button>
              <button className="qr-btn secondary">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QRGeneratorContent;