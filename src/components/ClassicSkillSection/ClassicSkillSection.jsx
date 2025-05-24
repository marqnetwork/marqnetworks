import React from "react";
import "./ClassicSkillSection.css";

const ClassicSkillSection = () => {
  return (
    <section className="classic-skill">
      <div className="classic-skill__image">
        <img src="/images/classic skill.png" alt="skill" />
      </div>

      <div className="classic-skill__content">
        <span className="classic-skill__tag">• About marQ</span>
        <h2 className=" text-[45px] text-base/16 ">
          An Agency Where<br/>
          <span> Craft Meets Code.</span>
        </h2>

        <h4>Your Growth, Our Benchmark</h4>
        <p className="text-[#aaa] text-[0.9rem] font-light leading-[1.8] mb-8 text-left">
          marQ Networks embeds with your team to unlock the KPIs that really
          <br />
          matter—revenue, retention, and runway.
        </p>

        <h4>Partners You Can Trust</h4>

        <p className="classic-skill__description">
          From brand story to backend architecture, we bring senior-level
          strategy <br />
          and hands-on execution in one unified squad.
        </p>

        <div className="classic-skill__actions">
          <button className="classic-skill__button">Book an Appointment</button>
          <div className="classic-skill__rating">
            <span className="classic-skill__stars">★★★★★</span>
            <span className="classic-skill__reviews">
              200+ businesses scaled
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassicSkillSection;
