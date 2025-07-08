import React from "react";
import "./TeamSection.css";

const teamMembers = [
  {
    name: "Rameez Javed",
    role: "CEO & Founder",
    image: "/images/Rameez.png",
    alt: "Rameez Javed, CEO & Founder of MarQ Networks — growth strategy consultant and AI business roadmap expert for startups and enterprises.",
    linkedin: "https://www.linkedin.com/in/danielreed",
  },
  {
    name: "Fawad Khan",
    role: "COO & Co-Founder",
    image: "/images/Fawad.png",
    alt: "Fawad Khan, COO & Co-Founder of MarQ Networks — expert in AI business roadmaps and go-to-market strategy execution for scalable digital transformation.",
    linkedin: "https://www.linkedin.com/in/jamesturner",
  },
  {
    name: "Shahzaib Bhatti",
    role: "CTO MarQsoftware House",
    image: "/images/Shahzaib.png",
    alt: "Shahzaib Bhatti, CTO of MarQ Software House — leading custom software development, headless ecommerce solutions, and Next.js web application architecture.",
    linkedin: "https://www.linkedin.com/in/michaelcarter",
  },
  {
    name: "Daniel Wimberly",
    role: "Regional Partner",
    image: "/images/Daniel.png",
    alt: "Daniel Wimberly, Regional Partner at MarQ Networks — supporting international expansion and offshore excellence through client-aligned operations.",
    linkedin: "https://www.linkedin.com/in/williamscott",
  },
  {
    name: "Maheen Malik",
    role: "CMO & Junior Partner",
    image: "/images/Maheen.png",
    alt: "Maheen Malik, CMO & Junior Partner at MarQ Networks — driving funnel marketing, lead generation services, and AI-powered brand growth",
    linkedin: "https://www.linkedin.com/in/ethanmitchell",
  },
  {
    name: "Yasir Khan",
    role: "Head of Media Department",
    image: "/images/Yasir.png",
    alt: "Yasir Khan, Head of Media Department at MarQ Networks — leading creative visual campaigns and AI-enhanced content strategy across channels.",
    linkedin: "https://www.linkedin.com/in/isabellahughes",
  },
];


const TeamSection = () => {
  return (
    <section className="team-members">
      <div className="team-members__grid">
        {teamMembers.map((member, index) => (
          <a
            key={index}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img
              src={member.image}
              alt={member.alt}
              className="team-card__img"
            />

            <div className="team-card__info">
              <div className="team-card__text">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </div>
              {/* <button className="team-card__btn">
                <img
                  src="/images/icon.png"
                  alt="LinkedIn Icon"
                  className="team-card__icon"
                />
              </button> */}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
