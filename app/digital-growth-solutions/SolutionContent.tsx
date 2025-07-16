"use client";
import React from 'react'

import SolutionSection from '@/components/SolutionSection/SolutionSection'
import SolutionPillars from '@/components/SolutionPillars/SolutionPillars'
import Piller2 from '@/components/Pillar2/Pillar2'
import Piller3 from '@/components/Pillar3/Pillar3'
import Piller4 from '@/components/Pillar4/Pillar4'
import Piller5 from '@/components/Pillar5/Pillar5'
import JoinUsNow from '@/components/JoinUsNow/JoinUsNow'
import SolutionFAQ from "@/components/SolutionFAQ/ContactFAQ";

const Solution = () => {
  return (
    <div className="Solution1">

      <SolutionSection/>
      <SolutionPillars/>
      <Piller2/>
      <Piller3/>
       <Piller4/>
        <Piller5/>
        <SolutionFAQ/>
            <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }}>
  <JoinUsNow />
</div>

    </div>
  )
}

export default Solution;
