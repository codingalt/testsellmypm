import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useFormik, ErrorMessage } from "formik";
import MainContext from "../../../../Context/MainContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

const PropertyForSell = () => {
  const { categoryId } = useParams();
  const { myOwnId } = useContext(MainContext);
  const [listImages, setListImages] = useState([]);
  const [companyLogo, setCompanyLogo] = useState([]);
  const [loader, setLoader] = useState(null);

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
        autoClose: 11000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      userId: myOwnId,
      listType: "propertyForSell",
      categoryId: categoryId,
      images: [],
      websiteUrl: "",
      incorporationDate: "",
      companyAddress: "",
      companyNumber: 0,
      companyLogo: [],
      details: {
        title: "",
        summary: "",
        location: {
          country: "",
          city: "",
          region: "",
        },
        listingUrl: "",
      },
      indoor: {
        beds: 0,
        bathrooms: 0,
        outdoorSpace: "",
      },
      saleDetails: {
        reasonForSelling: "",
        whoOwnsProperty: "",
        askingPrice: 0,
        specificPrice: 0,
      },
      rentalKpis: {
        grossRevenue: 0,
        netRevenue: 0,
        avgBookingValue: 0,
        avgOccupancyRate: 0,
        monthsLeftOnContract: 0,
        monthsUnderYourControl: 0,
      },
      propertyDetails: {
        maintenanceIssues: "",
        neighbourhoodIssues: "",
        howPropertyContracted: "",
        comissionSplit: "",
        otherFeeOnCommission: "",
        whenOwnersPaid: "",
      },
      bookings: {
        directBookingOnWebsite: 0,
        directBookingByCard: 0,
        directBookingOverPhone: 0,
        airBnb: 0,
        vrbo: 0,
        bookingcom: 0,
        tripAdvisor: 0,
        otherOta: 0,
        overThePhone: 0,
      },
      ownerReporting: {
        receivesRegularStatement: "",
        isTailored: "",
        isguestDetails: "",
      },
    },
    onSubmit: (values) => {
      const postData = async () => {
        setLoader(true);
        const res = await fetch(`/listing/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        });
        const data = await res.json();
        toastHandle(data, data.message);
        setLoader(false);
        formik.resetForm();
      };
      postData();
    },
  });

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setListImages((prev) => [...prev, reader.result]);
          formik.values.images.push(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const logoHandler = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setCompanyLogo((prev) => [...prev, reader.result]);
          formik.values.companyLogo.push(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="listing-contract">
      <ToastContainer />
      <div className="card border shadow-sm rounded">
        <div className="heading">Create a Property For Sell</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <span>Basic Information</span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Listing Headline</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  name="details.title"
                  value={formik.values.details.title}
                  placeholder="This will appear as the main headline for your listing. For example, Contract in East London, Hackney"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>General Summary</label>
                <textarea
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  rows={7}
                  name="details.summary"
                  value={formik.values.details.summary}
                  placeholder="General Summary about Listing Contract"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Location</span>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="details.location.country"
                  value={formik.values.details.location.country}
                  className="form-control"
                  required
                  onChange={formik.handleChange}
                  placeholder="Enter the country where your Listing Contract is Located"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Region</label>
                <input
                  type="text"
                  name="details.location.region"
                  value={formik.values.details.location.region}
                  className="form-control"
                  required
                  onChange={formik.handleChange}
                  placeholder="Region"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>City / Town</label>
                <input
                  type="text"
                  name="details.location.city"
                  value={formik.values.details.location.city}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="City / Town"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Listing Url</label>
                <input
                  type="text"
                  name="details.listingUrl"
                  value={formik.values.details.listingUrl}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Listing Url"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  name="websiteUrl"
                  value={formik.values.websiteUrl}
                  placeholder="website"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Incorporation Date</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  name="incorporationDate"
                  value={formik.values.incorporationDate}
                  placeholder="E.g: 20-04-2022"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Company address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  name="companyAddress"
                  value={formik.values.companyAddress}
                  placeholder="Company address"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Company Number</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  name="companyNumber"
                  value={formik.values.companyNumber}
                  placeholder="Company number"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Company Logo</label>
                <input
                  name="companyLogo"
                  type="file"
                  className="mt-3"
                  onChange={logoHandler}
                  required
                  accept="image/*"
                  style={{ display: "flex", alignItems: "center" }}
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Short-term Rental KPIs</span>
          </div>
          <div className="row short-term-kpi">
            <div className="col-md-6">
              <div className="form-group">
                <label>Average Booking Value</label>
                <input
                  min={0}
                  name="rentalKpis.avgBookingValue"
                  value={formik.values.rentalKpis.avgBookingValue}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Average Booking Value"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Average Occupancy Rate</label>
                <input
                  min={0}
                  name="rentalKpis.avgOccupancyRate"
                  value={formik.values.rentalKpis.avgOccupancyRate}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Average Occupancy Rate"
                />
              </div>
            </div>
          </div>
          <div className="row short-term-kpi">
            <div className="col-md-6">
              <div className="form-group">
                <label>Months left on Contract</label>
                <input
                  min={0}
                  name="rentalKpis.monthsLeftOnContract"
                  value={formik.values.rentalKpis.monthsLeftOnContract}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Months left on Contract"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Months Under your Control</label>
                <input
                  min={0}
                  name="rentalKpis.monthsUnderYourControl"
                  value={formik.values.rentalKpis.monthsUnderYourControl}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Months Under your Control"
                />
              </div>
            </div>
          </div>
          <div className="row short-term-kpi">
            <div className="col-md-6">
              <div className="form-group">
                <label>Gross Revenue last 12 months</label>
                <input
                  min={0}
                  name="rentalKpis.grossRevenue"
                  value={formik.values.rentalKpis.grossRevenue}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Gross Revenue last 12 months"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Net revenue last 12 months</label>
                <input
                  min={0}
                  name="rentalKpis.netRevenue"
                  value={formik.values.rentalKpis.netRevenue}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Net revenue last 12 months"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Indoor Details</span>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Beds</label>
                <input
                  min={0}
                  name="indoor.beds"
                  value={formik.values.indoor.beds}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Beds"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Bathrooms</label>
                <input
                  min={0}
                  name="indoor.bathrooms"
                  value={formik.values.indoor.bathrooms}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Bathrooms"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Outdoor Space</label>
                <input
                  name="indoor.outdoorSpace"
                  value={formik.values.indoor.outdoorSpace}
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Outdoor Space"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Sale Details</span>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>Reason for selling</label>
                <Form.Select
                  size="lg"
                  name="saleDetails.reasonForSelling"
                  onChange={formik.handleChange}
                  value={formik.values.saleDetails.reasonForSelling}
                >
                  <option>
                    Capitalisation (Pull out your capital after your hard work)
                  </option>
                  <option>
                    Poor Performance (owning a business that is struggling is no
                    fun)
                  </option>
                  <option>Relocation required (sell and move on)</option>
                  <option>Retirement</option>
                  <option>Ill Health</option>
                  <option>New opportunities identified</option>
                  <option>Business in demand</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>Who owns the property?</label>
                <Form.Select
                  size="lg"
                  name="saleDetails.whoOwnsProperty"
                  onChange={formik.handleChange}
                  value={formik.values.saleDetails.whoOwnsProperty}
                >
                  <option value="you">You</option>
                  <option value="An Owner">An Owner</option>
                  <option value="3rd Party">3rd Party</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Reason for selling</label>
                <textarea
                  type="text"
                  name="saleDetails.reasonForSelling"
                  value={formik.values.saleDetails.reasonForSelling}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Please state the reason(s) for selling this contract"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Asking Price</label>
                <input
                  min={0}
                  name="saleDetails.askingPrice"
                  value={formik.values.saleDetails.askingPrice}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Asking Price"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Specific Price</label>
                <input
                  min={0}
                  name="saleDetails.specificPrice"
                  value={formik.values.saleDetails.specificPrice}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Specific Price"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Property Information</span>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>How is this property contracted? </label>
                <Form.Select
                  size="lg"
                  name="propertyDetails.howPropertyContracted"
                  onChange={formik.handleChange}
                  value={formik.values.propertyDetails.howPropertyContracted}
                >
                  <option value="exclusive">Exclusive</option>
                  <option value="non exclusive">Non Exclusive</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>What is the Commission split?</label>
                <textarea
                  type="text"
                  name="propertyDetails.comissionSplit"
                  value={formik.values.propertyDetails.comissionSplit}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Answer in %"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>Are there other fees on top of commissions? </label>
                <Form.Select
                  size="lg"
                  name="propertyDetails.otherFeeOnCommission"
                  onChange={formik.handleChange}
                  value={formik.values.propertyDetails.otherFeeOnCommission}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>When are the owners paid </label>
                <Form.Select
                  size="lg"
                  name="propertyDetails.whenOwnersPaid"
                  onChange={formik.handleChange}
                  value={formik.values.propertyDetails.whenOwnersPaid}
                >
                  <option value="Upon receipt of the deposit">
                    Upon receipt of the deposit
                  </option>
                  <option value="Upon receipt of the deposit and balance">
                    Upon receipt of the deposit and balance
                  </option>
                  <option value="After the guest has arrived">
                    After the guest has arrived
                  </option>
                  <option value="After the guest has left">
                    After the guest has left
                  </option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Major maintenance issues in past 3 years</label>
                <textarea
                  type="text"
                  name="propertyDetails.maintenanceIssues"
                  value={formik.values.propertyDetails.maintenanceIssues}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Major maintenance issues in past 3 years"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Major Neighbourhood issues in past 3 years</label>
                <textarea
                  type="text"
                  name="propertyDetails.neighbourhoodIssues"
                  value={formik.values.propertyDetails.neighbourhoodIssues}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Major Neighbourhood issues in past 3 years"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Bookings</span>
            <p className="advert-detail">
              Booking can be generated in many different ways.
            </p>
          </div>
          <div className="sub-title">
            <span>Booking Channel</span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Direct bookings on your website</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.directBookingOnWebsite"
                  value={formik.values.bookings.directBookingOnWebsite}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Direct bookings by card or wire transfer</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.directBookingByCard"
                  value={formik.values.bookings.directBookingByCard}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Direct bookings over the phone (not enquiries)</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.directBookingOverPhone"
                  value={formik.values.bookings.directBookingOverPhone}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Airbnb</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.airBnb"
                  value={formik.values.bookings.airBnb}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>VRBO</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.vrbo"
                  value={formik.values.bookings.vrbo}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Booking.com</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.bookingcom"
                  value={formik.values.bookings.bookingcom}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>TripAdvisor</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.tripAdvisor"
                  value={formik.values.bookings.tripAdvisor}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Other OTA</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.otherOta"
                  value={formik.values.bookings.otherOta}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Over the phone</label>
                <input
                  type="number"
                  min={0}
                  name="bookings.overThePhone"
                  value={formik.values.bookings.overThePhone}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="% of Bookings"
                />
              </div>
            </div>
          </div>

          <div className="title">
            <span>Owner Reporting</span>
            <p className="advert-detail">Owners, require reports.</p>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>
                  Do Owners receive regular statements from the company?{" "}
                </label>
                <Form.Select
                  required
                  size="lg"
                  name="ownerReporting.receivesRegularStatement"
                  onChange={formik.handleChange}
                  value={formik.values.ownerReporting.receivesRegularStatement}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>
                  Are these tailored to avoid full disclosure on all gross
                  income details, such as OTA involvement{" "}
                </label>
                <Form.Select
                  size="lg"
                  name="ownerReporting.isTailored"
                  onChange={formik.handleChange}
                  value={formik.values.ownerReporting.isTailored}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>
                  Do bookings show all details including guest details?{" "}
                </label>
                <Form.Select
                  size="lg"
                  name="ownerReporting.isguestDetails"
                  onChange={formik.handleChange}
                  value={formik.values.ownerReporting.isguestDetails}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Select Listing Images</label>
                <input
                  name="photo"
                  multiple
                  type="file"
                  className="mt-3"
                  onChange={imageHandler}
                  required
                  accept="image/*"
                  style={{ display: "flex", alignItems: "center" }}
                />
              </div>
            </div>
          </div>

          <div className="listing-contract-btn">
            <button
              style={loader ? { opacity: ".75" } : { opacity: "1" }}
              type="submit"
              className="button"
            >
              {loader ? "Posting..." : "Post Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForSell;
