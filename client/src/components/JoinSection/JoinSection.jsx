import React from "react";
import "./join-section.css";
import * as bs from "react-icons/bs";
import { NavLink } from "react-router-dom";

const JoinSection = () => {
  return (
    <div className="join-container">
      <div className="join-card">
        <span data-aos="fade-up" data-aos-duration="1000">
          Access hundreds of PMs who want to sell. Instantly. Search hundreds of
          vetted PMs to find your perfect match.
        </span>
        <NavLink to={"/signup"}>
          <button className="button">
            Join Now <bs.BsArrowRight />
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default JoinSection;
