import React from "react";
import "./listing-view.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import s3 from "../../images/slider/s3.jpg";
import * as hi from "react-icons/hi";
import * as md from "react-icons/md";
import * as ai from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { useContext } from "react";
import MainContext from "../Context/MainContext";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const ListingView = ({ listingId }) => {
  const [listing, setListing] = useState([]);
  const [loader, setLoader] = useState(null);
  const [images, setImages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [messageText, setMessageText] = useState('');
  const { isPaid, myOwnId } = useContext(MainContext);

  const toastHandle = (result, message) => {
    if (result) {
      toast.success(message, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // get a Listing
  const getSingleListing = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/listings/${listingId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setListing([data]);
      setImages(data.images);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendBuyerRequest = async () => {
    if (!isPaid) {
     toastHandle(false,"You are not a Paid Member. Please Activate a Membership Package");
      return;
    }
    setLoader(true);
    try {
      const res = await fetch(`/buyerrequest/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUserId: myOwnId,
          toUserId: listing[0].userId,
          listing: listing,
        }),
      });
      const data = await res.json();
      toastHandle(res.ok, data.message);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Create chat and send message
  const createChat = async () => {
    if (!isPaid) {
      toastHandle(false,"You are not a Paid User. Please Activate any Membership Package");
       return;
     }
    if(myOwnId === listing[0].userId){
      toastHandle(false, "Unable to send message. This Advert is Published by you!");
      return;
    }
    try {
      const res = await fetch(`/chat/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: myOwnId,
          receiverId: listing[0].userId
        })
      });
      const data = await res.json();
      if(data.success){
        setChatId(data._id)
        sendMessage(data._id);
      }else{
        setChatId(data.chat._id)
        sendMessage(data.chat._id);
      }
      
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (chatId) => {
    try {
      const res = await fetch(`/message`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: myOwnId,
          chatId: chatId,
          text: messageText
        })
      });
      const data = await res.json();
      if(res.ok){
        toastHandle(true, 'Message Sent Successfully. Go to Dashboard to view your chat!');
        setMessageText('');
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleListing();
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <div className="listing-view">
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
      <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-6 l-left">
              <div className="inner">
               
                <Swiper
                  className="mySwiper"
                  effect={"fade"}
                  modules={[Pagination, Autoplay, Navigation]}
                  pagination={{
                    clickable: true,
                  }}
                  centeredSlides={true}
                  auto={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  navigation
                  loop={true}
                >
                  {images?.map((image, i) => {
                    return (
                      <SwiperSlide key={image.url}>
                        <img src={image.url} alt="" />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>

            <div className="col-md-6 l-right">
              {listing?.map((item, i) => {
                return (
                  <div key={item._id} className="inner">
                    <div className="title">{item.details.title}</div>

                    <div className="description">{item.details.summary}</div>
                    <div className="h3">Location</div>
                    <div className="location">
                      <div className="country">
                        <ul>
                          <li>
                            <hi.HiLocationMarker />
                            Country
                          </li>
                          <li>{item.details.location.country}</li>
                        </ul>
                      </div>
                      <div className="city">
                        <ul>
                          <li>
                            <md.MdOutlineLocationCity /> City
                          </li>
                          <li>{item.details.location.city}</li>
                        </ul>
                      </div>
                      {/* <div className="region">
                      <ul>
                        <li><fa.FaLocationArrow /> Region</li>
                        <li>Punjab</li>
                       </ul>
                      </div> */}
                    </div>

                    {/* Rentals KPIS  */}
                    {
                      item.rentalKpis &&
                    
                    <div className="rental-kpi">
                      {
                        item.rentalKpis &&
                        <div className="h3">Short Term Rental KPIs</div>
                      }
                      
                      <table className="table table-bordered">
                        <tbody>
                          {
                            item.rentalKpis &&
                            <tr>
                            <th scope="row">Average Booking Value</th>
                            <td>${item.rentalKpis.avgBookingValue}</td>
                          </tr>
                          }
                         {
                          item.rentalKpis &&
                          <tr>
                          <th scope="row">Average Occupancy Rate</th>
                          <td>${item.rentalKpis.avgOccupancyRate}</td>
                        </tr>
                         }
                         {
                          item.rentalKpis &&
                          <tr>
                          <th scope="row">Months left on contract</th>
                          <td>{item.rentalKpis.monthsLeftOnContract}</td>
                        </tr>
                         }
                         {
                          item.rentalKpis &&
                          <tr>
                          <th scope="row">Months Under Your Control</th>
                          <td>{item.rentalKpis?.monthsUnderYourControl}</td>
                        </tr>
                         }
                       
                        </tbody>
                      </table>
                    </div>
                }
                    {/* Rental kpi ends  */}

                    <div className="buttons message-btns">
                      <button onClick={sendBuyerRequest} className="button">{loader ? "SENDING..." : "Request for More Info"}</button>
                      {/* <button className="button">Send Message</button> */}
                    </div>
                  </div>
                  
                );
              })}

        {
          listing.length !== 0 &&
          <div className="av-right mt-4 mb-5">
          <div className="av-message-box">
            <div className="av-title">Let’s Connect</div>
            <div className="av-descript">
              To get more details about Advert, Send a message
            </div>
            <div className="av-message">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="av-label">Message</label>
                    <textarea
                      type="text"
                      className="form-control"
                      required
                      rows={5}
                      value={messageText}
                      onChange={(e)=> {setMessageText(e.target.value)}}
                    />
                  </div>
                </div>
              </div>
              <button onClick={createChat} className="av-message-btn button">Message <ai.AiOutlineArrowRight /></button>
            </div>
          </div>
        </div> 
        }


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingView;
