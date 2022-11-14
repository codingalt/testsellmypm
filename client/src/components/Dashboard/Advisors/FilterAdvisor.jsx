import React, { Fragment, useRef, useEffect, useState } from "react";
import { useContext } from "react";
import * as bs from "react-icons/bs";
import { sidebarContext } from "../contexts/SidebarContext";
import DealsClosed from "./Dropdowns/DealsClosed/DealsClosed";
import Expertise from "./Dropdowns/Expertise/Expertise";
import SortRelevance from "./Dropdowns/SortRelevance/SortRelevance";

const FilterAdvisor = () => {
  const [relevance, setRelevance] = useState(false);
  const [expertise, setExpertise] = useState(false);
  const [dealsClosed, setDealsClosed] = useState(false);
  const { handleKeyDown, setKeyword } = useContext(sidebarContext);
  return (
    <>
      <div className="filter-row filter-advisor">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 filter-left">
              <div className="custom-select">
                <div onClick={() => setRelevance(!relevance)}>
                  <span>Sort: Relevance</span>
                  <span>
                    {relevance ? <bs.BsChevronUp /> : <bs.BsChevronDown />}
                  </span>
                </div>
                {relevance && <SortRelevance setRelevance={setRelevance} />}
              </div>
              <div className="custom-select">
                <div onClick={() => setExpertise(!expertise)}>
                  <span>Expertise</span>
                  <span>
                    {expertise ? <bs.BsChevronUp /> : <bs.BsChevronDown />}
                  </span>
                </div>
                {expertise && <Expertise setExpertise={setExpertise} />}
              </div>
              <div className="custom-select">
                <div onClick={() => setDealsClosed(!dealsClosed)}>
                  <span>Deals Closed</span>
                  <span>
                    {dealsClosed ? <bs.BsChevronUp /> : <bs.BsChevronDown />}
                  </span>
                </div>
                {dealsClosed && <DealsClosed setDealsClosed={setDealsClosed} />}
              </div>
            </div>
            <div className="col-md-4 filter-right">
              <div className="nav-search search-advisor">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={(event) => setKeyword(event.target.value)}
                  className=""
                  type="text"
                  placeholder="Search Advisors.."
                />
                <bs.BsSearch className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterAdvisor;
