import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../../../../images/logotext.png";
import banner from "../../../../../images/realestate.jpg";
import * as bs from "react-icons/bs";
import * as hi from "react-icons/hi";
import * as md from "react-icons/md";
import * as fa from "react-icons/fa";
import Table from "react-bootstrap/Table";
import MainContext from "../../../../Context/MainContext";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { sidebarContext } from "../../../contexts/SidebarContext";

const ListingContractModal = (props) => {
  const [listing, setListing] = useState([]);
  const [fromUserId,setFromUserId] = useState("");
  const [toUserId,setToUserId] = useState("");
  const [loader, setLoader] = useState(true);
  const { isPaid, myOwnId } = useContext(MainContext);
  const {setApprovedItem} = useContext(sidebarContext)

  const toastHandle = (result, message) => {
    if (result.success) {
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

  const approveBuyerRequest = async()=>{
    setLoader(true);
    props.onHide();
    try {
      const res = await fetch(`/buyerrequest/accept`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          approvedByUserId: toUserId,
          receivedByUserId: fromUserId,
          listing: listing
        })
      });
      const data = await res.json();
      if (data.success) {
      toastHandle(data, "Request Accepted Successfully..");
      } else {
        toastHandle(data, data.message);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  const setListingValue = () => {
    setListing(props.buyerrequest.listing);
    setFromUserId(props.buyerrequest.fromUserId)
    setToUserId(props.buyerrequest.toUserId)
  };

  useEffect(() => {
    setListingValue();
  }, [props]);
  return (
    <>
    <ToastContainer />
      <Modal
        {...props}
        dialogClassName="modal-90w"
        size="xxl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Listing Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listing?.map((item, i) => {
            return (
              <div className="memo-container" key={item._id}>
                <div className="memo-header">
                  <div className="left">
                    <span className="text-primary">SELL MY PM</span>
                  </div>
                  <div className="center">
                    <span>MEMORANDUM OF ACHIEVEMENT</span>
                  </div>
                </div>
                <div className="banner">
                  <img className="banner-img" src={banner} alt="" />
                  <img className="comapny-logo shadow" src={logo} alt="" />
                </div>

                <div className="property-manager-details pmd-listing-contract row flex-md-nowrap">
                  <div className="basic-details">
                    <h3 className="mb-4">Basic Details</h3>
                    <div className="heading">
                      <span>Title</span>
                      {item.details.title}
                    </div>
                    <div className="b-descript">
                      <span>Summary</span>
                      {item.details.summary}
                    </div>
                    <div className="heading">
                      <span>Location</span>
                    </div>
                    <div className="location">
                      <div className="country" >
                        <ul>
                          <li>
                            <hi.HiLocationMarker />
                            Country
                          </li>
                          <li className="text-secondary">
                            {item.details.location.country}
                          </li>
                        </ul>
                      </div>

                      <div className="city">
                        <ul>
                          <li>
                            <md.MdOutlineLocationCity /> City
                          </li>
                          <li className="text-secondary">
                            {item.details.location.city}
                          </li>
                        </ul>
                      </div>
                      <div className="region">
                        <ul>
                          <li>
                            <fa.FaLocationArrow /> Region
                          </li>
                          <li className="text-secondary">
                            {item.details.location.region}
                          </li>
                        </ul>
                      </div>
                    </div>

                    {item.details.listingUrl && (
                      <div className="url mt-3">
                        <ul>
                          <li>Listing Url</li>
                          <li className="text-secondary mt-1">
                            {item.details.listingUrl}
                          </li>
                        </ul>
                      </div>
                    )}

                    {item.servicesNeeded && (
                      <div className="url mt-3">
                        <ul>
                          <li>Services Needed</li>
                          <li className="text-secondary mt-1">
                            {item.servicesNeeded}
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {item.saleDetails && (
                  <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                    <div className="left col-md-10">
                      <div className="heading">
                        <span>Sale Details</span>
                      </div>
                      <Table bordered>
                        <tbody>
                          <tr>
                            <th style={{ width: "200px" }}>
                              Reason for Selling
                            </th>
                            <td>{item.saleDetails.reasonForSelling}</td>
                          </tr>
                          <tr>
                            <th>Asking Price</th>
                            <td>{item.saleDetails.askingPrice}</td>
                          </tr>
                          <tr>
                            <th>Specifc Price</th>
                            <td>{item.saleDetails.specificPrice}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}

                {item.indoor && (
                  <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                    <div className="left col-md-10">
                      <div className="heading">
                        <span>Indoor Details</span>
                      </div>
                      <Table bordered>
                        <tbody>
                          <tr>
                            <th style={{ width: "200px" }}>Beds</th>
                            <td>{item.indoor.beds}</td>
                          </tr>
                          <tr>
                            <th>Bathrooms</th>
                            <td>{item.indoor.bathrooms}</td>
                          </tr>
                          <tr>
                            <th>Outdoor Space</th>
                            <td>{item.indoor.outdoorSpace}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}

                {item.socialDetails && (
                  <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                    <div className="left col-md-10">
                      <div className="heading">
                        <span>Social Details</span>
                      </div>
                      <Table bordered>
                        <tbody>
                          <tr>
                            <th style={{ width: "200px" }}>Website</th>
                            <td>{item.socialDetails.website}</td>
                          </tr>
                          <tr>
                            <th>Linkdin</th>
                            <td>{item.socialDetails.linkdin}</td>
                          </tr>
                          <tr>
                            <th>Social Media Channels</th>
                            <td>{item.socialDetails.socialMediaChannels}</td>
                          </tr>
                          {item.servicesOffered && (
                            <tr>
                              <th>Services Offered</th>
                              <td>{item.servicesOffered}</td>
                            </tr>
                          )}
                          {item.fees && (
                            <tr>
                              <th>Fees</th>
                              <td>{item.fees}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}

                <div className="managment-summary mt-5 ms-listing-contract row flex-md-nowrap">
                  {item.rentalKpis && (
                    <div className="left col-md-5">
                      <div className="heading">
                        <span>Rental KPIS</span>
                      </div>
                      <Table bordered>
                        <tbody>
                          {item.rentalKpis.avgBookingValue && (
                            <tr>
                              <th style={{ width: "200px" }}>
                                Avg Booking Value
                              </th>
                              <td>{item.rentalKpis.avgBookingValue}</td>
                            </tr>
                          )}
                          {item.rentalKpis.avgOccupancyRate && (
                            <tr>
                              <th>Avg Occupancy Rate</th>
                              <td>{item.rentalKpis.avgOccupancyRate}</td>
                            </tr>
                          )}
                          {item.rentalKpis.monthsLeftOnContract && (
                            <tr>
                              <th>Months Left on contract</th>
                              <td>{item.rentalKpis.monthsLeftOnContract}</td>
                            </tr>
                          )}
                          {item.rentalKpis.monthsUnderYourControl && (
                            <tr>
                              <th>Months Under Your Control</th>
                              <td>{item.rentalKpis.monthsUnderYourControl}</td>
                            </tr>
                          )}
                          {item.rentalKpis.numberOfListings && (
                            <tr>
                              <th>Number Of Listings</th>
                              <td>{item.rentalKpis.numberOfListings}</td>
                            </tr>
                          )}
                          {item.rentalKpis.onYearGrowthRate && (
                            <tr>
                              <th>Year On Year Growth Rate</th>
                              <td>{item.rentalKpis.onYearGrowthRate}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}

                  {item.propertyDetails && (
                    <div className="right col-md-7">
                      <div className="heading">
                        <span>Property Details</span>
                      </div>
                      <Table bordered>
                        <tbody>
                          {item.propertyDetails.maintenanceIssues && (
                            <tr>
                              <th>Maintenance Issues</th>
                              <td>{item.propertyDetails.maintenanceIssues}</td>
                            </tr>
                          )}
                          {item.propertyDetails.ownerIssues && (
                            <tr>
                              <th>Owner Issues</th>
                              <td>{item.propertyDetails.ownerIssues}</td>
                            </tr>
                          )}
                          {item.propertyDetails.stopRentingReason && (
                            <tr>
                              <th>Stop Renting Reason</th>
                              <td>{item.propertyDetails.stopRentingReason}</td>
                            </tr>
                          )}
                          {item.propertyDetails.neighbourhoodIssues && (
                            <tr>
                              <th>Neighbourhood Issues</th>
                              <td>
                                {item.propertyDetails.neighbourhoodIssues}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{approveBuyerRequest(); setApprovedItem(true);}}>
            Accept Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListingContractModal;
