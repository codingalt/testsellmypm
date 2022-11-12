import React, { useState, useEffect, useContext } from "react";
import "./browse-all.css";
import * as bi from "react-icons/bi";
import * as bs from "react-icons/bs";
import * as fa from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import p1 from "../../images/p1.jfif";
import p2 from "../../images/p2.jfif";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import p5 from "../../images/p5.jfif";
import s3 from "../../images/slider/s3.jpg";
import Pagination from "../Pagination/Pagination";
import { TailSpin } from "react-loader-spinner";
import ListingSkeleton from "../ListingSkeleton/ListingSkeleton";
import MainContext from "../Context/MainContext";

const BrowseAllListings = () => {
  const { isPaid } = useContext(MainContext);
  const [categoryId, setCategoryId] = useState("");
  const [loader, setLoader] = useState(true);
  const [noListing, setNoListing] = useState(false);
  const [radioBoxValue, setRadioBoxValue] = useState("forsell");
  const [wanted, setWanted] = useState([]);
  const [forSell, setForSell] = useState([]);
  const [listings, setListings] = useState([]);
  const [keyword,setKeyword] = useState("l");
  const { paramsCategoryId } = useParams();
  const navigate = useNavigate();

  // Pagination
  const itemsPerPage = 16;
  const [pageNumber, setPageNumber] = useState(0);
  const currentPage = itemsPerPage * pageNumber;

  const pageCount = Math.ceil(listings.length / itemsPerPage);
  var slicedData = listings.slice(currentPage, currentPage + itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  const handleCategoryType = (e) => {
    setRadioBoxValue(e.target.value);
    if (e.target.value === "select") {
      getAllListings();
    }
    if (e.target.value === "forsell") {
      setCategoryId(forSell[0]._id);
    } else {
      setCategoryId(wanted[0]._id);
    }
  };

  const handleOption = (e) => {
    setCategoryId(e.target.value);
    if (e.target.value === "select") {
      getAllListings();
      navigate(`/listing/`);
    } else {
      navigate(`/listing/${e.target.value}`);
    }
    // setNoListing(true);
  };

  // get Listings By category ID
  const getListingsByCategory = async () => {
    const select = {
      selected: 0,
    };
    changePage(select);
    setLoader(true);
    try {
      const res = await fetch(`/listings/${paramsCategoryId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.length !== 0) {
        setListings(data);
      } else {
        setListings([]);
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
      setListings(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  // get Listings by search
  const getListingBySearch = async () => {
    setLoader(true);
    setPageNumber(0);
    try {
      const res = await fetch(`/listings/?keyword=${keyword}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setListings(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e)=>{
    setKeyword(e.target.value);
  }

  useEffect(() => {
    getListingsByCategory();
  }, [paramsCategoryId]);

  useEffect(() => {
    if (paramsCategoryId === undefined || paramsCategoryId === null) {
      getAllListings();
    }
  }, [categoryId]);

  // get All categories
  const getCategories = async () => {
    try {
      const res = await fetch(`/categories`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // if(data.success){
      const forSellArr = [];
      const wantedArr = [];
      data.categories
        .filter((item) => item.type === "sell")
        .map((item, i) => {
          forSellArr[i] = item;
        });
      setForSell(forSellArr);
      data.categories
        .filter((item) => item.type === "wanted")
        .map((item, i) => {
          wantedArr[i] = item;
        });
      setWanted(wantedArr);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      getListingBySearch();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(()=>{
    if(keyword === ""){
      getAllListings();
    }
  },[keyword])

  return (
    <div className="browse-all-listings">
      <section
        style={{ position: "relative" }}
        className="categories"
        id="categories"
      >
        {/* Filter row  */}

        <div className="filter-row">
          <div className="container">
            <div className="row">
              <div className="col-md-9 filter-left">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    onChange={handleCategoryType}
                    className="form-select form-select-lg"
                    aria-label="Please Select"
                  >
                    <option value="forsell">For Sell</option>
                    <option value="wanted">Wanted</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={categoryId}
                    onChange={handleOption}
                    className="form-select form-select-lg"
                    aria-label="Please Select"
                  >
                    <option value="select">Select Category</option>
                    {radioBoxValue === "forsell"
                      ? forSell?.map((item, i) => {
                          return (
                            <option value={item._id} key={item._id}>
                              {item.name}
                            </option>
                          );
                        })
                      : wanted?.map((item, i) => {
                          return (
                            <option value={item._id} key={item._id}>
                              {item.name}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
              <div className="col-md-3 filter-right">
                <div className="nav-search">
                  <input type="text" onKeyDown={handleKeyDown} onChange={event => setKeyword(event.target.value)} placeholder="Search by Country.." />
                  <bs.BsSearch className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loader && (
          <div className="row mt-3 mb-3 mx-auto">
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
          </div>
        )}

        <div className="row cat-container">
          {slicedData
            ?.slice(0)
            .reverse()
            .map((item, i) => {
              return (
                <div key={item._id} className="card-container col-md-3 border">
                  <NavLink key={item._id} to={"/listings/view/" + item._id}>
                    {<img loading="lazy" src={item.images[0].url} alt="" />}
                    <div className="cat-title">
                      <h5>{item.details.title}</h5>
                    </div>
                    <div className="member-txt">
                      {!isPaid ? (
                        <NavLink className="upgrade" to={"/"}>
                          <span>
                            <bi.BiLockAlt /> Upgrade for Pricing
                          </span>
                        </NavLink>
                      ) : (
                        <NavLink
                          className="upgrade"
                          to={"/listings/view/" + item._id}
                        >
                          <span>Contact for details</span>
                        </NavLink>
                      )}

                      {isPaid ? (
                        <NavLink
                          className="view-more"
                          to={"/listings/view/" + item._id}
                        >
                          <span>View More Info</span>
                        </NavLink>
                      ) : (
                        <NavLink className="view-more" to={"/login"}>
                          <span>Login for more</span>
                        </NavLink>
                      )}
                    </div>
                  </NavLink>
                </div>
              );
            })}

          {noListing && listings.length === 0 && (
            <div className="empty-listings">
              <div className="icon">
                <fa.FaListUl />
              </div>
              <h4>No Listing Found!</h4>
            </div>
          )}
        </div>
        {/* // Pagination  */}
        <Pagination pageCount={pageCount} changePage={changePage} />
      </section>
    </div>
  );
};

export default BrowseAllListings;
