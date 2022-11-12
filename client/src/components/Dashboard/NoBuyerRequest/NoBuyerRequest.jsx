import React from 'react'
import * as fa from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const NoBuyerRequest = () => {
  return (
    <div className='no-listing'>
        <div className="inner-box border shadow-sm">
            <div className="icon">
                <fa.FaListUl />
            </div>
            <div className="title">
                <span>You Currently have no Buyer Requests</span>
            </div>
            <div className="descipt">
                <span className='text-secondary'>Buyers that requests your listings for info. will appear here</span>
            </div>
            <div className="buttons">
                <NavLink to={'/listing'}>
                <button style={{borderRadius:'10px'}} className="button">Browse Listings</button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default NoBuyerRequest