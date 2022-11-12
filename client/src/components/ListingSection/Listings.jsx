import React, { useEffect, useState } from "react";
import s1 from "../../images/slider/s1.jpg";
import s2 from "../../images/slider/s2.jpg";
import s3 from "../../images/slider/s3.jpg";
import s4 from "../../images/slider/s4.jpg";
import s5 from "../../images/slider/s5.jpg";
import s6 from "../../images/slider/s6.jpg";
import p1 from "../../images/p1.jfif";
import p2 from "../../images/p2.jfif";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import p5 from "../../images/p5.jfif";
import "./listings.css";
import * as bi from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../Context/MainContext";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const { isPaid } = useContext(MainContext);
  // get All Listings
  const getAllListings = async () => {
    try {
      const res = await fetch(`/listings/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div className="listing-container">
      {/* <!------Categories--> */}
      <section className="categories cat-listing-sec" id="categories">
        <div className="section-header mt-4 mb-5 pb-2">
          <h2 className="section-title">Latest Listings</h2>
        </div>
        <div className="row cat-container custom-cat-container">
          {listings
            ?.filter((val, index, arr) => index > arr.length - 7)
            .map((item, i) => {
              return (
                <div key={item._id} className="card-container border">
                  <NavLink key={item._id} to={"/listings/view/" + item._id}>
                    <img src={item.images[0].url} alt="" />
                    <div className="cat-title">
                      <h5>{item.details.title}</h5>
                    </div>
                    <div className="member-txt">
                      {!isPaid ? (
                        <NavLink className='upgrade' to={'/'}>
                          <span>
                            <bi.BiLockAlt /> Upgrade for Pricing
                          </span>
                        </NavLink>
                      ) : (
                        <NavLink className='upgrade' to={"/listings/view/" + item._id}>
                          <span>Contact for details</span>
                        </NavLink>
                      )}

                      {isPaid ? (
                        <NavLink className='view-more' to={"/listings/view/" + item._id}>
                          <span>View More Info</span>
                        </NavLink>
                      ) : (
                        <NavLink className='view-more' to={"/login"}>
                          <span>Login for more</span>
                        </NavLink>
                      )}
                    </div>
                  </NavLink>
                </div>
              );
            })}
        </div>

        <div className="browse-all">
          <NavLink to={"/listing/"}>
            <button className="button">View All Listings</button>
          </NavLink>
        </div>
      </section>
      {/* <!---End of Categories--> */}
    </div>
  );
};

export default Listings;
