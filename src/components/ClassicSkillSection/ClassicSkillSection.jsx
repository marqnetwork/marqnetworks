import React from "react";
import "./ClassicSkillSection.css";
import MarqButton from '../MarqButton/MarqButton';
import Link from "next/link";


const ClassicSkillSection = () => {
  return (
    <section className="classic-skill">
      <div className="classic-skill__image">
        <img src="/images/classic skill.png" alt="MarQ team in action—partnering closely with clients to deliver growth through embedded strategy and code" />
      </div>

      <div className="classic-skill__content">
        <span className="classic-skill__tag">• About marQ</span>

        <h2 className="classic-skill__headline">
          An Agency Where<br />
          <span>AI Meets Craft.</span>
        </h2>

        <h4>Your Growth, Our Benchmark</h4>
        <p className="classic-skill__description">
          marQ Networks embeds with your team to unlock the KPIs via AI workflow transformation that matter most—revenue, retention, runway.
        </p>

        <h4>Partners You Can Trust</h4>
        <p className="classic-skill__description">
          From brand story to conversion-focused architecture, we bring senior strategy and hands-on execution in one unified squad.
        </p>

        <div className="classic-skill__actions">
          <MarqButton className="classic-skill__button" />
          <div className="classic-skill__rating">
  <Link href="/digital-growth-solutions#creative-logics">
    <button className="btn secondary">Explore Branding Services</button>
  </Link>
</div>

        </div>
      </div>
    </section>
  );
};

export default ClassicSkillSection;
