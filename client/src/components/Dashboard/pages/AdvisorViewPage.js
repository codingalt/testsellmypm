import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { sidebarContext } from "../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import MainContext from "../../Context/MainContext";
import Chat from "../Chat/Chat";
import Sidebar2 from "../sidebar2/Sidebar2";
import AdvisorView from "../Advisors/AdvisorView";

const AdvisorViewPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [loader, setLoader] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState("activeSidebar2");
  const sidebarRef = useRef();
  const toggleSidebar = () => {
    setActive(!active);
    setActiveSidebar("activeSidebar3");
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
    function handleResize() {
      if (window.innerWidth < 768) {
        setActiveSidebar("");
      } else if (window.innerWidth > 768) {
        setActiveSidebar("activeSidebar2");
      }
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {
        <sidebarContext.Provider
          value={{
            isOpen: active,
            toggle: toggleSidebar,
            sidebarRef,
            activeSidebar,
          }}
        >
          {/* Sidebar */}
          {<Sidebar2 />}

          {/* Main Content */}
          <main className={active ? "main" : "main main-reverse"}>
            <Navbar />

            <AdvisorView />
          </main>
        </sidebarContext.Provider>
      }
    </>
  );
};

export default AdvisorViewPage;
