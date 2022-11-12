import React, { useState } from "react";
import { useEffect } from "react";
import MainContext from "../../../Context/MainContext";
import * as ai from "react-icons/ai";
import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import NoListing from "../../NoListing/NoListing";
import { NavLink } from "react-router-dom";
import Pagination from "../../../Pagination/Pagination";
import "./manage-listing.css";
import * as md from "react-icons/md";
import * as gr from "react-icons/gr";
import ConfirmModel from "../../Modals/ConfirmModel/ConfirmModel";
import { sidebarContext } from "../../contexts/SidebarContext";
import EditListingModel from "../../Modals/EditListingModel/EditListingModel";

const ManageListings = () => {
  const [AllListings, setAllListings] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const { myOwnId, isPaid } = useContext(MainContext);
  const { deleted } = useContext(sidebarContext);
  const [loader, setLoader] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [clickedItem, setClickedItem] = useState([]);

  // Pagination
  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const currentPage = itemsPerPage * pageNumber;

  const pageCount = Math.ceil(AllListings.length / itemsPerPage);
  var slicedData = AllListings.slice(currentPage, currentPage + itemsPerPage);

  // get All Listings
  const getAllListings = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/listingsadmin/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setAllListings(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  // get Listings by search
  const getListingBySearch = async () => {
    if (keyword === "") {
      return;
    }
    setPageNumber(0);
    setLoader(true);
    try {
      const res = await fetch(`/listingsadmin/?keyword=${keyword}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setAllListings(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (keyword === "") {
      getAllListings();
    }
  }, [keyword, deleted]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {AllListings.length === 0 && !loader && (
        <div className="content listing-table">
          <div className="search-all-listing">
            <input
              required
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="shadow-sm"
              type="text"
              placeholder="Enter listing title.."
            />
            <button
              onClick={getListingBySearch}
              className="btn btn-primary btn-lg"
            >
              Search
            </button>
          </div>
          <div
            className="mx-auto mt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "13px",
              alignItems: "center",
            }}
          >
            <h3>No Data Found!</h3>
            <button onClick={getAllListings} className="btn btn-success mt-1">
              Go Back
            </button>
          </div>
        </div>
      )}
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
      {AllListings.length !== 0 && (
        <div className="content listing-table">
          <div className="search-all-listing">
            <input
              required
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="shadow-sm"
              type="text"
              placeholder="Enter listing title.."
            />
            <button
              onClick={getListingBySearch}
              className="btn btn-primary btn-lg"
            >
              Search
            </button>
          </div>
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
                <h3 className="mb-4 pt-4 l-heading">Listings</h3>
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
                    {slicedData
                      ?.slice(0)
                      .reverse()
                      .map((item, i) => {
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
                            <td>{item.details.title.slice(0, 40)}...</td>
                            <td>{item.details.summary.slice(0, 110)}...</td>
                            <td>{item.saleDetails?.askingPrice}</td>
                            <td>{item.details.location?.country}</td>
                            <td>
                              <div className="action-div">
                                <NavLink
                                  className="view-icon-container"
                                  to={`/listings/view/${item._id}`}
                                >
                                  {/* <gr.GrView className='view-icon' /> View */}
                                  View
                                </NavLink>
                                <div
                                  onClick={() => {
                                    setModalShow2(true);
                                    setClickedItem(item);
                                  }}
                                  className="edit-icon"
                                >
                                  Edit
                                </div>
                                <div
                                  onClick={() => {
                                    setModalShow(true);
                                    setClickedItem(item);
                                  }}
                                  className="del-icon"
                                >
                                  <md.MdDeleteOutline className="delete" />
                                </div>
                              </div>
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
      <ConfirmModel
        listing={clickedItem}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <EditListingModel
        listing={clickedItem}
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
    </>
  );
};

export default ManageListings;
