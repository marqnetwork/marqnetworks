"use client";
import React from 'react';
import ExplorePortfolio from '@/components/ExplorePortfolio/ExplorePortfolio';
import PortfolioFAQ from '@/components/PortfolioFAQ/PortfolioFAQ';
import JoinUsNow from '@/components/JoinUsNow/JoinUsNow';
import StackingNewCard from '@/components/StackingCardsNew/stackingnewCard';
import StackingCardApp from '@/components/StackingCardApp/stackingnewCard' 

const Portfolio = () => {
  return (
    <div className="portfolio">
      <ExplorePortfolio />

      {/* Portfolio Stacks */}
      <div className="portfolio__stack-wrapper">
        <StackingCardApp  />
      </div>

      <div className="portfolio__stack-wrapper">
        <StackingNewCard />
      </div>

      <div className="portfolio__stack-wrapper">
        <StackingNewCard />
      </div>

      <br /><br />

      <PortfolioFAQ />

        <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }}>
  <JoinUsNow />
</div>
    </div>
  );
};

export default Portfolio;
