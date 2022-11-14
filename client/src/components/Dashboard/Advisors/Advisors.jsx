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

const Advisors = () => {
  const [loader, setLoader] = useState(null);
  const { advisors } = useContext(sidebarContext);

  return (
    <div className="advisor-container">
      <FilterAdvisor />
      <div className="row advisor-row">
        {advisors?.map((item, i) => (
          <AdvisorCard loader={loader} key={item._id} advisors={item} />
        ))}
      </div>
    </div>
  );
};

export default Advisors;
