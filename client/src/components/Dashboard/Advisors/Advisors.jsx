import React from "react";
import FilterAdvisor from "./FilterAdvisor";
import "./advisors.css";
import AdvisorCard from "./AdvisorCard";
import { TailSpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { sidebarContext } from "../contexts/SidebarContext";

const Advisors = ({loader}) => {
  const { advisors } = useContext(sidebarContext);

  return (
    <div className="advisor-container">
       <TailSpin
        height="60"
        width="60"
        color="#744BBE"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="loader_wrapper2"
        visible={loader}
      />
      <FilterAdvisor />
      <div className="row advisor-row">
        {advisors?.map((item, i) => (
          <AdvisorCard loader={loader} key={item._id} advisors={item} />
        ))}
      </div>
      {
          !loader &&
          advisors?.length === 0 &&
          <div className="no-advisor alert alert-warning p-3">
            <h3 className='text-center'>No Advisor Found!</h3>
          </div>
        }
    </div>
  );
};

export default Advisors;
