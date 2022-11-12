import React from 'react'
import { NavLink } from 'react-router-dom'
import './seller-hero.css'
import cta from "../../images/cta.svg";
import cta2 from "../../images/services3.svg";
import * as bs from "react-icons/bs";

const SellerHero = ({heroTitle, heroDescript, smText, bgColor}) => {
  return (
    <div className="sell-section seller-hero" style={{background: bgColor}}>
    <div className="container sh-sub-container">
      <div className="row s-row gx-5 cta-row">
      
        <div className="col-lg-6 col-md-6 right cta-right sh-right">
          <div className="inner">
            <div className="section-header mt-md-4 mt-0 mb-0 mb-md-1 pb-md-2 pb-0">
            <div className="descript sh_descript" data-aos="fade-up" data-aos-duration="1800">
              <span style={{textAlign:'left'}}>{smText}</span>
            </div>
              <h2 className="section-title sh-title" data-aos="fade-up" data-aos-duration="1600">
              {heroTitle}
              </h2>
            </div>
            <div className="descript sh-descript" data-aos="fade-up" data-aos-duration="1800">
              <span>{heroDescript}</span>
            </div>
            {/* <ul className="list" data-aos="fade-up" data-aos-duration="1900">
                {
                  list.map((data,i)=>(
                    <li key={i}>{data.item}</li>
                  ))
                }
            </ul> */}

                <div className="btn-wrapper">
              <NavLink to={'/signup'}>
            <button className="button mt-4">Join Now <bs.BsArrowRight /></button>
            </NavLink>
            </div>

          </div>
        </div>

        <div className="col-md-6 left cta-left sh-left">
         <img className='sh-img1' data-aos="fade-up" data-aos-duration="1200" src={cta} alt="" />
         <img className='sh-img2' data-aos="fade-down" data-aos-duration="1600" src={cta2} alt="" />
        </div>

      </div>
    </div>
  </div>
  )
}

export default SellerHero