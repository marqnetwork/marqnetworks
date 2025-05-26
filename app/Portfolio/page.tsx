"use client";
import React from 'react'
import ExplorePortfolio from '@/components/ExplorePortfolio/ExplorePortfolio'
import PortfolioFAQ from '@/components/PortfolioFAQ/PortfolioFAQ'
import JoinUsNow from '@/components/JoinUsNow/JoinUsNow'
import StackingCards from '@/components/Stack/index';


const Portfolio = () => {
  return (
    <div className='portfolio'>

        <ExplorePortfolio/>

        <StackingCards/>
        <StackingCards/>
        <StackingCards/>

        <br /><br />
        
       < PortfolioFAQ/>
           <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }}>
  <JoinUsNow />
</div>

    </div>
  )
}

export default Portfolio