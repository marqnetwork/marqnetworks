import React from "react";
import "./TeamSection.css";

const teamMembers = [
  {
    name: "Rameez Javed",
    role: "CEO",
    image: "/images/Rameez.png",
    linkedin: "https://www.linkedin.com/in/danielreed",
  },
  {
    name: "Fawad Khan",
    role: "Co-Founder",
    image: "/images/Fawad.png",
    linkedin: "https://www.linkedin.com/in/jamesturner",
  },
  {
    name: "Daniel Wimberly",
    role: "Regional Partner",
    image: "/images/Daniel.png",
    linkedin: "https://www.linkedin.com/in/michaelcarter",
  },
  {
    name: "Shahzaib Bhatti",
    role: "CEO MarQsoftware House",
    image: "/images/Shahzaib.png",
    linkedin: "https://www.linkedin.com/in/williamscott",
  },
  {
    name: "Maheen Malik",
    role: "Junior Partner",
    image: "/images/Maheen.png",
    linkedin: "https://www.linkedin.com/in/ethanmitchell",
  },
  {
    name: "Yasir Khan",
    role: "Head of Media Department",
    image: "/images/Yasir.png",
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
              alt={member.name}
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
