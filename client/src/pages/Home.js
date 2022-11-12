import React from 'react'
import CalltoAction from '../components/CalltoAction/CalltoAction'
import Footer from '../components/Footer/Footer'
import JoinSection from '../components/JoinSection/JoinSection'
import Listings from '../components/ListingSection/Listings'
import Menu from '../components/Menu/Menu'
import WithSubnavigation from '../components/Menu/Menu'
import Navbar from '../components/navbar/Navbar'
import Pricing from '../components/PricingCards/Pricing'
import SellSection from '../components/SellSection/SellSection'
import Services from '../components/Services/Services'
import ServicesCards from '../components/ServicesCards/ServicesCards'
import Slider from '../components/Slider/Slider'
import Testimonial from '../components/Testimonial/Testimonial'
import TopNav from '../components/topnav/TopNav'
import cta from '../images/cta.svg'

const Home = () => {
  const title1 = 'Discover your next move';
  const title2 = 'SELL QUICKLY, EASILY, AND FOR THE HIGHEST PRICE'
  const descript2 = 'List your PM in front of hundreds of potential buyers. Hire advisors to help manage and close your acquisition. Start conversations that lead to acquisitions in as little as 30 days.'
  const descript1 = 'Search hundreds of verified PMs, with upfront key STR and financial metrics to find your perfect match. Be ready to make an offer in as little as 3 weeks.'
  const list1 = [
    {
    item: 'Evaluate 20+ STR and financial metrics'
  },
  {
    item: 'Filter listings to help find your next target'
  },
  {
    item: 'Access to the best STR acquisition experts'
  }
]
  const list2 = [
    {
      item: 'No selling fees, no commissions'
    },
    {
      item: 'Hundreds of vetted buyers to maximise your chances of selling'
    },
    {
      item: 'Access to the best STR acquisition experts and advisors to help secure the best outcome for you'
    },
    {
      item: 'Always anonymous, you choose what to share and with whom'
    },
    {
      item: 'Access to resources to help you plan, prepare and execute the sale'
    }
  ]
  return (
    <div className='home'>
        <TopNav />
        {/* <Navbar /> */}
      <Menu />
        <Slider />
        {/* <ServicesCards /> */}
        <Services />
        <Listings />
        <CalltoAction image={cta} title={title1} descript={descript1} list={list1} />
        <SellSection isSlider={true} title={title2} descript={descript2} list={list2} />
        <Testimonial />
        <Pricing />
        <JoinSection />
        <Footer />
    </div>
  )
}

export default Home