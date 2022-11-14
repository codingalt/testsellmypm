import React from "react";
import { useContext } from "react";
import { sidebarContext } from "../../../contexts/SidebarContext";
import "./sort-relevance.css";

const SortRelevance = ({ setRelevance }) => {
  const { setSortRelevance, getRelevantAdvisors } = useContext(sidebarContext);
  return (
    <div className="sort-rel shadow border">
      <div className="sort-items">
        <div className="s-item">
          <input defaultChecked type="radio" name="r1" />
          <span>Relevance</span>
        </div>
        <div className="s-item">
          <input
            value="newest"
            onChange={(e) => setSortRelevance(e.target.value)}
            type="radio"
            name="r1"
          />
          <span>Newest</span>
        </div>
      </div>
      <div className="sort-items">
        <div className="s-item">
          <input
            value="oldest"
            onChange={(e) => setSortRelevance(e.target.value)}
            type="radio"
            name="r1"
          />
          <span>Oldest</span>
        </div>
        <div className="s-item">
          <input
            value="lowtohigh"
            onChange={(e) => setSortRelevance(e.target.value)}
            type="radio"
            name="r1"
          />
          <span>Deals closed: Low to high</span>
        </div>
      </div>
      <div className="sort-items">
        <div className="s-item">
          <input
            value="hightolow"
            onChange={(e) => {
              setSortRelevance(e.target.value);
            }}
            type="radio"
            name="r1"
          />
          <span>Deals closed: Hight to low</span>
        </div>
      </div>
      <div className="sort-button">
        <button
          onClick={() => {
            getRelevantAdvisors();
            setRelevance(false);
          }}
          className="button"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SortRelevance;
