import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { sidebarContext } from "../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import MainContext from "../../../Context/MainContext";
import ManageListings from "../ManageListings/ManageListings";
import CreateAdvisor from "../CreateAdvisor/CreateAdvisor";
import NotFound404 from "../../../NotFound404/NotFound404";

const CreateAdvisorPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {isAdmin} = useContext(MainContext) 
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
      if(!data.success){
        setIsAuthenticated(false);
        navigate('/login')
      }
      setIsAuthenticated(true)
      setLoader(false);
   
    } catch (error) {
      console.log(error);
      navigate("/login");
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    Authenticate();
    console.log(isAdmin);
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
    isAdmin?
      <sidebarContext.Provider
      value={{ isOpen: active, toggle: toggleSidebar,sidebarRef }}
    >
      {/* Sidebar */}
      {<Sidebar />}

      {/* Main Content */}
      <main className={active ? "main" : "main main-reverse"}>
 
        <Navbar />

        {
           <CreateAdvisor />
        }
    
      </main>
      
    </sidebarContext.Provider> : ''
    }

    </>
  );
};

export default CreateAdvisorPage;
