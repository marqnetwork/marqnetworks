"use client";
import React, { useState, useEffect } from 'react';
import './PercentageCalculatorContent.css';

const PercentageCalculatorContent = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [results, setResults] = useState({
    basic: '',
    increase: '',
    decrease: '',
    of: '',
    change: ''
  });

  // Basic percentage calculation
  const [basicInputs, setBasicInputs] = useState({
    part: '',
    whole: ''
  });

  // Percentage increase calculation
  const [increaseInputs, setIncreaseInputs] = useState({
    original: '',
    percentage: ''
  });

  // Percentage decrease calculation
  const [decreaseInputs, setDecreaseInputs] = useState({
    original: '',
    percentage: ''
  });

  // Percentage of a number calculation
  const [ofInputs, setOfInputs] = useState({
    percentage: '',
    number: ''
  });

  // Percentage change calculation
  const [changeInputs, setChangeInputs] = useState({
    oldValue: '',
    newValue: ''
  });

  // Calculate basic percentage
  const calculateBasic = () => {
    const part = parseFloat(basicInputs.part);
    const whole = parseFloat(basicInputs.whole);
    
    if (isNaN(part) || isNaN(whole) || whole === 0) {
      setResults(prev => ({ ...prev, basic: 'Please enter valid numbers' }));
      return;
    }
    
    const percentage = (part / whole) * 100;
    setResults(prev => ({ ...prev, basic: `${percentage.toFixed(2)}%` }));
  };

  // Calculate percentage increase
  const calculateIncrease = () => {
    const original = parseFloat(increaseInputs.original);
    const percentage = parseFloat(increaseInputs.percentage);
    
    if (isNaN(original) || isNaN(percentage)) {
      setResults(prev => ({ ...prev, increase: 'Please enter valid numbers' }));
      return;
    }
    
    const increase = original * (percentage / 100);
    const newValue = original + increase;
    setResults(prev => ({ ...prev, increase: `${newValue.toFixed(2)} (increase of ${increase.toFixed(2)})` }));
  };

  // Calculate percentage decrease
  const calculateDecrease = () => {
    const original = parseFloat(decreaseInputs.original);
    const percentage = parseFloat(decreaseInputs.percentage);
    
    if (isNaN(original) || isNaN(percentage)) {
      setResults(prev => ({ ...prev, decrease: 'Please enter valid numbers' }));
      return;
    }
    
    const decrease = original * (percentage / 100);
    const newValue = original - decrease;
    setResults(prev => ({ ...prev, decrease: `${newValue.toFixed(2)} (decrease of ${decrease.toFixed(2)})` }));
  };

  // Calculate percentage of a number
  const calculateOf = () => {
    const percentage = parseFloat(ofInputs.percentage);
    const number = parseFloat(ofInputs.number);
    
    if (isNaN(percentage) || isNaN(number)) {
      setResults(prev => ({ ...prev, of: 'Please enter valid numbers' }));
      return;
    }
    
    const result = (percentage / 100) * number;
    setResults(prev => ({ ...prev, of: result.toFixed(2) }));
  };

  // Calculate percentage change
  const calculateChange = () => {
    const oldValue = parseFloat(changeInputs.oldValue);
    const newValue = parseFloat(changeInputs.newValue);
    
    if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) {
      setResults(prev => ({ ...prev, change: 'Please enter valid numbers' }));
      return;
    }
    
    const change = ((newValue - oldValue) / oldValue) * 100;
    const changeType = change >= 0 ? 'increase' : 'decrease';
    setResults(prev => ({ ...prev, change: `${Math.abs(change).toFixed(2)}% ${changeType}` }));
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (basicInputs.part && basicInputs.whole) calculateBasic();
  }, [basicInputs]);

  useEffect(() => {
    if (increaseInputs.original && increaseInputs.percentage) calculateIncrease();
  }, [increaseInputs]);

  useEffect(() => {
    if (decreaseInputs.original && decreaseInputs.percentage) calculateDecrease();
  }, [decreaseInputs]);

  useEffect(() => {
    if (ofInputs.percentage && ofInputs.number) calculateOf();
  }, [ofInputs]);

  useEffect(() => {
    if (changeInputs.oldValue && changeInputs.newValue) calculateChange();
  }, [changeInputs]);

  const clearAll = () => {
    setBasicInputs({ part: '', whole: '' });
    setIncreaseInputs({ original: '', percentage: '' });
    setDecreaseInputs({ original: '', percentage: '' });
    setOfInputs({ percentage: '', number: '' });
    setChangeInputs({ oldValue: '', newValue: '' });
    setResults({
      basic: '',
      increase: '',
      decrease: '',
      of: '',
      change: ''
    });
  };

  return (
    <div className="percentage-calculator-container">
      {/* Hero Section */}
      <section className="calc-hero-section">
        <div className="calc-hero-container">
          <div className="calc-hero-tag">
            <span className="calc-year">2025</span>
            <span className="calc-tag-text">Percentage Calculator</span>
          </div>
          
          <h1 className="calc-hero-heading">
            Professional <span>Percentage Calculator</span> Tool
          </h1>
          
          <p className="calc-hero-subtext">
            Calculate percentages, percentage increases, decreases, and changes instantly. 
            Perfect for business, finance, education, and everyday calculations.
          </p>
          
          <div className="calc-hero-buttons">
            <button 
              className="calc-btn primary"
              onClick={() => document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Calculating
            </button>
            <button className="calc-btn secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator-section" className="calc-calculator-section">
        <div className="calc-calculator-wrapper">
          <div className="calc-calculator-content">
            <div className="calc-calculator-tag">
              <span className="calc-year">Calculate</span>
              <span className="calc-tag-text">Percentage Calculator</span>
            </div>
            
            <h2 className="calc-calculator-heading">
              Calculate Percentages <span>Instantly</span>
            </h2>
            
            <div className="calc-calculator-interface">
              {/* Tab Navigation */}
              <div className="calc-tabs">
                <button 
                  className={`calc-tab ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic %
                </button>
                <button 
                  className={`calc-tab ${activeTab === 'increase' ? 'active' : ''}`}
                  onClick={() => setActiveTab('increase')}
                >
                  % Increase
                </button>
                <button 
                  className={`calc-tab ${activeTab === 'decrease' ? 'active' : ''}`}
                  onClick={() => setActiveTab('decrease')}
                >
                  % Decrease
                </button>
                <button 
                  className={`calc-tab ${activeTab === 'of' ? 'active' : ''}`}
                  onClick={() => setActiveTab('of')}
                >
                  % of Number
                </button>
                <button 
                  className={`calc-tab ${activeTab === 'change' ? 'active' : ''}`}
                  onClick={() => setActiveTab('change')}
                >
                  % Change
                </button>
              </div>

              <div className="calc-content-area">
                {/* Basic Percentage */}
                {activeTab === 'basic' && (
                  <div className="calc-tab-content">
                    <h3>What percentage is X of Y?</h3>
                    <div className="calc-form-group">
                      <label>Part (X)</label>
                      <input
                        type="number"
                        value={basicInputs.part}
                        onChange={(e) => setBasicInputs(prev => ({ ...prev, part: e.target.value }))}
                        placeholder="Enter the part"
                      />
                    </div>
                    <div className="calc-form-group">
                      <label>Whole (Y)</label>
                      <input
                        type="number"
                        value={basicInputs.whole}
                        onChange={(e) => setBasicInputs(prev => ({ ...prev, whole: e.target.value }))}
                        placeholder="Enter the whole"
                      />
                    </div>
                    <div className="calc-result">
                      <strong>Result: {results.basic}</strong>
                    </div>
                  </div>
                )}

                {/* Percentage Increase */}
                {activeTab === 'increase' && (
                  <div className="calc-tab-content">
                    <h3>Increase a number by X%</h3>
                    <div className="calc-form-group">
                      <label>Original Number</label>
                      <input
                        type="number"
                        value={increaseInputs.original}
                        onChange={(e) => setIncreaseInputs(prev => ({ ...prev, original: e.target.value }))}
                        placeholder="Enter original number"
                      />
                    </div>
                    <div className="calc-form-group">
                      <label>Percentage Increase (%)</label>
                      <input
                        type="number"
                        value={increaseInputs.percentage}
                        onChange={(e) => setIncreaseInputs(prev => ({ ...prev, percentage: e.target.value }))}
                        placeholder="Enter percentage"
                      />
                    </div>
                    <div className="calc-result">
                      <strong>Result: {results.increase}</strong>
                    </div>
                  </div>
                )}

                {/* Percentage Decrease */}
                {activeTab === 'decrease' && (
                  <div className="calc-tab-content">
                    <h3>Decrease a number by X%</h3>
                    <div className="calc-form-group">
                      <label>Original Number</label>
                      <input
                        type="number"
                        value={decreaseInputs.original}
                        onChange={(e) => setDecreaseInputs(prev => ({ ...prev, original: e.target.value }))}
                        placeholder="Enter original number"
                      />
                    </div>
                    <div className="calc-form-group">
                      <label>Percentage Decrease (%)</label>
                      <input
                        type="number"
                        value={decreaseInputs.percentage}
                        onChange={(e) => setDecreaseInputs(prev => ({ ...prev, percentage: e.target.value }))}
                        placeholder="Enter percentage"
                      />
                    </div>
                    <div className="calc-result">
                      <strong>Result: {results.decrease}</strong>
                    </div>
                  </div>
                )}

                {/* Percentage of Number */}
                {activeTab === 'of' && (
                  <div className="calc-tab-content">
                    <h3>What is X% of Y?</h3>
                    <div className="calc-form-group">
                      <label>Percentage (%)</label>
                      <input
                        type="number"
                        value={ofInputs.percentage}
                        onChange={(e) => setOfInputs(prev => ({ ...prev, percentage: e.target.value }))}
                        placeholder="Enter percentage"
                      />
                    </div>
                    <div className="calc-form-group">
                      <label>Number</label>
                      <input
                        type="number"
                        value={ofInputs.number}
                        onChange={(e) => setOfInputs(prev => ({ ...prev, number: e.target.value }))}
                        placeholder="Enter number"
                      />
                    </div>
                    <div className="calc-result">
                      <strong>Result: {results.of}</strong>
                    </div>
                  </div>
                )}

                {/* Percentage Change */}
                {activeTab === 'change' && (
                  <div className="calc-tab-content">
                    <h3>Percentage change from X to Y</h3>
                    <div className="calc-form-group">
                      <label>Old Value</label>
                      <input
                        type="number"
                        value={changeInputs.oldValue}
                        onChange={(e) => setChangeInputs(prev => ({ ...prev, oldValue: e.target.value }))}
                        placeholder="Enter old value"
                      />
                    </div>
                    <div className="calc-form-group">
                      <label>New Value</label>
                      <input
                        type="number"
                        value={changeInputs.newValue}
                        onChange={(e) => setChangeInputs(prev => ({ ...prev, newValue: e.target.value }))}
                        placeholder="Enter new value"
                      />
                    </div>
                    <div className="calc-result">
                      <strong>Result: {results.change}</strong>
                    </div>
                  </div>
                )}

                <div className="calc-actions">
                  <button className="calc-btn secondary" onClick={clearAll}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="calc-features-section">
        <div className="calc-features-container">
          <div className="calc-features-tag">
            <span className="calc-year">Pro</span>
            <span className="calc-tag-text">Features</span>
          </div>
          
          <h2 className="calc-features-heading">
            Why Choose Our <span>Percentage Calculator</span>
          </h2>
          
          <div className="calc-features-grid">
            <div className="calc-feature-card">
              <div className="calc-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Instant calculations as you type with real-time results</p>
            </div>
            
            <div className="calc-feature-card">
              <div className="calc-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                </svg>
              </div>
              <h3>Multiple Calculations</h3>
              <p>Five different percentage calculation types in one tool</p>
            </div>
            
            <div className="calc-feature-card">
              <div className="calc-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>Mobile Friendly</h3>
              <p>Works perfectly on desktop, tablet, and mobile devices</p>
            </div>
            
            <div className="calc-feature-card">
              <div className="calc-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Secure & Private</h3>
              <p>All calculations happen locally - no data sent to servers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="calc-cta-section">
        <div className="calc-cta-container">
          <div className="calc-cta-content">
            <div className="calc-cta-tag">
              <span className="calc-year">Ready</span>
              <span className="calc-tag-text">Get Started</span>
            </div>
            
            <h2 className="calc-cta-heading">
              Need Custom <span>Calculator Solutions?</span>
            </h2>
            
            <p className="calc-cta-description">
              Looking for custom calculators, financial tools, or specialized calculation widgets for your business? 
              Our team can build tailored calculation solutions for your specific needs.
            </p>
            
            <div className="calc-cta-buttons">
              <button className="calc-btn primary">
                Contact Our Team
              </button>
              <button className="calc-btn secondary">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PercentageCalculatorContent;