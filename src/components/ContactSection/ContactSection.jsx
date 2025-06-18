import React from 'react';
import './ContactSection.css';

const ContactSection = () => (
  <div className="contact-wrapper">
    <div className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="first-name">First name*</label>
          <input id="first-name" type="text" placeholder="Jane" />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name*</label>
          <input id="last-name" type="text" placeholder="Smith" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">How can we reach you?*</label>
        <input id="email" type="email" placeholder="jane@framer.com" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="country">Where are you from?*</label>
          <select id="country">
            <option>Select your country...</option>
            <option>USA</option>
            <option>UK</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="company-type">What’s the type of your company?*</label>
          <select id="company-type">
            <option>Select Category</option>
            <option>Startup</option>
            <option>Enterprise</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message*</label>
        <textarea id="message" placeholder="Type your message..." />
      </div>

      <button className="submit-btn">Submit Now</button>
    </div>

    <div className="contact-image">
      <img src="/images/B3.jpg" alt="Contact section visual" className="rounded-3xl" />
    </div>
  </div>
);

export default ContactSection;
