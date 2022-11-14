import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { sidebarContext } from "../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import MainContext from "../../Context/MainContext";
import Chat from "../Chat/Chat";
import Sidebar2 from "../sidebar2/Sidebar2";
import Advisors from "../Advisors/Advisors";

const AdvisorPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [loader, setLoader] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState("activeSidebar2");
  const sidebarRef = useRef();
  const [advisors, setAdvisors] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortRelevance, setSortRelevance] = useState("");
  const [sortExpertise, setSortExpertise] = useState("");
  const [lessThan, setLessThan] = useState(0);
  const [greaterThan, setGreaterThan] = useState(0);
  const toggleSidebar = () => {
    setActive(!active);
    setActiveSidebar("activeSidebar3");
  };

  const getAdvisors = async () => {
    setLoader(true);
    const res = await fetch(`/advisors/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setAdvisors(data.advisors);
    }
    setLoader(false);
  };

  const getAdvisorsBySearch = async () => {
    if (keyword === "") {
      return;
    }
    setLoader(true);
    const res = await fetch(`/advisors/?keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setAdvisors(data.advisors);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (keyword === "") {
      getAdvisors();
    }
  }, [keyword]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getAdvisorsBySearch();
    }
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

  const getRelevantAdvisors = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/advisors/relevant/${sortRelevance}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setAdvisors(data.advisors);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sortByExpertise = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/advisors/sortbyexpertise/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          expertise: sortExpertise,
        }),
      });
      const data = await res.json();
      if (data) {
        setAdvisors(data.advisors);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sortByDealsClosed = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/advisors/sortbydeals/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          lessThan: lessThan,
          greaterThan: greaterThan,
        }),
      });
      const data = await res.json();
      if (data) {
        setAdvisors(data.advisors);
        console.log(data);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        <sidebarContext.Provider
          value={{
            isOpen: active,
            toggle: toggleSidebar,
            sidebarRef,
            activeSidebar,
            setSortRelevance,
            sortRelevance,
            advisors,
            getRelevantAdvisors,
            handleKeyDown,
            setKeyword,
            sortExpertise,
            setSortExpertise,
            sortByExpertise,
            setLessThan,
            setGreaterThan,
            sortByDealsClosed,
          }}
        >
          {/* Sidebar */}
          {<Sidebar2 />}

          {/* Main Content */}
          <main className={active ? "main" : "main main-reverse"}>
            <Navbar />

            <Advisors loader={loader} />
          </main>
        </sidebarContext.Provider>
      }
    </>
  );
};

export default AdvisorPage;
