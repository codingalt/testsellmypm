import React from "react";
import profile from "../../../images/avatar.png";
import * as bs from "react-icons/bs";
import * as md from "react-icons/md";
import * as fi from "react-icons/fi";
import { NavLink } from "react-router-dom";
import loadingProfile from '../../../images/loadingProfile.png'
import { useState } from "react";
import { useEffect } from "react";

const AdvisorCard = ({advisors,loader}) => {
  const [loading,setLoading] = useState(null)
  useEffect(()=>{
    setLoading(loader)
  },[loader]);
  return (
    <div className="col-md-6">
      <div className="advisor-card shadow-sm">
        <div className="linkdin">
          <a href={advisors?.linkdin} target='_blank'>
            Linkdin<fi.FiArrowUpRight />
          </a>
        </div>

        <div className="a-details">
          <div className="c-profile">
            <img src={loading? loadingProfile : advisors.profilePicture?.url } alt="" />
          </div>
          <div className="info">
            <div className="c-top">
              <div className="name">{advisors?.name}</div>
              <div className="c-award">
                <span>
                  <bs.BsTrophyFill />
                </span>
                <span>Top closer</span>
              </div>
            </div>
            <div className="card-title">
            {advisors?.title}
            </div>
            <div className="a-location">
              <span>
                <md.MdLocationOn />
              </span>
              <span>{advisors?.location}</span>
            </div>
          </div>
        </div>

        <div className="expertise">
            <span>Expertise</span>
            <span>{advisors?.expertise[0]}, {advisors?.expertise[1]}, {advisors?.expertise[2]}, {advisors?.expertise[3]}</span>
        </div>

        <div className="deal-info" style={{alignItems:'flex-start'}}>
            <div className="inner">
                <span>Preferred deal size</span>
                <span>{advisors?.dealSize}</span>
            </div>
            <div className="inner">
                <span>On SellMyPm since</span>
                <span>{advisors?.since}</span>
            </div>
            <div className="inner">
                <span>Deals closed</span>
                <span>{advisors?.dealsClosed}</span>
            </div>
        </div>
        <div className="card-footer">
          <NavLink to={`/advisor/${advisors?._id}`}>
            <button className="card-button button">
                <span>View Profile</span>
                <span><fi.FiArrowRight /></span>
            </button>
            </NavLink>
        </div>

      </div>
    </div>
  );
};

export default AdvisorCard;
