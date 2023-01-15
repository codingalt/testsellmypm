import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import * as bi from "react-icons/bi";
import { sidebarContext } from "./contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import Cards from "./cards/Cards";
import NoListing from "./NoListing/NoListing";
import { TailSpin } from "react-loader-spinner";
import MainContext from "../Context/MainContext";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [active, setActive] = useState(true);
  const [loader, setLoader] = useState(null);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setActive(!active);
  };

  const Authenticate = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_URI}/auth`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        }),
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

  return (
    <>
      {
        <sidebarContext.Provider
          value={{ isOpen: active, toggle: toggleSidebar }}
        >
          {isAuthenticated && (
            <>
              <Sidebar />

              {/* Main Content */}
              <main className={active ? "main" : "main main-reverse"}>
                <Navbar />
                <Cards />
              </main>
            </>
          )}
        </sidebarContext.Provider>
      }
    </>
  );
};

export default Dashboard;
