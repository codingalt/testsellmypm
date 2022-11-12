import React from 'react'
import BrowseAllListings from '../components/BrowseAllListings/BrowseAllListings'
import Footer from '../components/Footer/Footer'
import ListingView from '../components/listingView/ListingView'
import Menu from '../components/Menu/Menu'
import Navbar from '../components/navbar/Navbar'
import TopNav from '../components/topnav/TopNav'

const BrowseListings = () => {
  return (
    <div className='home'>
        <TopNav />
        <Menu />
        <BrowseAllListings />
        <Footer />
    </div>
  )
}

export default BrowseListings