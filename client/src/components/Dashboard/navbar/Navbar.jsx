import React, { createContext,useContext,useState } from 'react'
import Profile from '../../../images/slider/s1.jpg'
import * as fi from 'react-icons/fi'
import * as bi from 'react-icons/bi'
import * as io from 'react-icons/io'
import * as ai from 'react-icons/ai'
import * as bs from 'react-icons/bs'
import './navbar.css'
import { sidebarContext } from '../contexts/SidebarContext'
import { NavLink } from 'react-router-dom'
import MainContext from '../../Context/MainContext'


const Navbar = () => {
    const {isOpen, toggle} = useContext(sidebarContext);
    const {isAdmin} = useContext(MainContext);
  
  return (
    <>
     <nav className='navbar-menu' style={isOpen ? {paddingLeft: '.8rem'} : {paddingLeft: '.8rem'}}>
        {/* Left Section */}
        <div className="left">
            <span><fi.FiMenu onClick={toggle} /></span>
            <span>{isAdmin? 'Admin Dashboard' : 'Dashboard'}</span>
        </div>

        {/* Center Section */}
            <div className="right-container dashboard-right">
            <div className="center">
            <ul className='d-nav'>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/advisors'}>Advisors</NavLink>
                </li>
                <li>
                    <NavLink to={'/listing/post'}>Create Listings</NavLink>
                </li>
            </ul>
            {/* <div className="nav-search">
                    <input type="text" placeholder="Search.." />
                    <bs.BsSearch className="icon" />
                  </div> */}
            </div>

        {/* Right Section */}
            <div className="right">
                <NavLink to={'/profile'}>
                <div className='profile'>
                    <img src={Profile} alt="Profile" />
                </div>
                </NavLink>
                {/* <div className='role'>
                    <bs.BsChevronDown />
                </div> */}
            </div>

            </div>

     </nav>
    </>
  )
}

export default Navbar