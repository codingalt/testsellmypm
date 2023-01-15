import React, { useEffect, useState } from "react";
import "./profile.css";
import { TailSpin } from "react-loader-spinner";
import company from "../../../images/logotext.png";
import { useContext } from "react";
import MainContext from "../../Context/MainContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PaymentModal from '../Modals/PaymentModal/PaymentModal'

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [myListings, setMyListings] = useState([]);
  const [loader, setLoader] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [totalBuyerRequest, setTotalBuyerRequest] = useState(null);
  const { expiryDate, packageType } = useContext(MainContext);
  const updatedDate = new Date(expiryDate).toDateString();
  const navigate = useNavigate();

  const toastHandle = (result, message) => {
    if (result) {
      toast.success(message, {
        position: "top-right",
        autoClose: 6000,
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

  const handleAuth = () => {
    if (!isAuthenticated) {
      setModalShow(false);
      toastHandle(
        false,
        "You are not logged in! Please login first or signup if you don't have an account"
      );
      navigate("/login");
    } else {
      setModalShow(true);
    }
  };

  const getBuyerRequests = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_URI}/buyerrequests/`, {
        method: "GET",
        credentials:'include',
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        }),
      });
      const data = await res.json();
      if (data.length !== 0) {
        setTotalBuyerRequest(data.buyerRequests.length);
      } else {
        setTotalBuyerRequest([]);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
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
      setProfile(data.others);
      setLoader(false);
      if (!data.success) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  // get Listings By User ID || My Own Listings
  const getListingsByUser = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_URI}/mylistings/`, {
        method: "GET",
        credentials:'include',
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        }),
      });
      const data = await res.json();
      if (data.length !== 0) {
        setMyListings(data);
      } else {
        setMyListings([]);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Authenticate();
    getListingsByUser();
    getBuyerRequests();
  }, []);

  return (
    <div className="profile">
      <ToastContainer />
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
      <PaymentModal show={modalShow} onHide={() => setModalShow(false)} />
      {!loader && (
        <div className="card px-4 py-3 border shadow-sm">
          <div className="profile-upgrade-wrap">
          <div className="profile-img">
            <div className="p-img">
              <img src={company} alt="" />
            </div>
            <div className="name">
              <span>Sell My PM</span>
              <span>#1 Property Manager MarketPlace</span>
            </div>
          </div>
          <div className="package-activate">
              <button onClick={handleAuth} className="button">Upgrade Membership</button>
            </div>
          </div>
          <div className="detail-title">
            <span>Information</span>
          </div>
          <div className="detail-row">
            <div className="key">
              <span>Full Name</span>
            </div>
            <div className="value">
              <span>{profile.name}</span>
            </div>
          </div>
          <div className="detail-row">
            <div className="key">
              <span>Email</span>
            </div>
            <div className="value">
              <span>{profile.email}</span>
            </div>
          </div>
          <div className="detail-row">
            <div className="key">
              <span>My Listings</span>
            </div>
            <div className="value">
              <span>{myListings.length}</span>
            </div>
          </div>
          <div className="detail-row">
            <div className="key">
              <span>Buyer Requests</span>
            </div>
            <div className="value">
              <span>{totalBuyerRequest}</span>
            </div>
          </div>
          <div className="detail-row">
            <div className="key">
              <span>MemberShip</span>
            </div>
            <div className="value">
              <span>{profile.isPaid ? "Premium" : "Free"}</span>
            </div>
          </div>
          {profile.isPaid && (
            <>
              <div className="detail-row">
                <div className="key">
                  <span>Expiry Date</span>
                </div>
                <div className="value">
                  <span>{updatedDate}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="key">
                  <span>Package Type</span>
                </div>
                <div className="value">
                  <span style={{ textTransform: "capitalize" }}>
                    {packageType}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
