import React from "react";
import "./success-payment.css";
import * as bs from "react-icons/bs";
import TopNav from "../topnav/TopNav";
import Menu from "../Menu/Menu";
import { NavLink, useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
    window.location.reload(false);
  };
  return (
    <>
      <TopNav />
      <Menu />
      <div className="success-pay">
        <div className="inner">
          <div className="top">
            <span>
              <bs.BsCheck2 />
            </span>
            <span>Payment Success</span>
          </div>
          <div className="bottom">
            <span>
              Congrats! Your Subscription Plan has been activated Successfully
            </span>
            <button onClick={handleGoBack} className="button">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPayment;
