import React, { useState } from "react";
import "./pricing.css";
import * as ai from "react-icons/ai";
import { useContext } from "react";
import MainContext from "../Context/MainContext";
import PaymentModal from "../Dashboard/Modals/PaymentModal/PaymentModal";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Pricing = () => {
  const { memberShipRef } = useContext(MainContext);
  const [modalShow, setModalShow] = useState(false);
  const { isAuthenticated } = useContext(MainContext);
  const navigate = useNavigate();

  const toastHandle = (result, message) => {
    if (result) {
      toast.success(message, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleFreePlan = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      toastHandle(true, "You are already in free Plan");
    }
  };

  const handleAuth = () => {
    if (!isAuthenticated) {
      setModalShow(false);
      toastHandle(
        false,
        "You are not logged in! Please login first or signup if you don't have an account"
      );
      navigate("/login");
    } else {
      setModalShow(true);
    }
  };

  return (
    <div ref={memberShipRef} className="pricing-wrapper">
      <ToastContainer />
      <PaymentModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="section-header mb-4 pb-2">
        <h2
          data-aos="fade-left"
          data-aos-duration="900"
          className="section-title"
        >
          Simple, transparent pricing
        </h2>
        <h6
          data-aos="fade-right"
          data-aos-duration="900"
          className="section-title-h6"
        >
          Whether it's your first time selling or buying, we've got the right
          plan for you
        </h6>
      </div>
      <div className="p-inner">
        <div
          data-aos="fade-up"
          data-aos-duration="1700"
          className="p-table basic"
          style={{ boxShadow: "none", background: "transparent" }}
        >
          <div className="price-section" style={{ background: "transparent" }}>
            <div className="price-area" style={{ background: "transparent" }}>
              <div className="">
                <span className="text"></span>
                <span className="price"></span>
              </div>
            </div>
          </div>
          <div
            className="package-name pkg-name1"
            style={{ border: "none", background: "none" }}
          ></div>
          <ul
            data-aos="fade-up"
            data-aos-duration="1750"
            className="features feature1"
            style={{ border: "none" }}
          >
            <li>
              <span className="list-name">For</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>
            <li>
              <span className="list-name">Browse Marketplace</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>
            <li>
              <span className="list-name">Create an advert</span>
              <span className="icon cross">
                <i className="fas fa-times"></i>
              </span>
            </li>
            <li>
              <span className="list-name">Reach out to an advert</span>
              <span className="icon cross">
                <i className="fas fa-times"></i>
              </span>
            </li>
            <li>
              <span className="list-name">Quality Review </span>
              <span className="icon cross">
                <i className="fas fa-times"></i>
              </span>
            </li>
            <li>
              <span className="list-name">Advert Live on Site for</span>
              <span className="icon cross">
                <i className="fas fa-times"></i>
              </span>
            </li>
          </ul>
          {/* <div className="btn"><button>Purchase</button></div> */}
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="p-table premium"
        >
          <div className="ribbon">
            <span>Recommend</span>
          </div>
          <div className="price-section">
            <div className="price-area">
              <div className="inner-area">
                <span className="text">$</span>
                <span className="price">10</span>
              </div>
            </div>
          </div>
          <div className="package-name"></div>
          <ul data-aos="fade-up" data-aos-duration="2050" className="features">
            <li>
              <span className="list-name list-name-1">
                Property Managers ready to buy or sell
              </span>
              <span className="list-name list-name-1">
                Property Managers ready to buy or sell
              </span>
              {/* <span className="icon check"><ai.AiOutlineCheck /></span> */}
            </li>
            <li>
              <span className="list-name">Browse Marketplace</span>
              <span className="list-name">Yes</span>
              <span className="icon check">
                <ai.AiOutlineCheck />
              </span>
            </li>
            <li>
              <span className="list-name">Create an advert</span>
              <span className="list-name">3</span>
              <span className="icon check">
                <ai.AiOutlineCheck />
              </span>
            </li>
            <li>
              <span className="list-name">React out to an advert</span>
              <span className="list-name">Yes</span>
              <span className="icon check">
                <ai.AiOutlineCheck />
              </span>
            </li>
            <li>
              <span className="list-name">Quality Review</span>
              <span className="list-name">No</span>
              <span className="icon cross">
                <ai.AiOutlineClose />
              </span>
            </li>
            <li>
              <span className="list-name">Advert Live on site for</span>
              <span className="list-name">12 weeks</span>
              <span className="icon check">
                <ai.AiOutlineCheck />
              </span>
            </li>
          </ul>
          <div className="btn">
            <button onClick={handleAuth}>Choose Plan</button>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2100"
          className="p-table ultimate"
        >
          <div className="price-section">
            <div className="price-area">
              <div className="inner-area">
                <span className="text">$</span>
                <span className="price">0.0</span>
              </div>
            </div>
          </div>
          <div className="package-name"></div>
          <ul data-aos="fade-up" data-aos-duration="2150" className="features">
            <li>
              <span className="list-name list-name-1">
                Aspiring buyers and sellers
              </span>
              <span className="list-name list-name-1">
                Aspiring buyers and sellers
              </span>
              {/* <span className="icon cross"><ai.AiOutlineClose /></span> */}
            </li>
            <li>
              <span className="list-name">Browse Marketplace</span>
              <span className="list-name">Yes</span>
              <span className="icon check">
                <ai.AiOutlineCheck />
              </span>
            </li>
            <li>
              <span className="list-name">Create an advert</span>
              <span className="list-name">No</span>
              <span className="icon cross">
                <ai.AiOutlineClose />
              </span>
            </li>
            <li>
              <span className="list-name">Reach out to an advert</span>
              <span className="list-name">No</span>
              <span className="icon cross">
                <ai.AiOutlineClose />
              </span>
            </li>
            <li>
              <span className="list-name">Quality Review</span>
              <span className="list-name">No</span>
              <span className="icon cross">
                <ai.AiOutlineClose />
              </span>
            </li>
            <li>
              <span className="list-name">Advert Live on site</span>
              <span className="list-name">N/A</span>
              <span className="icon cross">
                <ai.AiOutlineClose />
              </span>
            </li>
          </ul>
          <NavLink to={"#"} onClick={handleFreePlan}>
            <div className="btn">
              <button>Choose Plan</button>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
