import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import company from "../../../../../images/p1.jfif";
import banner from "../../../../../images/realestate.jpg";
import * as bs from "react-icons/bs";
import "./modal.css";
import Table from "react-bootstrap/Table";

const BuisnessSellModal = (props) => {
  return (
    <>
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
          <div className="memo-container">
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
              <img className="comapny-logo shadow" src={company} alt="" />
            </div>

            <div className="primary-details">
              <div className="left">
                <div className="inner">
                  <div className="cat-type text-secondary">
                    BUISNESS FOR SALE
                  </div>
                  <div className="title">The Red House</div>
                  <div className="location">
                    <span className="text-secondary">
                      London, United Kingdom |{" "}
                    </span>
                    <span className="text-secondary">
                      Posted 04 September 2022
                    </span>
                  </div>
                  <div className="socials">
                    <button className="btn btn-primary">
                      Verified Direct Webiste
                    </button>
                    <div className="links">
                      <span>
                        <bs.BsFacebook />
                      </span>
                      <span>
                        <bs.BsTwitter />
                      </span>
                      <span>
                        <bs.BsWhatsapp />
                      </span>
                      <span>
                        <bs.BsInstagram />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right"></div>
            </div>

            <div className="property-manager-details row flex-md-nowrap">
              <div className="left col-md-6">
                <div className="heading">
                  <span>PROPERTY MANAGER DETAILS</span>
                </div>
                <div className="list">
                  <ul>
                    <li>
                      <bs.BsShieldFillCheck />
                      <span>Incorporation date: 16 January 2005</span>
                    </li>
                    <li>
                      <bs.BsShieldFillCheck />
                      <span>Countries operating in: United Kingdom</span>
                    </li>
                    <li>
                      <bs.BsShieldFillCheck />
                      <span>Company registration number: 101106572</span>
                    </li>
                    <li>
                      <bs.BsShieldFillCheck />
                      <span>
                        Registered HQ: 31 Buckingham Palace Road, London, SW1X
                        3PT
                      </span>
                    </li>
                    <li>
                      <bs.BsShieldFillCheck />
                      <span>Company Owner/Founder: John Doesit</span>
                    </li>
                    <li>
                      <bs.BsShieldFillCheck />
                      <span>Reason for selling: Capitalisation</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right col-md-6">
                <div className="r-box">
                  <div className="heading">Summary</div>
                  <ul>
                    <li>
                      <span>Number of Properties</span>
                      <span>90</span>
                    </li>
                    <li>
                      <span>Average Booking Value</span>
                      <span>£2,190</span>
                    </li>
                    <li>
                      <span>Year on Year Growth</span>
                      <span>18%</span>
                    </li>
                    <li>
                      <span>Number of Team </span>
                      <span>4</span>
                    </li>
                    <li>
                      <span>Type of contracts </span>
                      <span>Exclusive</span>
                    </li>
                    <li>
                      <span>Type of Operation </span>
                      <span>Full Service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="managment-summary row flex-md-nowrap">
            <div className="left col-md-6">
              <div className="heading">
              <span>Property Under Management Summary</span>
                </div>
              <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Area</th>
                      <th>Number of properties 2022</th>
                      <th>Gross Reveneu per area</th>
                      <th>New Properties 2019 to 2022</th>
                      <th>Lost Properties 2019 to 2022</th>
                      <th>General Type Urban or Leisure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chelsea</td>
                      <td>15</td>
                      <td>£125,000</td>
                      <td>6</td>
                      <td>1</td>
                      <td>Urban</td>
                    </tr>
                    <tr>
                      <td>Chelsea</td>
                      <td>15</td>
                      <td>£125,000</td>
                      <td>6</td>
                      <td>1</td>
                      <td>Urban</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="right col-md-6">
                <div className="heading">
                  <span>Types of Property and Contribution</span>
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>Type of property</th>
                      <th>Number of properties</th>
                      <th>Gross Booking Value</th>
                      <th>Net Profit per booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cottages</td>
                      <td>19</td>
                      <td>£2,300</td>
                      <td>£230</td>
                    </tr>
                    <tr>
                      <td>Cottages</td>
                      <td>19</td>
                      <td>£2,300</td>
                      <td>£230</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              
            </div>

            <div className="managment-summary row flex-md-nowrap">
            <div className="left col-md-6 left2">
              <Table striped bordered hover>
                  <thead>
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
                      <td>Total # of bookings </td>
                      <td>2,000</td>
                      <td>2,400</td>
                      <td>2,700</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>Average number of nights booked per property </td>
                      <td>2,000</td>
                      <td>2,400</td>
                      <td>2,700</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>% of customers that are repeat bookings</td>
                      <td>2,000</td>
                      <td>2,400</td>
                      <td>2,700</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>What % of guests cancel? </td>
                      <td>2,000</td>
                      <td>2,400</td>
                      <td>2,700</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>What was the average advance booking window?</td>
                      <td>2,000</td>
                      <td>2,400</td>
                      <td>2,700</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>What is the average ADR?</td>
                      <td>2,000</td>
                      <td>2,400</td>
                      <td>2,700</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>What are the average stay times?</td>
                      <td>2,000</td>
                      <td>2,400</td>
                      <td>2,700</td>
                      <td>3000</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="right col-md-6">
                
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Booking Channel</th>
                      <th>% of Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Direct bookings on your website</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>Direct bookings by card or wire transfer</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Direct bookings over the phone (not enquiries)</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Airbnb</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>VRBO</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Booking.com</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>TripAdvisor</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Other OTA</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Over the phone</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              
            </div>

            <div className="buisness-detail">
              <h3 className="mb-3">What we’ve done</h3>
              <p>This is an initial look at the business to help you understand the way it operates and 
some of it’s key metrics. As a potential acquirer, this will help you to decide where to 
focus your due diligence.
This is a summary, based on what we have been told. The questions asked have been 
kept deliberately loose in structure as no company has the same model.
This does not replace the necessary due diligence that you need to perform to verify 
that the information provided here is accurate and correct</p>
            </div>


          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={props.onHide}>
            Send Proposal to Buyer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuisnessSellModal;
