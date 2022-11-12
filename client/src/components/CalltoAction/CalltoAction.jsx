import React from "react";
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
import cta from "../../images/cta.svg";
import { NavLink } from "react-router-dom";

const CalltoAction = ({mainTitle, title, descript, list, isHeading, image }) => {
  return (
    <div className="sell-section mb-xs-0">
      <div className="container">
        {
          isHeading &&
          <div className="section-header mt-0 mb-md-4 pb-md-2">
          <h2
            className="section-title ss-title"
            data-aos="fade-down"
            data-aos-duration="1600"
          >
           {mainTitle}
          </h2>
        </div>
        }
       
        <div className="row s-row gx-5 cta-row">
          <div className="col-md-6 right cta-right">
            <div className="inner">
              <div className="section-header mt-md-4 mb-1 pb-2">
                <h2
                  className="section-title ss-title mt-1"
                  data-aos="fade-up"
                  data-aos-duration="1600"
                >
                  {title}
                </h2>
              </div>
              <div
                className="descript"
                data-aos="fade-up"
                data-aos-duration="1800"
              >
                <span>{descript}</span>
              </div>
              <ul className="list" data-aos="fade-up" data-aos-duration="1900">
                {list.map((data, i) => (
                  <li key={i}>{data.item}</li>
                ))}
              </ul>

              <div className="btn-wrapper">
              <a href="mailto:support@sellmypm.com">
                  <button className="button">Tell me more</button>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-5 left cta-left">
            <img data-aos="fade-up" data-aos-duration="1900" src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoAction;
