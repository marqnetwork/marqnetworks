"use client";
import React from 'react';
import ExplorePortfolio from '@/components/ExplorePortfolio/ExplorePortfolio';
import PortfolioFAQ from '@/components/PortfolioFAQ/PortfolioFAQ';
import JoinUsNow from '@/components/JoinUsNow/JoinUsNow';
import StackingCardApp from '@/components/StackingCardApp/stackingnewCard'; 
import StackingCardWeb from '@/components/StackingCardWeb/stackingnewCard';
import StackingCardSocial from '@/components/StackingCardSocial/stackingnewCard';
import StackingCardGraphics from '@/components/StackingCardGraphics/stackingnewCard';
import StackingCardMerchandise from '@/components/StackingCardMerchandise/stackingnewCard';
import StackingCardLogos from '@/components/StackingCardLogos/stackingnewCard';
import Mobilehead from '@/components/Mobilehead/LandinBenefits';
import Webhead from '@/components/Webhead/LandinBenefits';
import Socialhead from '@/components/Socialhead/LandinBenefits';
import Graphichead from '@/components/Graphichead/LandinBenefits';
import Merchandisehead from '@/components/Merchandisehead/LandinBenefits';
import Logohead from '@/components/Logohead/LandinBenefits';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <ExplorePortfolio />

      <Mobilehead/>

      <div className="portfolio__stack-wrapper">
        <StackingCardApp  />
      </div>

      <Webhead/>

      <div className="portfolio__stack-wrapper">
        <StackingCardWeb />
      </div>

       <Socialhead/>

      <div className="portfolio__stack-wrapper">
        <StackingCardSocial />
      </div>

         <Graphichead/>
      <div className="portfolio__stack-wrapper">
        <StackingCardGraphics />
      </div>

       <Merchandisehead/>
      <div className="portfolio__stack-wrapper">
        <StackingCardMerchandise />
      </div>

      <Logohead/>
      
      <div className="portfolio__stack-wrapper">
        <StackingCardLogos />
      </div>

      <PortfolioFAQ />

        <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }}>
  <JoinUsNow />
</div>
    </div>
  );
};

export default Portfolio;
