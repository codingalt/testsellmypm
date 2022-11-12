import React, { useContext } from "react";
import './footer.css'
import * as bs from 'react-icons/bs'
import * as fa from 'react-icons/fa'
import * as io from 'react-icons/io'
import { NavLink } from "react-router-dom";
import MainContext from "../Context/MainContext";

const Footer = () => {
  const {memberShipScrollHandle} = useContext(MainContext);

  return (
    <div>
      <footer>
        <section className="footer-Content" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-mb-12">
                <div className="widget">
                  <h3 className="block-title text-bold text-white">Short Link</h3>
                  <ul className="menu">
                    <li>
                      <NavLink to={'/terms'} style={{color:'#eaeaea'}}>
                       Terms & Conditions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/privacy'} style={{color:'#eaeaea'}}>
                        Privacy Policy
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/buyersellermnda'} style={{color:'#eaeaea'}}>
                       Seller & Buyer MNDA
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/buyersellerterms'} style={{color:'#eaeaea'}}>
                        Seller & Buyer Terms & Conditions
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-mb-12 mt-4 mt-md-0">
                <div className="widget">
                  <h3 className="block-title text-bold text-white">Company</h3>
                  <ul className="menu">
                    <li>
                      <NavLink to={'/listing/post'} style={{color:'#eaeaea'}}>
                       Post Listing
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/listing'} style={{color:'#eaeaea'}}>
                        Browse Listings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/signup'} style={{color:'#eaeaea'}}>
                       Create Account
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'#'} onClick={memberShipScrollHandle} style={{color:'#eaeaea'}}>
                        Membership Plans
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-mb-12 mt-4 mt-md-0">
                <div className="widget">
                  <h3 className="text-white">ABOUT US</h3>
                  <div className="textwidget">
                    <p style={{color:'#eaeaea'}}>
                    SellMyPM is a marketplace connecting PMs looking to buy listing contracts or entire businesses with those looking to sell. It also provides help and support to PMs looking to sell with the selling process.
                    </p>
                  </div>
                  <ul className="footer-social">
                    <li>
                      <a className="facebook" href="#">
                        <fa.FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="#">
                       <bs.BsInstagram />
                      </a>
                    </li>
                    <li>
                      <a className="linkedin" href="#">
                        <fa.FaLinkedinIn />
                      </a>
                    </li>
                    <li>
                      <a className="google-plus" href="#">
                        <io.IoLogoGoogleplus />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div id="copyright" style={{background:'#000'}}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="site-info">
                  <p className="text-center text-white">
                    &copy; copyright sellmypm.com  
                    <span className="text-white" style={{marginLeft:'5px'}} id="copyright-year">
                    {new Date().getFullYear()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
