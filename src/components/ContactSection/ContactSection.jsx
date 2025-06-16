import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <div className="contact-wrapper">
     
      <div className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label>First name*</label>
            <input type="text" placeholder="Jane" />
          </div>
          <div className="form-group">
            <label>Last Name*</label>
            <input type="text" placeholder="Smith" />
          </div>
        </div>

        <div className="form-group">
          <label>How can we reach you?*</label>
          <input type="email" placeholder="jane@framer.com" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Where Are you from?*</label>
            <select>
              <option>Select your country...</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>
          <div className="form-group">
            <label>What’s the type of your company?*</label>
            <select>
              <option>Select Category</option>
              <option>Startup</option>
              <option>Enterprise</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Message*</label>
          <textarea placeholder="Type your message..." />
        </div>

        <button className="submit-btn">Submit Now</button>
      </div>

      {/* Right Image Side */}
      <div className="contact-image">
        <img src="/images/B3.jpg" alt="Contact Visual" className='rounded-3xl' />
      </div>
    </div>
  );
};

export default ContactSection;
