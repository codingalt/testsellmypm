import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { sidebarContext } from "../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import MainContext from "../../../Context/MainContext";
import ManageListings from "../ManageListings/ManageListings";
import NotFound404 from "../../../NotFound404/NotFound404";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const ManageListingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAdmin } = useContext(MainContext);
  const [listingId, setListingId] = useState("");
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [loader, setLoader] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const toastHandle = (result, message) => {
    if (result) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteListing = async (item) => {
    setLoader(true);
    try {
      const res = await fetch(`/listing/${item._id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        toastHandle(true, "Listing Deleted Successfully");
        setDeleted(true);
      } else {
        toastHandle(false, "Something went wrong! Please try again.");
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleListingId = () => {
    // setListingId(props.listing._id)
  };

  useEffect(() => {
    handleListingId();
  }, []);

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
      {isAdmin ? (
        <sidebarContext.Provider
          value={{
            isOpen: active,
            toggle: toggleSidebar,
            sidebarRef,
            deleted: deleted,
            deleteListing,
          }}
        >
          {/* Sidebar */}
          {<Sidebar />}

          {/* Main Content */}
          <main className={active ? "main" : "main main-reverse"}>
            <Navbar />

            {<ManageListings />}
          </main>
        </sidebarContext.Provider>
      ) : (
        ""
      )}
    </>
  );
};

export default ManageListingPage;
