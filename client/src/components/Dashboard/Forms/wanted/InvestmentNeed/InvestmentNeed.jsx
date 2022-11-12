import React from 'react'
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useFormik,ErrorMessage  } from 'formik';
import MainContext from '../../../../Context/MainContext';

const InvestmentNeed = () => {
    const {categoryId} = useParams();
    const { myOwnId } = useContext(MainContext);
    const [listImages, setListImages] = useState([]);
    const [loader, setLoader] = useState(null);
    const formik = useFormik({
      initialValues: {
        userId: myOwnId,
        listType: "listingContractForSell",
        categoryId: categoryId,
        images: [],
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
        rentalKpis: {
          avgBookingValue: 0,
          avgOccupancyRate: 0,
          monthsLeftOnContract: 0,
          monthsUnderYourControl: 0,
        },
        saleDetails: {
          reasonForSelling: "",
          askingPrice: "",
          specificPrice: "",
        },
        propertyDetails: {
          maintenanceIssues: "",
          ownerIssues: "",
          stopRentingReason: "",
        },
      },
      onSubmit: values => {
        const postData = async () => {
          setLoader(true);
          const res = await fetch(`${process.env.REACT_APP_API}/listing/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values,null,2),
          });
          const data = await res.json();
          console.log(data);
          setLoader(false);
        };
        postData();
      },
    
    });
  
    console.log(formik.values.images);
  
    const imageHandler = (e)=>{
      const files = Array.from(e.target.files);
      files.forEach((file)=>{
        const reader = new FileReader();
  
        reader.onload = ()=>{
          if(reader.readyState === 2){
            setListImages((prev)=> [...prev, reader.result])
            formik.values.images.push(reader.result)
          }
        }
  
        reader.readAsDataURL(file);
      })
    }
  
    return (
      <div className="listing-contract">
         <TailSpin
            height="110"
            width="110"
            color="#744BBE"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="loader_wrapper"
            visible={loader}
          />
        <div className="card border shadow-sm rounded">
          <div className="heading">Investment Needed</div>
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
                    name='details.title'
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
  
  
            <div className="title">
              <span>Sale Details</span>
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
                  <label>Major owner issues in past 3 years</label>
                  <textarea
                    type="text"
                    name="propertyDetails.ownerIssues"
                    value={formik.values.propertyDetails.ownerIssues}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Major owner issues in past 3 years"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    Anything that may cause owner to stop short-term renting
                  </label>
                  <textarea
                    type="text"
                    name="propertyDetails.stopRentingReason"
                    value={formik.values.propertyDetails.stopRentingReason}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Anything that may cause owner to stop short-term renting"
                  />
                </div>
              </div>
            </div>
  
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Select Listing Images</label>
                  <input
                    name="photo"
                    multiple
                    type="file"
                    className="form-control"
                    onChange={imageHandler}
                    required
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
  
            <div className="listing-contract-btn">
              <button type="submit" className="button">Post Listing</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default InvestmentNeed