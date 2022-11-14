import React from "react";
import "./testimonial.css";
import * as im from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Testimonial = () => {
  return (
    <div className="tl-container">
      <div className="section-header mt-5 mb-1 pb-2">
        <h2
          className="section-title"
          data-aos="fade-up"
          data-aos-duration="1600"
        >
          What do sellers and buyers say <br /> about Sell My PM
        </h2>
      </div>

      <Swiper
        className="mySwiper testimonial-swiper"
        style={{ height: "auto" }}
        effect={"fade"}
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        auto={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <div className="review-descript">
            <im.ImQuotesLeft />
            <span>
              Sell My PM is hands down the{" "}
              <b style={{ color: "var(--purple2)" }}> best platform </b> for
              selling your PM. You will get the{" "}
              <b style={{ color: "var(--purple2)" }}>
                right eyeballs on your business{" "}
              </b>{" "}
              from across short-term rentals and you will find a new home for{" "}
              <b style={{ color: "var(--purple2)" }}>business in no time.</b> If
              you are considering selling your PM I highly recommend{" "}
              <b style={{ color: "var(--purple2)" }}>Sell My PM.</b>
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="review-descript">
            <im.ImQuotesLeft />
            <span>
              <b style={{ color: "var(--purple2)" }}>Sell My PM</b> allows me to
              easily meet and connect with PMs looking to{" "}
              <b style={{ color: "var(--purple2)" }}>sell their business.</b>{" "}
              Through Sell My PM I have been able to identify PMs that fit
              perfectly within our{" "}
              <b style={{ color: "var(--purple2)" }}>portfolio.</b> I highly
              recommend Sell My PM to anyone looking to buy or sell a{" "}
              <b style={{ color: "var(--purple2)" }}>STR business.</b>
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="review-descript">
            <im.ImQuotesLeft />
            <span>
              We used{" "}
              <b style={{ color: "var(--purple2)" }}>Sell My PM to sell</b> our
              PM and the experience was excellent. They helped us get our
              listing together and when ready our{" "}
              <b style={{ color: "var(--purple2)" }}>calendar</b> was filled
              with buyer meetings. It’s an{" "}
              <b style={{ color: "var(--purple2)" }}>efficient process</b> that
              I highly recommend.
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
