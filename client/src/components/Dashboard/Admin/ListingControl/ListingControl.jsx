import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import IncreaseListingModel from "../../Modals/IncreaseListing/IncreaseListingModel";
import "./listing-control.css";
import { toast, ToastContainer } from "react-toastify";

const ListingControl = () => {
  const [keyword, setKeyword] = useState("");
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [noData, setNoData] = useState(false);

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
        autoClose: 11000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // get User Data
  const getUser = async () => {
    setNoData(false);
    if (keyword === "") {
      return;
    }
    setLoader(true);
    try {
      const res = await fetch(`/users/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: keyword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data?.user);
      } else {
        setUserData([]);
      }
      if (!data.user) {
        setNoData(true);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Increase Listings
  const increaseListing = async(numListing)=>{
    setModalShow(false);
    try {
      const res = await fetch(`/listingcontrol/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData?._id,
          numListing: numListing
        }),
      });
      const data = await res.json();
      if (data.success) {
        toastHandle(true, 'Listing Increased Successfully..');
      } 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="content listing-table">
      <ToastContainer />
        <div
          className="mx-auto mt-1 listing-control-heading"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4>
            Enter User Email whose Monthly or Yearly Listings you want to
            increase
          </h4>
        </div>
        <div className="search-all-listing search-user-listing">
          <input
            required
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="shadow-sm"
            type="text"
            placeholder="Enter User Email.."
          />
          <button onClick={getUser} className="btn btn-primary btn-lg">
            Search
          </button>
        </div>

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

        {userData?.length !== 0 && (
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
                <h3 className="mb-4 pt-4 l-heading">User Data</h3>
              </div>
            </div>
            <div className="table-responsive">
              {!loader && (
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th>Membership Plan</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{userData?.name}</td>
                      <td>{userData?.email}</td>
                      <td>{userData?.isPaid ? "Premium" : "Free"}</td>
                      <td>
                        <div className="increase-listing" onClick={()=> {setModalShow(true)}}>
                          <span>Increase Listings</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {noData && (
          <div
            className="mx-auto mt-1 listing-control-heading alert alert-warning"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>No Record Found</h3>
          </div>
        )}
      </div>
      <IncreaseListingModel
        increaseListing={increaseListing}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default ListingControl;
