import React, { useState, useEffect } from "react";
import * as fa from "react-icons/fa";
import * as bs from "react-icons/bs";
import * as bi from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import final from "../../images/final.png";
import wantedImages, { sellImages } from "../navbar/catImages";
import "./menu.css";
import { useContext } from "react";
import MainContext from "../Context/MainContext";

const Menu = () => {
  const [navbar, setNavbar] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { memberShipScrollHandle } = useContext(MainContext);

  const handleAuthenticate = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
      return;
    } else {
      navigate("/login");
    }
  };

  const Authenticate = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URI}/auth`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  // get All categories

  const getCategories = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URI}/categories`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      setCategories([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtoken");
    window.location.reload(false);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    Authenticate();
    getCategories();
  }, []);

  const toggleNavbar = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <nav className={navbar ? "navbar active shadow-sm" : "navbar shadow-sm"}>
        <div className="logo">
          <NavLink to="/">
            <img className="" src={final} alt="" />
          </NavLink>
        </div>
        <div className={toggle ? "navbar-toggle nav-items" : "nav-items"}>
          <ul className="ul">
            <NavLink to={"/sellers"}>
              <li>Sellers</li>
            </NavLink>
            <NavLink to={"/buyers"}>
              <li>Buyers</li>
            </NavLink>
            <li className="menu-item-has-children">
              <NavLink to="/listing">
                Browse Listings <bs.BsChevronDown />
              </NavLink>
              <div className="menu-subs border menu-column-1">
                <div className="container mx-auto">
                  <div className="mx-auto inner">
                    <div className="">
                      <ul>
                        <li>
                          <a href="#">Wanted</a>
                        </li>
                        {categories
                          ?.filter((item, i) => item.type === "wanted")
                          .map((item, i) => {
                            return (
                              <NavLink
                                key={item._id}
                                to={"/listing/" + item._id}
                              >
                                <li key={item._id}>
                                  {/* <img src={wantedImages[i].path} alt="" /> */}
                                  <div className="sub-menu-icon">
                                    {wantedImages[i].path}
                                  </div>
                                  <a href="#">{item.name}</a>
                                </li>
                              </NavLink>
                            );
                          })}
                      </ul>
                    </div>
                    <div className="">
                      <ul>
                        <li>
                          <a href="#">For Sale</a>
                        </li>
                        {categories
                          ?.filter((item, i) => item.type === "sell")
                          .map((item, i) => {
                            return (
                              <NavLink
                                key={item._id}
                                to={"/listing/" + item._id}
                              >
                                <li key={item._id}>
                                  <div className="sub-menu-icon">
                                    {sellImages[i].path}
                                  </div>
                                  <a href="#">{item.name}</a>
                                </li>
                              </NavLink>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <a href="mailto:support@sellmypm.com">
              <li>Company</li>
            </a>

            {isAuthenticated ? (
              <NavLink className="dashboard-mob-menu" to={"/dashboard"}>
                <li>Dashboard</li>
              </NavLink>
            ) : (
              <NavLink className="dashboard-mob-menu" to={"/login"}>
                <li>Login</li>
              </NavLink>
            )}
          </ul>
        </div>
        {/* Right Side  */}
        <div className="right">
          <div className="menu_right">
            {isAuthenticated ? (
              <a to={""} onClick={handleLogout}>
                Logout
              </a>
            ) : (
              <a to={""} onClick={handleAuthenticate}>
                Login
              </a>
            )}

            {isAuthenticated ? (
              <NavLink to={"/dashboard"}>
                <button className="button2">
                  Dashboard <bs.BsArrowRight />
                </button>
              </NavLink>
            ) : (
              <NavLink to={"/signup"}>
                <button className="button2">
                  Join Now <bs.BsArrowRight />
                </button>
              </NavLink>
            )}
          </div>
          <div className="toggle" onClick={toggleNavbar}>
            <fa.FaBars />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
