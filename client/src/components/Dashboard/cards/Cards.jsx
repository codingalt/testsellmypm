import React, { useEffect, useState } from 'react'
import './cards.css'
import * as go from 'react-icons/go'
import * as fa from 'react-icons/fa'
import * as ai from 'react-icons/ai'
import { TailSpin } from "react-loader-spinner";
import NoListing from '../NoListing/NoListing'
import MyListings from '../MyListings/MyListings'
import { useContext } from 'react'
import MainContext from '../../Context/MainContext'

const Cards = () => {
  const [loader, setLoader] = useState(true);
  const {isAdmin} = useContext(MainContext)
  const [myListings, setMyListings] = useState([]);
  const [totalBuyerRequest,setTotalBuyerRequest] = useState(null) 
  const [totalApprovedRequest,setTotalApprovedRequest] = useState(null)
  const [totalUsers, setTotalUsers] = useState(null)
  const [totalListing,setTotalListing] = useState(null)

  // get Listings By User ID || My Own Listings
  const getListingsByUser = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/mylistings/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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

  // get All Listings
  const getAllListings = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/listings/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTotalListing(data.length);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBuyerRequests = async () => {
    setLoader(true)
    try {
      const res = await fetch(`/buyerrequests/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.length !== 0) {
        setTotalBuyerRequest(data.buyerRequests.length);
      } else {
        setTotalBuyerRequest([]);
      }
    setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };

  const getApprovedRequests = async () => {
    setLoader(true)
    try {
      const res = await fetch(`/approvedrequests/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setTotalApprovedRequest(data.approvedRequests.length);
      } else {
        setTotalApprovedRequest([]);
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };

  // Get Total Number of users
  const getTotalUsers = async () => {
    setLoader(true)
    try {
      const res = await fetch(`/gettotalusers/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setTotalUsers(data.user)
      } else {
        setTotalUsers(null)
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getListingsByUser();
    getBuyerRequests();
    getApprovedRequests();
    getTotalUsers();
    getAllListings();
}, []);

  return (
    <>
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
        {
          !loader &&    
    <div className="cards">
      {
        isAdmin? (
        <>
          <div className="card-single shadow-sm">
       <div>
         <h1>{totalUsers}</h1>
         <span>Total Users in SellMyPM</span>
       </div>
       <div className="icon-container" style={{background: '#7B74EC'}}>
       <ai.AiOutlineUsergroupAdd />
       </div>
     </div>
     <div className="card-single shadow-sm">
       <div>
         <h1>{totalListing}</h1>
         <span>Total Listings</span>
       </div>
       <div className="icon-container" style={{background: '#E45D99'}}>
         <fa.FaListUl />
       </div>
     </div>
        </>) : (
          <>
            <div className="card-single shadow-sm">
       <div>
         <h1>{totalBuyerRequest}</h1>
         <span>Buyer Requests</span>
       </div>
       <div className="icon-container" style={{background: '#7B74EC'}}>
       <go.GoRequestChanges />
       </div>
     </div>
     <div className="card-single shadow-sm">
       <div>
         <h1>{myListings.length}</h1>
         <span>My Listings</span>
       </div>
       <div className="icon-container" style={{background: '#E45D99'}}>
         <fa.FaListUl />
       </div>
     </div>
 
     <div className="card-single shadow-sm">
       <div>
         <h1>{totalApprovedRequest}</h1>
         <span>Approved Requests</span>
       </div>
       <div className="icon-container" style={{background: '#5ABA81'}}>
       <ai.AiOutlineFileDone />
       </div>
     </div>
          </>
        )
      }
     
   </div>
  }

  {
    !myListings.length === 0 &&
    !loader &&
    !isAdmin &&
    <NoListing />
  }

{
    !myListings.length !== 0 &&
    !loader &&
    !isAdmin &&
    <MyListings />
  }
   
   </>
  )
}

export default Cards