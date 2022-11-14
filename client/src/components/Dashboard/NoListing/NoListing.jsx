import React from "react";
import "./no-listing.css";
import * as fa from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NoListing = () => {
  return (
    <div className="no-listing">
      <div className="inner-box border shadow-sm">
        <div className="icon">
          <fa.FaListUl />
        </div>
        <div className="title">
          <span>You Currently have no live listings</span>
        </div>
        <div className="descipt">
          <span className="text-secondary">
            Create a new For Sale or Wanted listing
          </span>
        </div>
        <div className="buttons">
          <NavLink to={"/listing/post"}>
            <button style={{ borderRadius: "10px" }} className="button">
              Post New Listing
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NoListing;
