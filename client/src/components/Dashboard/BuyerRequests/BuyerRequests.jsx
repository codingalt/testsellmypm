import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import { TailSpin } from "react-loader-spinner";
import NoBuyerRequest from "../NoBuyerRequest/NoBuyerRequest";
import { NavLink } from "react-router-dom";
import BuisnessSellModal from "../Modals/sell/buisnessSellModal/BuisnessSellModal";
import ListingContractModal from "../Modals/sell/ListingContractModal/ListingContractModal";
import { useContext } from "react";
import { sidebarContext } from "../contexts/SidebarContext";

const BuyerRequests = () => {
  const [buyerRequest, setBuyerRequest] = useState([]);
  const [loader, setLoader] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [clickedItem,setClickedItem] = useState([]);
  const {approvedItem} = useContext(sidebarContext)

  // Pagination
  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const currentPage = itemsPerPage * pageNumber;

  const pageCount = Math.ceil(buyerRequest.length / itemsPerPage);
  var slicedData = buyerRequest.slice(currentPage, currentPage + itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  // get Listings By User ID || My Own Listings
  const getBuyerRequests = async () => {
    setLoader(true);
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
        setBuyerRequest(data.buyerRequests);
      } else {
        setBuyerRequest([]);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuyerRequests();
  }, [approvedItem]);

  return (
    <div className="buyer-request">
      
      {buyerRequest.length === 0 && !loader && <NoBuyerRequest />}
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
      {buyerRequest.length !== 0 && (
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
                <h3 className="mb-4 pt-4 l-heading">Buyer Requests</h3>
              </div>
            </div>
            <div className="table-responsive">
              {!loader && (
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Listing Image</th>
                      <th scope="col">Listing Title</th>
                      <th scope="col">Requesting Buyer</th>
                      <th>Status</th>
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
                              src={item.listing[0]?.images[0]?.url}
                              style={{
                                width: "44px",
                                height: "40px",
                                borderRadius: "11px",
                              }}
                              alt=""
                            />
                          </td>
                          <td>{item.listing[0]?.details?.title.slice(0, 40)}...</td>
                          <td>{item.fromUserName}</td>
                          <td>
                            <span className={item.status === "Pending" ? "pending" : "status"}>{item.status}</span>
                          </td>
                          <td>
                            <NavLink onClick={() => {setModalShow(true); setClickedItem(item)}} to={`#`}>
                              Approve
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
          <ListingContractModal buyerrequest={clickedItem} show={modalShow} onHide={() => setModalShow(false)} />
          <Pagination pageCount={pageCount} changePage={changePage} />
        </div>
      )}
    </div>
  );
};

export default BuyerRequests;
