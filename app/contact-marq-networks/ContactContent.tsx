"use client";
import React from 'react';
import './Contact.css';

import ContactIntro from '@/components/ContactIntro/ContactIntro';
import ContactSection from '@/components/ContactSection/ContactSection';
import ContactFAQ from '@/components/ContactFAQ/ContactFAQ';
import JoinUsNow from '@/components/JoinUsNow/JoinUsNow';

const Contact = () => {
  return (
    <div className="contact">
      <ContactIntro />
      <ContactSection />
      <ContactFAQ />
      
      {/* Centered Join Section */}
      <div className="contact__join-wrapper">
        <JoinUsNow />
      </div>
    </div>
  );
};

export default Contact;
