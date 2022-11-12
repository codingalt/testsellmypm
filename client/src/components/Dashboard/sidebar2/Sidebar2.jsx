import React, { useState, useContext, useEffect } from "react";
import "./sidebar2.css";
import * as bi from "react-icons/bi";
import * as ai from "react-icons/ai";
import * as si from "react-icons/si";
import * as go from "react-icons/go";
import * as cg from "react-icons/cg";
import * as fa from "react-icons/fa";
import * as md from "react-icons/md";
import * as bs from "react-icons/bs";
import * as gr from "react-icons/gr";
import s1 from '../../../images/slider/s1.jpg'
import { sidebarContext } from "../contexts/SidebarContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import MainContext from "../../Context/MainContext";

const Sidebar2 = ({isAvailable}) => {
  const [activeLink, setActiveLink] = useState("");
  const {isAdmin} = useContext(MainContext)
  let pathname = window.location.pathname;
  const { isOpen,toggle,sidebarRef,activeSidebar } = useContext(sidebarContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    pathname = window.location.pathname;
}, [window.location.pathname]);

  const logoutUser = async()=>{
    try {
      const res = await fetch(`/logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if(data.success){
        navigate('/');
        window.location.reload(false)
        setIsAuthenticated(false);
      }
   
    } catch (error) {
      navigate("/login");
      setIsAuthenticated(false);
    }
  }


  return (
    <>
      <aside
        className={isOpen ? "sidebar" : `sidebar ${activeSidebar}`}
        ref={sidebarRef}
      >
        {/* Sidebar Header */}
        {isOpen && <div className="sidebar-header text-dark mb-3 text-cente">
          <NavLink style={{textDecoration:'none'}} to={'/'}>SellMyPM</NavLink>
          </div>}
       
        {/* Sidebar Links */}
        <div className="sidebar-menu">
          <div className="sidebar-links">
            <ul
              style={
                isOpen ? { paddingLeft: ".8rem" } : { paddingLeft: ".5rem" }
              }
            >
            {
                isAdmin? (
                  <>
                <li
                className={pathname.match('/dashboard') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/dashboard" className={pathname.match('/dashboard') ? "white" : ""}>
                  <span className={pathname.match('/dashboard') ? "white" : ""}>
                    <bi.BiHome
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Dashboard</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname.match('/auth/admin/managelisting') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/auth/admin/managelisting" className={pathname.match('/auth/admin/managelisting') ? "white" : ""}>
                  <span className={pathname.match('/auth/admin/managelisting') ? "white" : ""}>
                    <fa.FaListUl
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Manage Listings</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname.match('/auth/admin/createadvisor') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/auth/admin/createadvisor" className={pathname.match('/auth/admin/createadvisor') ? "white" : ""}>
                  <span className={pathname.match('/auth/admin/createadvisor') ? "white" : ""}>
                    <ai.AiOutlineUsergroupAdd
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "33px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Create Advisor</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              </>) : (
                <>
                <li
                className={pathname.match('/dashboard') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/dashboard" className={pathname.match('/dashboard') ? "white" : ""}>
                  <span className={pathname.match('/dashboard') ? "white" : ""}>
                    <bi.BiHome
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Dashboard</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
              to={'/mylistings'}
                className={pathname.match('/mylistings') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/mylistings" className={pathname.match('/mylistings') ? "white" : ""}>
                  <span className={pathname.match('/mylistings') ? "white" : ""}>
                    <fa.FaListUl 
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>My Listings</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname.match('/buyerrequests') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/buyerrequests" className={pathname.match('/buyerrequests') ? "white" : ""}>
                  <span className={pathname.match('/buyerrequests') ? "white" : ""}>
                    <bi.BiGitPullRequest
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Buyer Requests</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname.match('/chat') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/chat" className={pathname.match('/chat') ? "white" : ""}>
                  <span className={pathname.match('/chat') ? "white" : ""}>
                    <bi.BiMessageSquareDots
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Messages</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname.match('/approvedrequests') ? "active-sidebar-li" : ""}
              >
                <NavLink to="/approvedrequests" className={pathname.match('/approvedrequests') ? "white" : ""}>
                  <span className={pathname.match('/approvedrequests') ? "white" : ""}>
                    <ai.AiOutlineFileDone
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Approved Requests</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname.match('/profile') ? "active-sidebar-li sidebar-profile-li" : "sidebar-profile-li"}
              >
                <NavLink to={'/profile'} className={pathname.match('/profile') ? "white" : ""}>
                  <span className={pathname.match('/profile') ? "white" : ""}>
                    <cg.CgProfile
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Profile</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname.match('/advisors') ? "active-sidebar-li sidebar-advisor-li" : "sidebar-advisor-li"}
              >
                <NavLink to={'/advisors'} className={pathname.match('/advisors') ? "white" : ""}>
                  <span className={pathname.match('/advisors') ? "white" : ""}>
                    <gr.GrDocumentUser
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Advisors</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              <li
                className={pathname === "/listing" ? "active-sidebar-li" : ""}
              >
                <NavLink to={'/listing'} className={pathname === "/listing" ? "white" : ""}>
                  <span className={pathname === "/listing" ? "white" : ""}>
                    <go.GoBrowser
                      style={
                        isOpen
                          ? { marginLeft: "0px" }
                          : { marginLeft: "17px", fontSize: "30px" }
                      }
                    />
                  </span>
                  <span className={isOpen ? "" : "sidebar-txt"}>Browse Listings</span>
                </NavLink>
                {isOpen && (
                  <p>
                    <md.MdOutlineArrowForwardIos />{" "}
                  </p>
                )}
              </li>
              </>
              )
              }
            </ul>
          </div>
        </div>
          <div className="logout-container d-flex justify-content-center mt-5">
            <div className="logout mt-5" onClick={logoutUser}>
              <span>Logout</span>
              <span>
                <bi.BiLogOut />
              </span>
            </div>
          </div>
      </aside>
    </>
  );
};

export default Sidebar2;
