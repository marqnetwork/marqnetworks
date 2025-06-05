"use client";
import React from 'react'
import ExplorePortfolio from '@/components/ExplorePortfolio/ExplorePortfolio'
import PortfolioFAQ from '@/components/PortfolioFAQ/PortfolioFAQ'
import JoinUsNow from '@/components/JoinUsNow/JoinUsNow'
import Portfoliostack1 from '@/components/portfoliostack1/portfoliostack1'
import Portfoliostack2 from'@/components/Portfoliostack2/Portfoliostack2'
import Portfoliostack3 from '@/components/Portfoliostack3/Portfoliostack3'
import StackingNewCard from '@/components/StackingCardsNew/stackingnewCard';


const Portfolio = () => {
  return (
    <div className='portfolio'>

        <ExplorePortfolio/>
        <div style={{ textAlign:'center' }}>
        {/* <Portfoliostack1/> */}
                <StackingNewCard/>
        
        </div>

        <div style={{ textAlign:'center' }}>
        {/* <Portfoliostack2/> */}
        <StackingNewCard/>

        </div>

        <div style={{ textAlign:'center' }}>
        {/* <Portfoliostack3/> */}
        <StackingNewCard/>

        </div>

      
       

        <br /><br />
        
       < PortfolioFAQ/>
           <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }}>
  <JoinUsNow />
</div>

    </div>
  )
}

export default Portfolio