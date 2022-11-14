import React from "react";
import { useContext } from "react";
import { sidebarContext } from "../../../contexts/SidebarContext";

const DealsClosed = ({ setDealsClosed }) => {
  const { setLessThan, setGreaterThan, sortByDealsClosed } =
    useContext(sidebarContext);
  return (
    <div className="sort-rel shadow border expertise-dropdown">
      <div className="sort-items">
        <div className="s-item">
          <input
            onChange={() => {
              setLessThan(10);
              setGreaterThan(0);
            }}
            type="radio"
            name="r1"
          />
          <span>0 - 10</span>
        </div>
        <div className="s-item">
          <input
            onChange={() => {
              setLessThan(50);
              setGreaterThan(10);
            }}
            type="radio"
            name="r1"
          />
          <span>10 - 50</span>
        </div>
      </div>
      <div className="sort-items">
        <div className="s-item">
          <input
            onChange={() => {
              setLessThan(100);
              setGreaterThan(50);
            }}
            type="radio"
            name="r1"
          />
          <span>50 - 100</span>
        </div>
        <div className="s-item">
          <input
            onChange={() => {
              setLessThan(2000);
              setGreaterThan(100);
            }}
            type="radio"
            name="r1"
          />
          <span>more than 100</span>
        </div>
      </div>

      <div className="sort-button">
        <button
          onClick={() => {
            sortByDealsClosed();
            setDealsClosed(false);
          }}
          className="button"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DealsClosed;
