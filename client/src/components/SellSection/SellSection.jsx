import React from "react";
import "./sell-section.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import s1 from "../../images/sell/s1.svg";
import s2 from "../../images/sell/s2.svg";
import s3 from "../../images/sell/s3.svg";
import s4 from "../../images/sell/s4.svg";
import s5 from "../../images/sell/s5.svg";
import s6 from "../../images/sell/s6.svg";
import s7 from "../../images/sell/s7.svg";
import { NavLink } from "react-router-dom";

const SellSection = ({title,descript,list,isSlider,image}) => {
  return (
    <div className="sell-section">
      <div className="container">
        <div className="row s-row gx-5">
          <div className="col-md-5 left">
            {
              isSlider? (
              <Swiper
              className="mySwiper"
              effect={"fade"}
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              auto={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              <SwiperSlide>
                <img src={s3} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={s5} alt="" />
              </SwiperSlide>       
              <SwiperSlide>
                <img src={s6} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={s7} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={s2} alt="" />
              </SwiperSlide>
            </Swiper>) : (
              <div className="ss-left-img">
                <img src={image} data-aos="fade-up" data-aos-duration="1400" alt="" />
              </div>
            )
            }
            
          </div>
          <div className="col-md-6 right mb-5">
            <div className="inner">
              <div className="section-header mt-4 mb-1 pb-2">
                <h2 className="section-title ss-title" data-aos="fade-up" data-aos-duration="1600">
                  {title}
                </h2>
              </div>
              <div className="descript" data-aos="fade-up" data-aos-duration="1800">
                <span>{descript}</span>
              </div>
              <ul className="list" data-aos="fade-up" data-aos-duration="1900">
                {
                  list.map((data,i)=>(
                    <li key={i}>{data.item}</li>
                  ))
                }
              </ul>

                  <div className="btn-wrapper">
                <NavLink to={'/signup'}>
              <button className="button">Get Started</button>
              </NavLink>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellSection;
