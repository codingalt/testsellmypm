import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import ListingView from '../components/listingView/ListingView'
import Menu from '../components/Menu/Menu'
import Navbar from '../components/navbar/Navbar'
import TopNav from '../components/topnav/TopNav'

const ListingViewPage = () => {
  const {listingId} = useParams();
  return (
    <div className='home'>
        <TopNav />
        <Menu />
        <ListingView listingId = {listingId} />
        <Footer />
    </div>
  )
}

export default ListingViewPage