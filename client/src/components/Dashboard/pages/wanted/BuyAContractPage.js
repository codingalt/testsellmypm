import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { sidebarContext } from "../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import BuyAListingContract from "../../Forms/wanted/BuyAListingContract/BuyAListingContract";

const BuyAListingContractPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [loader, setLoader] = useState(null);
  const toggleSidebar = () => {
    setActive(!active);
  };
  const Authenticate = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_URI}/auth`, {
        method: "GET",
        credentials:'include',
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
          {/* Sidebar */}
          {<Sidebar />}

          {/* Main Content */}
          <main className={active ? "main" : "main main-reverse"}>
            <TailSpin
              height="60"
              width="60"
              color="#744BBE"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass="loader_wrapper2"
              visible={loader}
            />
            {/* Navbar */}
            <Navbar />

            {/* Select Category  */}
            {isAuthenticated && <BuyAListingContract />}
          </main>
        </sidebarContext.Provider>
      }
    </>
  );
};

export default BuyAListingContractPage;
