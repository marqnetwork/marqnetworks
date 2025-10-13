"use client";
import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import './QRScannerContent.css';

const QRScannerContent = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  // Initialize QR Scanner
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError('');
      setScannedResult('');
      
      if (!videoRef.current) return;

      // Create QR Scanner instance
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedResult(result.data);
          stopScanning();
        },
        {
          onDecodeError: (err) => {
            // Silently handle decode errors - they're normal when no QR code is visible
            console.debug('QR decode error:', err);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment'
        }
      );

      await qrScannerRef.current.start();
      setIsScanning(true);
    } catch (err) {
      setError('Camera access denied or not available. Please allow camera access and try again.');
      console.error('Error accessing camera:', err);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    
    setIsScanning(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setError('');
        const result = await QrScanner.scanImage(file);
        setScannedResult(result);
      } catch (err) {
        setError('No QR code found in the uploaded image');
        console.error('QR scan error:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="qr-scanner-container">
      {/* Hero Section */}
      <section className="qr-hero-section">
        <div className="qr-hero-container">
          <div className="qr-hero-tag">
            <span className="qr-year">2025</span>
            <span className="qr-tag-text">QR Scanner Service</span>
          </div>
          
          <h1 className="qr-hero-heading">
            Professional <span>QR Code Scanner</span> Solutions
          </h1>
          
          <p className="qr-hero-subtext">
            Fast, accurate, and secure QR code scanning service. Decode QR codes instantly 
            with our advanced scanning technology. Perfect for businesses and personal use.
          </p>
          
          <div className="qr-hero-buttons">
            <button 
              className="qr-btn primary"
              onClick={startScanning}
              disabled={isScanning}
            >
              {isScanning ? 'Scanning Active' : 'Start Camera Scanner'}
            </button>
            <button className="qr-btn secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section className="qr-scanner-section">
        <div className="qr-scanner-wrapper">
          <div className="qr-scanner-content">
            <div className="qr-scanner-tag">
              <span className="qr-year">Live</span>
              <span className="qr-tag-text">QR Code Scanner</span>
            </div>
            
            <h2 className="qr-scanner-heading">
              Scan QR Codes <span>Instantly</span>
            </h2>
            
            <div className="qr-scanner-interface">
              <div className="qr-camera-container">
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="qr-video"
                  style={{ display: isScanning ? 'block' : 'none' }}
                />

                
                {!isScanning && (
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
                    <p>Click "Start Camera Scanner" to begin</p>
                  </div>
                )}
                
                {isScanning && (
                  <div className="qr-scanner-overlay">
                    <div className="qr-scanner-frame"></div>
                    <div className="qr-scanning-indicator">
                      <div className="qr-scan-line"></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="qr-controls">
                <div className="qr-control-buttons">
                  {isScanning ? (
                    <button 
                      className="qr-btn secondary"
                      onClick={stopScanning}
                    >
                      Stop Scanner
                    </button>
                  ) : (
                    <button 
                      className="qr-btn primary"
                      onClick={startScanning}
                    >
                      Start Scanner
                    </button>
                  )}
                  
                  <label className="qr-upload-btn">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    Upload Image
                  </label>
                </div>
                
                {error && (
                  <div className="qr-error">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                
                {scannedResult && (
                  <div className="qr-result">
                    <h3>Scanned Result:</h3>
                    <p>{scannedResult}</p>
                    <div className="qr-result-actions">
                      <button 
                        className="qr-btn secondary small"
                        onClick={() => navigator.clipboard.writeText(scannedResult)}
                      >
                        Copy Result
                      </button>
                      {scannedResult.startsWith('http') && (
                        <button 
                          className="qr-btn primary small"
                          onClick={() => window.open(scannedResult, '_blank')}
                        >
                          Open Link
                        </button>
                      )}
                    </div>
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
            Why Choose Our <span>QR Scanner</span>
          </h2>
          
          <div className="qr-features-grid">
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Instant QR code detection and decoding with advanced algorithms</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Secure & Private</h3>
              <p>All scanning happens locally in your browser - no data sent to servers</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>Multi-Platform</h3>
              <p>Works on desktop, mobile, and tablet devices with camera support</p>
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
              <p>Supports various QR code types and data formats</p>
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
              Looking for enterprise QR code solutions, bulk scanning, or custom integrations? 
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

export default QRScannerContent;