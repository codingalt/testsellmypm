import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./top-nav.css";

const TopNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  const Authenticate = async () => {
    try {
      const res = await fetch(`/auth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    Authenticate();
  }, []);

  return (
    <div className="top-nav border">
      <div className="left">
        <a href="mailto:support@sellmypm.com">
          <span>Need some help?</span>
        </a>
      </div>
      <div className="right">
        <ul className="r-items">
          {!isAuthenticated ? (
            <>
              <NavLink to={"/login"}>
                <li>Login</li>
              </NavLink>
              <NavLink to={"/signup"}>
                <li>Register</li>
              </NavLink>
            </>
          ) : (
            ""
          )}

          <li>About</li>
          <a href="mailto:support@sellmypm.com">
            <li>Contact Us</li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
