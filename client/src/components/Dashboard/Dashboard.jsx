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
  const {isAuthenticated} = useContext(MainContext); 
  const [active, setActive] = useState(true);
  const [loader, setLoader] = useState(null);
  const toggleSidebar = () => {
    setActive(!active);
  };

 
  return (
    <>
    {
      <sidebarContext.Provider
      value={{ isOpen: active, toggle: toggleSidebar }}
    >
      {/* Sidebar */}
      {<Sidebar />}

      {/* Main Content */}
      <main className={active ? "main" : "main main-reverse"}>
     
        {/* Navbar */}
        <Navbar />

        {/* Cards  */}
        {
          isAuthenticated && 
          <>
          <Cards />
        </>
        }
    
      </main>
      
    </sidebarContext.Provider>
    }

    </>
  );
};

export default Dashboard;
