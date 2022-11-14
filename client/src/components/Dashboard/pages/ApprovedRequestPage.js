import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { sidebarContext } from "../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import BuyerRequests from "../BuyerRequests/BuyerRequests";
import ApprovedListings from "../ApprovedListings/ApprovedListings";

const ApprovedRequestPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [loader, setLoader] = useState(null);
  const sidebarRef = useRef();
  const toggleSidebar = () => {
    setActive(false);
  };
  const Authenticate = async () => {
    setLoader(true);
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
        navigate("/login");
      }
      setIsAuthenticated(true);
      setLoader(false);
    } catch (error) {
      console.log(error);
      navigate("/login");
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    Authenticate();
  }, []);
  useEffect(() => {
    const handler = (event) => {
      if (!sidebarRef.current?.contains(event.target)) {
        setActive(true);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      {
        <sidebarContext.Provider
          value={{ isOpen: active, toggle: toggleSidebar, sidebarRef }}
        >
          {/* Sidebar */}
          {<Sidebar />}

          {/* Main Content */}
          <main className={active ? "main" : "main main-reverse"}>
            <Navbar />

            {<ApprovedListings />}
          </main>
        </sidebarContext.Provider>
      }
    </>
  );
};

export default ApprovedRequestPage;
