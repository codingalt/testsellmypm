import React from "react";
import "./skeleton.css";
const ListingSkeleton = () => {
  return (
    <>
      <div className="col-md-3 mb-4">
        <div className="card loading">
          <div className="image"></div>
          <div className="content">
            <h4></h4>
            <div className="description"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingSkeleton;
