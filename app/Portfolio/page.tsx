"use client";
import React from 'react'
import ExplorePortfolio from '@/components/ExplorePortfolio/ExplorePortfolio'
import FAQSection from '@/components/FAQSection/FAQSection'
import JoinUsNow from '@/components/JoinUsNow/JoinUsNow'
import StackingCards from '@/components/Stack/index';


const Portfolio = () => {
  return (
    <div className='portfolio'>

        <ExplorePortfolio/>

        <StackingCards/>
        
        <FAQSection/>
           <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }}>
  <JoinUsNow />
</div>

    </div>
  )
}

export default Portfolio