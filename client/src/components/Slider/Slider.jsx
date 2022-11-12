import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay,EffectFade } from "swiper";
import "./slider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import s1 from "../../images/slider/s1.jpg";
import s2 from "../../images/slider/s2.jpg";
import s3 from "../../images/slider/s3.jpg";
import s4 from "../../images/slider/s4.jpg";
import s5 from "../../images/slider/s5.jpg";
import s6 from "../../images/slider/s6.jpg";
import s7 from "../../images/slider/s7.jpg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../Context/MainContext";

const Slider = () => {
  const {memberShipScrollHandle} = useContext(MainContext)
  return (
    <div className="slider-container">
      <Swiper
        className="mySwiper"
        effect={"fade"}
        modules={[Navigation, Pagination,Autoplay,EffectFade]}
        // navigation={true}
        pagination={{
          clickable:true
        }}
        centeredSlides={true}
        auto={true}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
      >
        <SwiperSlide>
          <img src={s5} alt="" />
          <div className="overlay">
            <div className="slide-item">
              <div className="title" data-aos="fade-up" data-aos-duration="1800">
            <h1> Short Term Rentals <span> #1 </span>Property</h1>
            <h1 className="sec-h1">Manager <span>Marketplace</span></h1>
            </div>
            <span data-aos="fade-left" data-aos-duration="1800">Advertise to buy and sell businesses, listings and properties in complete confidence</span>
            <div className="buttons">
              <NavLink to={'/listing/post'}>
                <button>Post Listing</button>
                </NavLink>
                <NavLink to={'/listing'}>
                <button style={{background:'transparent',border:'2px solid #fff'}}>Browse Listings</button>
                </NavLink>
            </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={s1} alt="" />
          <div className="overlay">
            <div className="slide-item">
              <div className="title">
            <h1 className="title2"> The Fastest, Easiest way to <span>Sell</span>  your PM.</h1>
            <h1 className="title2">No Fees. No hassle. <span>Total anonymity.</span></h1>
            </div>
            <span>Short-term rentals #1 acquisition marketplace. Get access to trusted buyers. Big or small, <br /> sell your PM at the maximum price in as little as 30 days.</span>
            <div className="buttons">
            <NavLink to={'/listing'}>
                <button onClick={memberShipScrollHandle} style={{width:'13rem'}}>View Listings</button>
                </NavLink>
            </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={s4} alt="" />
          <div className="overlay">
            <div className="slide-item">
              <div className="title">
            <h1 className="title2"><span>Everything</span> you need to buy your</h1>
            <h1 className="title"> <span>Next PM</span></h1>
            </div>
                <span>Browse 100s of PMs for sale, vetted by acquisition veterans. Instantly connect with founders to evaluate key metrics. <br /> Hire approved advisors or skip straight to negotiation. Everything you need to issue an LOI in as little as 30 days.</span>
            <div className="buttons">
              <NavLink to={'/signup'}>
                <button style={{width:'13rem'}}>Create Account</button>
                </NavLink>
            </div>
            </div>
          </div>
        </SwiperSlide>
  
      </Swiper>
    </div>
  );
};

export default Slider;
