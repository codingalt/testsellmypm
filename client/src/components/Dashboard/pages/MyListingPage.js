import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { sidebarContext } from "../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import MainContext from "../../Context/MainContext";
import MyListings from "../MyListings/MyListings";

const MyListingPage = () => {
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

            {<MyListings />}
          </main>
        </sidebarContext.Provider>
      }
    </>
  );
};

export default MyListingPage;
