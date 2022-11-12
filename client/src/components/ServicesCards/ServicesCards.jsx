import React from 'react'
import './services-card.css'
import buisness from '../../images/buisness.png'
import listing from '../../images/list.png'
import services from '../../images/services.png'
import property from '../../images/property.png'
import investment from '../../images/investment.png'

const ServicesCards = () => {
  return (
    <div className='cards-wrapper'>
       <div className="listing-container">
      {/* <!------Categories--> */}
      <section className="categories" id="categories">
        <div className="section-header custom-header mt-4 mb-5 pb-2">
          <h2 data-aos="fade-up" data-aos-duration="1500" className="section-title text-center">The World's Number One Property Manager Market Place</h2>
        </div>
        <div className="row cat-container" data-aos="fade-left" data-aos-duration="1900">
          <div className="card-container border">
            <div className="image">
            <img src={listing} alt="" />
            </div>
            <div className="card-title">
              <span>Sellers</span>
            </div>
            <div className="descript">
              <span>List your startup for free and get eyes on it instantly.</span>
            </div>
          </div>
          <div className="card-container border">
          <div className="image">
            <img src={services} alt="" />
            </div>  
            <div className="card-title">
              <span>Platform</span>
            </div>
            <div className="descript">
              <span>Connecting PMs looking to buy listing contracts or entire businesses with those looking to sell.</span>
            </div>        
          </div>
          <div className="card-container border">
          <div className="image">
            <img src={investment} alt="" />   
            </div>
            <div className="card-title">
              <span>Buyers</span>
            </div>
            <div className="descript">
              <span>Find your ideal startup and evaluate key metrics before making an offer.</span>
            </div>       
          </div>

        </div>
   
      </section>
      {/* <!---End of Categories--> */}
    </div>
    </div>
  )
}

export default ServicesCards