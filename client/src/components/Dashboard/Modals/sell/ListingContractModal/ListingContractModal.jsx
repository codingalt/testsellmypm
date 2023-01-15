import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../../../../images/logotext.png";
import banner from "../../../../../images/realestate2.svg";
import * as bs from "react-icons/bs";
import * as hi from "react-icons/hi";
import * as md from "react-icons/md";
import * as fa from "react-icons/fa";
import Table from "react-bootstrap/Table";
import MainContext from "../../../../Context/MainContext";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { sidebarContext } from "../../../contexts/SidebarContext";
import './listing-modal.css'

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
      const res = await fetch(`${process.env.REACT_APP_URI}/buyerrequest/accept`, {
        method: "POST",
        credentials:'include',
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        }),
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
                  <img className="comapny-logo shadow" src={item.companyLogo? item.companyLogo.url : logo} alt="" />
                </div>

                <div className="property-manager-details pmd-listing-contract row flex-md-nowrap">
                  <div className="basic-details">
                    <h3 className="mb-4">Basic Details</h3>
                    {
                      item.website &&
                      <a href={item.website} target='_blank'>
                      <div className="verified-website">
                      Verified direct Website
                    </div>
                    </a>
                    }
                   
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

                {/* property Manager details  */}

                {
                  item.listType === "buisnessForSell" && (
                  <>
                  <div className="pm-heading">
                        <span>Property Manager Details</span>
                  </div>
                  <ul className="property_manager_details">
                    <li>
                      <hi.HiShieldCheck />
                      Incorporation date: {item.incorporationDate && item.incorporationDate}
                    </li>
                    <li>
                      <hi.HiShieldCheck />
                      Countries operating in: {item.details && item.details.location.country}
                    </li>
                    <li>
                      <hi.HiShieldCheck />
                      Company Registration Number: {item.companyNumber && item.companyNumber}
                    </li>
                    <li>
                      <hi.HiShieldCheck />
                      Registered HQ: {item.companyAddress && item.companyAddress}
                    </li>
                    <li>
                      <hi.HiShieldCheck />
                      Company Owner: {item.companyAcquisition && item.companyAcquisition.directors}
                    </li>
                    <li>
                      <hi.HiShieldCheck />
                      Reason for selling: {item.saleDetails && item.saleDetails.reasonForSelling}
                    </li>
                  </ul>
                  </>)
                }

                {
                  item.listType === "buisnessForSell" &&
                  <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                  <div className="left col-md-8">
                    <div className="pm-heading my-2">
                      <span className="mb-3">Summary</span>
                    </div>
                    <Table bordered>
                      <tbody>
                        <tr>
                          <th style={{ width: "200px" }}>
                            Average booking value
                          </th>
                          <td>{item.rentalKpis?.avgBookingValue}</td>
                        </tr>
                        <tr>
                          <th>Number of teams</th>
                          <td>{item.teamInformation && item.teamInformation.howBigIsTeam}</td>
                        </tr>
                        <tr>
                          <th>Direct Booking on website</th>
                          <td>{item.booking && item.booking.details.directBookingOnWebsite}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                }

                {
                  item.teamInformation &&
                  <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                  <div className="left col-md-8">
                    <div className="pm-heading my-2">
                      <span className="mb-3">Teams Information</span>
                    </div>
                    <Table bordered>
                      <thead className="alert alert-success">
                        <tr>
                          <th>Name</th>
                          <th>Years Employed</th>
                          <th>Full Time/Part Time</th>
                          <th>Role</th>
                          <th>Gross Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          item.teamInformation.employees?.map((data,i)=>(
                            <tr key={i}>
                              <td>{data.name}</td>
                              <td>{data.yearsEmployed}</td>
                              <td>{data.jobTime}</td>
                              <td>{data.role}</td>
                              <td>{data.grossSalary}</td>
                            </tr>
                          ))
                        }     
                      
                      </tbody>
                    </Table>
                    <div className="true-false-div">
                      <span>Are all employees on the same type of contract and termination clauses?</span>
                      <span>{item.teamInformation.areEmployeesOnSameContract}</span>
                    </div>
                  </div>
                </div>
                }

                  {
                    item.ownersAndProperties &&
                    <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                    <div className="left col-md-8">
                      <div className="pm-heading my-2">
                        <span className="mb-3">Owners & Properties</span>
                      </div>
                      <Table bordered>
                        <thead className="alert alert-success">
                          <tr>
                            <th>Area</th>
                            <th>Number of properties 2022</th>
                            <th>Gross revenue per area</th>
                            <th>New properties 2019 to 2022</th>
                            <th>Lost Properties 2019 to 2022</th>
                            <th>General Type Urban or Leisure</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            item.ownersAndProperties.details?.map((data,i)=>(
                              <tr key={i}>
                                <td>{data.area}</td>
                                <td>{data.numOfProperties2022}</td>
                                <td>{data.grossRevenuePerArea}</td>
                                <td>{data.newProperties19To22}</td>
                                <td>{data.lostProperties19to22}</td>
                                <td>{data.generalType}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
                      <div className="true-false-div">
                        <span>Do all Owners have the same contracts? </span>
                      <span>{item.ownersAndProperties.ownerHaveSameContract}</span>
                    </div>
                    <div className="true-false-div">
                        <span>What are the termination clauses?  </span>
                      <span>{item.ownersAndProperties.terminationClauses}</span>
                    </div>
                    <div className="true-false-div">
                        <span>Are they renewed yearly actively or by default?  </span>
                      <span>{item.ownersAndProperties.howRenewed}</span>
                    </div>
                    <div className="true-false-div">
                        <span>Do you need to agree any yearly terms with owners such as pricing?</span>
                      <span>{item.ownersAndProperties.agreeOnYearlyTerm}</span>
                    </div>
                    <div className="true-false-div">
                        <span>What is your customer acquisition cost for properties?</span>
                      <span>{item.ownersAndProperties.customerAquisitionCost}</span>
                    </div>
                    <div className="true-false-div">
                        <span>What is the average net profit for each property?</span>
                      <span>{item.ownersAndProperties.avgNetProfitEachProperty}</span>
                    </div>

                    <div className="pm-heading mt-5 mb-3">
                        <span className="mb-3">What types of properties are rented and what is their contribution to the business?</span>
                      </div>
                      <Table bordered>
                        <thead className="alert alert-success">
                          <tr>
                            <td>Type of property</td>
                            <td>Number of properties</td>
                            <td>Gross Booking value</td>
                            <td>Net profit per group</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Cottages</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.cottages.numOfProperties}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.cottages.grossBookingValue}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.cottages.netProfitPerGroup}</td>
                          </tr>
                          <tr>
                            <td>Houses</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.houses.numOfProperties}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.houses.grossBookingValue}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.houses.netProfitPerGroup}</td>
                          </tr>
                          <tr>
                            <td>Apartments</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.appartments.numOfProperties}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.appartments.grossBookingValue}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.appartments.netProfitPerGroup}</td>
                          </tr>
                          <tr>
                            <td>Log Lodges</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.logLodges.numOfProperties}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.logLodges.grossBookingValue}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.logLodges.netProfitPerGroup}</td>
                          </tr>
                          <tr>
                            <td>Pods/Huts/Others</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.prods.numOfProperties}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.prods.grossBookingValue}</td>
                            <td>{item.ownersAndProperties.typesOfRentedProperties.prods.netProfitPerGroup}</td>
                          </tr>
                        </tbody>
                      </Table>
                        </div>
                        </div>
                  }

                  {
                    item.booking &&
                    <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                    <div className="left col-md-8">
                      <div className="pm-heading my-2 mb-3">
                        <span className="mb-4">Bookings</span>
                      </div>
                      <Table bordered>
                        <thead className="alert alert-success">
                          <tr>
                            <th>Booking Channel</th>
                            <th>% of Bookings</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Direct bookings on your website</td>
                            <td>{item.booking.details.directBookingOnWebsite}</td>
                          </tr>
                          <tr>
                            <td>Direct bookings by card or wire transfer</td>
                            <td>{item.booking.details.directBookingByCard}</td>
                          </tr>
                          <tr>
                            <td>Direct bookings over the phone (not enquiries)</td>
                            <td>{item.booking.details.directBookingOverPhone}</td>
                          </tr>
                          <tr>
                            <td>Airbnb</td>
                            <td>{item.booking.details.airBnb}</td>
                          </tr>
                          <tr>
                            <td>VRBO</td>
                            <td>{item.booking.details.vrbo}</td>
                          </tr>
                          <tr>
                            <td>Booking.com</td>
                            <td>{item.booking.details.bookingcom}</td>
                          </tr>
                          <tr>
                            <td>TripAdvisor</td>
                            <td>{item.booking.details.tripAdvisor}</td>
                          </tr>
                          <tr>
                            <td>Other OTA	</td>
                            <td>{item.booking.details.otherOta}</td>
                          </tr>
                          <tr>
                            <td>Over the phone</td>
                            <td>{item.booking.details.overThePhone}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="pm-heading my-2 mb-3">
                        <span className="mb-4">Make up of bookings</span>
                      </div>
                      <Table bordered>
                        <thead className="alert alert-success">
                          <tr>
                            <th></th>
                            <th>2019</th>
                            <th>2020</th>
                            <th>2021</th>
                            <th>2022</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Total # of bookings</td>
                            {
                              item.booking.makeupOfBooking.totalBookings?.map((data,i)=>(
                                <>
                                <td>{data.year19}</td>
                                <td>{data.year20}</td>
                                <td>{data.year21}</td>
                                <td>{data.year22}</td>
                                </>
                              ))
                            }
                          </tr>
                          <tr>
                            <td>Average number of nights booked per property</td>
                            {
                              item.booking.makeupOfBooking.avgNightBookedPerYear?.map((data,i)=>(
                                <>
                                <td>{data.year19}</td>
                                <td>{data.year20}</td>
                                <td>{data.year21}</td>
                                <td>{data.year22}</td>
                                </>
                              ))
                            }
                          </tr>
                          <tr>
                            <td>% of customers that are repeat bookings</td>
                            {
                              item.booking.makeupOfBooking.customerPercentageRepeatBooking?.map((data,i)=>(
                                <>
                                <td>{data.year19}</td>
                                <td>{data.year20}</td>
                                <td>{data.year21}</td>
                                <td>{data.year22}</td>
                                </>
                              ))
                            }
                          </tr>
                          <tr>
                            <td>What % of guests cancel?</td>
                            {
                              item.booking.makeupOfBooking.percentGuestCancel?.map((data,i)=>(
                                <>
                                <td>{data.year19}</td>
                                <td>{data.year20}</td>
                                <td>{data.year21}</td>
                                <td>{data.year22}</td>
                                </>
                              ))
                            }
                          </tr>
                          <tr>
                            <td>What was the average advance booking window?</td>
                            {
                              item.booking.makeupOfBooking.avgAdvanceBookingWindow?.map((data,i)=>(
                                <>
                                <td>{data.year19}</td>
                                <td>{data.year20}</td>
                                <td>{data.year21}</td>
                                <td>{data.year22}</td>
                                </>
                              ))
                            }
                          </tr>
                          <tr>
                            <td>What is the average ADR?</td>
                            {
                              item.booking.makeupOfBooking.avgAdr?.map((data,i)=>(
                                <>
                                <td>{data.year19}</td>
                                <td>{data.year20}</td>
                                <td>{data.year21}</td>
                                <td>{data.year22}</td>
                                </>
                              ))
                            }
                          </tr>
                          <tr>
                            <td>What are the average stay times?</td>
                            {
                              item.booking.makeupOfBooking.avgStayTimes?.map((data,i)=>(
                                <>
                                <td>{data.year19}</td>
                                <td>{data.year20}</td>
                                <td>{data.year21}</td>
                                <td>{data.year22}</td>
                                </>
                              ))
                            }
                          </tr>
                        </tbody>
                      </Table>
                      </div>
                      </div>
                  }

                {
                  item.guests &&
                  <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                  <div className="left col-md-8">
                    <div className="pm-heading my-2">
                      <span className="mb-3">Guests</span>
                    </div>
                    <Table bordered>
                      <tbody>
                        <tr>
                          <td>Automation messaging for confirmation of booking and other details, such as balance payment due etc? </td>
                          <td>{item.guests.automationMessaging}</td>
                        </tr>
                        <tr>
                          <td>Automation messaging for confirmation of the payment? </td>
                          <td>{item.guests.automationMessagingForPayment}</td>
                        </tr>
                        <tr>
                          <td>Other automated information on location and property? </td>
                          <td>{item.guests.automatedInfoOnLocation}</td>
                        </tr>
                        <tr>
                          <td>Link to a guest app which may or may not include 3? </td>
                          <td>{item.guests.guestAppLink}</td>
                        </tr>
                        <tr>
                          <td>Mailed paperwork, thank you message or freebies? </td>
                          <td>{item.guests.mailedPaperwork}</td>
                        </tr>
                        <tr>
                          <td>Pre arrival information (key access, times, support contact details etc</td>
                          <td>{item.guests.preArrivalInfo}</td>
                        </tr>
                        <tr>
                          <td>In-stay messages? Yes </td>
                          <td>{item.guests.inStayMessages}</td>
                        </tr>
                        <tr>
                          <td>Post stay automated messages and review requests? </td>
                          <td>{item.guests.postAutomatedMessages}</td>
                        </tr>
                        <tr>
                          <td>Personal phone calls for</td>
                          <td>{item.guests.personalPhoneCalls}</td>
                        </tr>
                        <tr>
                          <td>Focussed and personal repeat marketing</td>
                          <td>{item.guests.personalRepeatMarketing}</td>
                        </tr>
                        <tr>
                          <td>Do guests have access to a guest login section to see their bookings and entry codes etc? </td>
                          <td>{item.guests.guestHaveAccessToLogin}</td>
                        </tr>
                        <tr>
                          <td>Do guests have access to a separate mobile app</td>
                          <td>{item.guests.guestHaveAccessToMobApp}</td>
                        </tr>
                      </tbody>
                    </Table>
                      </div>
                      </div>
                }

                {item.saleDetails && (
                  <div className="managment-summary ms-listing-contract row flex-md-nowrap">
                    <div className="left col-md-8">
                      <div className="pm-heading my-2">
                        <span className="mb-3">Sale Details</span>
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
                      <div className="pm-heading">
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
                      <div className="pm-heading">
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
                      <div className="pm-heading">
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
