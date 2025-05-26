"use client";
import React from 'react'
import './Contact.css'
import ContactIntro from '@/components/ContactIntro/ContactIntro'
import ContactSection from '@/components/ContactSection/ContactSection'
import ContactFAQ from '@/components/ContactFAQ/ContactFAQ'

import JoinUsNow from '@/components/JoinUsNow/JoinUsNow'

const Contact = () => {
  return (
    <div className='Contactt'>
        <ContactIntro/>
        <ContactSection/>
        <ContactFAQ/>
        
         <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }}>
  <JoinUsNow />
</div>
    </div>
  )
}

export default Contact