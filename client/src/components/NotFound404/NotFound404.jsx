import React from "react";
import { NavLink } from "react-router-dom";

const NotFound404 = () => {
  const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
    height: "95vh",
  };
  return (
    <div className="not-found" style={styles}>
      <h1
        style={{ fontSize: "9rem", letterSpacing: "7px" }}
        className="text-danger"
      >
        404
      </h1>
      <h4>Page Not Found!</h4>
      <NavLink className="text-white" to={"/"}>
        <button
          className="btn btn-primary"
          style={{ width: "14rem", height: "2.9rem" }}
        >
          Go Back
        </button>
      </NavLink>
    </div>
  );
};

export default NotFound404;
