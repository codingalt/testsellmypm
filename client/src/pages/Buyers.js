import React from 'react'
import CalltoAction from '../components/CalltoAction/CalltoAction'
import Footer from '../components/Footer/Footer'
import JoinSection from '../components/JoinSection/JoinSection'
import Listings from '../components/ListingSection/Listings'
import Menu from '../components/Menu/Menu'
import WithSubnavigation from '../components/Menu/Menu'
import Navbar from '../components/navbar/Navbar'
import Pricing from '../components/PricingCards/Pricing'
import SellerHero from '../components/SellersHero/SellerHero'
import SellSection from '../components/SellSection/SellSection'
import Services from '../components/Services/Services'
import ServicesCards from '../components/ServicesCards/ServicesCards'
import Slider from '../components/Slider/Slider'
import Testimonial from '../components/Testimonial/Testimonial'
import TopNav from '../components/topnav/TopNav'
import cta2 from '../images/services3.svg'
import cta3 from '../images/cta.svg'
import cta4 from '../images/services1.svg'

const BuyersPage = () => {
    const bgColor = '#FBF6C7';
    const mainTitle = 'Everything you need to make an offer'
  const title1 = 'Filter Listings';
  const title2 = 'Metrics that matter'
  const title3 = 'Close the gap with acquisition financing'
  const descript1 = 'Fliter PMs by category, price, and more to find your best match. Evaluate PM efficiency to forecast your return on investment. Need more information? Contact the Property Manager directly through the platform.'
  const descript2 = 'Measure a PMs past and projected performance using key success metrics, including occupancy, average booking value, number of listings and many more. Estimate your ROI and make better acquisitions.'
  const descript3 = 'Need help financing your next purchase? We have the network and contacts to help. We can even help you convert future revenues into upfront cash to buy with power. Get approved in as little as 48 hours.'
  const list1 = [
    {
    item: 'Target PM categories like Urban or Leisure'
  },
  {
    item: 'Filter PMs by price to remove those outside of your budget'
  },
  {
    item: 'Refine PMs by number of listings to assess the size of opportunity'
  },
  {
    item: 'Search by occupancy and booking value to estimate future return on investment '
  },
]
  const list2 = [
    {
      item: 'Average Booking Value'
    },
    {
      item: 'Occupancy '
    },
    {
      item: 'Number of Listings '
    },
    {
        item: '25+ metrics'
    }
  ]
  const list3 = [
    {
      item: 'Raise a multiple of a PMs ARR to fund it’s acquisition'
    },
    {
      item: 'Friendly terms and repayment periods'
    },
    {
      item: 'Growth financing available'
    }
  ]

  const heroTitle = 'Buy a PM in just 3 weeks. Motivated Sellers. Prepared KPIs. Verified PMs. '
  const heroDescript = 'Browse from 100s of PMs for sale, verified and ready to roll. Instantly connect with Property Managers to start the process. Hire approved advisors or skip straight to negotiation. Everything you offer to buy in as little as 3 weeks.'
  const smText = 'The fastest, easiet way to buy your next property manager business'

  return (
    <div className='home'>
        <TopNav />
        <Menu />
        <SellerHero smText={smText} heroTitle={heroTitle} heroDescript={heroDescript} bgColor={bgColor} />
        <CalltoAction mainTitle={mainTitle} image={cta4} isHeading={true} title={title1} descript={descript1} list={list1} />
        <SellSection isSlider={false} image={cta2} title={title2} descript={descript2} list={list2} />
        <CalltoAction image={cta3} title={title3} descript={descript3} list={list3} />
        <Testimonial />
        <JoinSection />
        <Footer />
    </div>
  )
}

export default BuyersPage