import React,{useState,useEffect} from "react";
import "./navbar.css";
import * as bs from "react-icons/bs";
import buisness from "../../images/buisness.png";
import listing from "../../images/list.png";
import services from "../../images/services.png";
import property from "../../images/property.png";
import investment from "../../images/investment.png";
import logoarea from '../../images/logoarea.png'
import final from '../../images/final.png'
import { NavLink, useNavigate } from "react-router-dom";
import wantedImages, { sellImages } from "./catImages";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);  
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const Authenticate = async () => {
    try {
      const res = await fetch(`/auth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.success);
      if(!data.success){
        setIsAuthenticated(false);      
      }else{
        setIsAuthenticated(true)
      }
   
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  // get All categories

  const getCategories = async()=>{
    try {
      const res = await fetch(`/categories`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if(data.success){
        setCategories(data.categories);
      }  
    } catch (error) {
      setCategories([]);
    }
  }

  useEffect(() => {
    Authenticate();
    getCategories();
  }, []);

  return (
    <header className="header fixed-top">
      <div className="header-inner">
        <section className="wrapper">
          <div className="header-item-left">
            <NavLink to="/">
              <img className="" src={final} alt="" />
            </NavLink>
          </div>
          {/* Navbar Section  */}
          <div className="header-item-center">
            <div className="overlay"></div>
            <nav className="menu" id="menu">
              <div className="menu-mobile-header">
                <button type="button" className="menu-mobile-arrow">
                  <i className="ion ion-ios-arrow-back"></i>
                </button>
                <div className="menu-mobile-title"></div>
                <button type="button" className="menu-mobile-close">
                  <i className="ion ion-ios-close"></i>
                </button>
              </div>
              <ul className="menu-section">
                <li className="menu-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="menu-item-has-children">
                  <NavLink to="/listing">
                    Browse Listings <bs.BsChevronDown />
                  </NavLink>
                  <div className="menu-subs border menu-column-1">
                    <div className="container mx-auto">
                      <div className="mx-auto inner">
                        <div className="">
                          <ul>
                          <li>
                              <a href="#">Wanted</a>
                            </li>
                            {
                              categories?.filter((item,i)=> item.type === 'wanted').map((item,i)=>{
                                return(
                                  <NavLink key={item._id} to={'/listing/' + item._id}>
                                  <li key={item._id}>
                              <img src={wantedImages[i].path} alt="" />
                              <a href="#">{item.name}</a>
                            </li>
                            </NavLink>
                                )
                              })
                            }
                           
                          </ul>
                        </div>
                        <div className="">
                          <ul>
                            <li>
                              <a href="#">For Sale</a>
                            </li>
                            {
                              categories?.filter((item,i)=> item.type === 'sell').map((item,i)=>{
                                return(
                                  <NavLink key={item._id} to={'/listing/' + item._id}>
                                  <li key={item._id}>
                              <img src={sellImages[i].path} alt="" />
                              <a href="#">{item.name}</a>
                            </li>
                            </NavLink>
                                )
                              })
                            }
                         
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="menu-item">
                  <a href="#">Membership</a>
                </li>
                <li className="menu-item-has-children">
                  <NavLink to="/listing/post">Post Listing</NavLink>
                </li>
            
              </ul>
            </nav>
          </div>

          <div className="header-item-right">
          <div className="nav-search">
                    <input type="text" placeholder="Search.." />
                    <bs.BsSearch className="icon" />
                  </div>
            {/* {isAuthenticated ? (
              <NavLink to={"/listing/post"}>
                <button className="login-btn">Post Listing{isAuthenticated}</button>
              </NavLink>
            ) : (
              <NavLink to={"/login"}>
                <button className="login-btn">Login {isAuthenticated}</button>
              </NavLink>
            )} */}

            <button type="button" className="menu-mobile-toggle">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Navbar;
