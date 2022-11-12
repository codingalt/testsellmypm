import React, { useState } from "react";
import "./my-listings.css";
import * as ai from "react-icons/ai";
import { useEffect } from "react";
import { useContext } from "react";
import MainContext from "../../Context/MainContext";
import { TailSpin } from "react-loader-spinner";
import NoListing from "../NoListing/NoListing";
import { NavLink } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const { myOwnId, isPaid } = useContext(MainContext);
  const [loader, setLoader] = useState(true);

  // Pagination
  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const currentPage = itemsPerPage * pageNumber;

  const pageCount = Math.ceil(myListings.length / itemsPerPage);
  var slicedData = myListings.slice(currentPage, currentPage + itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

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

  useEffect(() => {
    getListingsByUser();
  }, []);

  return (
    <>
      {myListings.length === 0 && !loader && <NoListing />}
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
      {myListings.length !== 0 && (
        <div className="content listing-table">
          <div
            className="container mx-md-3 shadow-sm border"
            style={{
              maxWidth: "96%",
              borderRadius: "13px",
              background: "#fff",
            }}
          >
            <div className="my-list-top">
              <div className="left">
                <h3 className="mb-4 pt-4 l-heading">My Listings</h3>
              </div>
              <div className="right">
                <NavLink to={"/listing/post"}>
                  <button className="button">Create New Listing</button>
                </NavLink>
              </div>
            </div>
            <div className="table-responsive">
              {!loader && (
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Headline</th>
                      <th scope="col">Summary</th>
                      <th scope="col">Price</th>
                      <th scope="col">Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.slice(0).reverse().map((item, i) => {
                      return (
                        <tr key={item._id}>
                          <td>{i + 1}</td>
                          <td>
                            <img
                              src={item.images[0].url}
                              style={{
                                width: "44px",
                                height: "40px",
                                borderRadius: "11px",
                              }}
                              alt=""
                            />
                          </td>
                          <td>{item.details?.title?.slice(0, 40)}...</td>
                          <td>{item.details?.summary?.slice(0, 110)}...</td>
                          <td>{item.saleDetails?.askingPrice}</td>
                          <td>{item.details?.location?.country}</td>
                          <td>
                            <NavLink to={`/listings/view/${item._id}`}>
                              View
                            </NavLink>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <Pagination pageCount={pageCount} changePage={changePage} />
        </div>
      )}
    </>
  );
};

export default MyListings;
