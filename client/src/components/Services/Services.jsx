import React from 'react'
import services1 from '../../images/services1.svg'
import services2 from '../../images/services2.svg'
import services3 from '../../images/services3.svg'

const Services = () => {
  return (
    <div className='cards-wrapper'>
       <div className="listing-container">
      {/* <!------Categories--> */}
      <section className="categories" id="categories">
        <div className="section-header custom-header mt-4 pb-2">
          <h2 data-aos="fade-up" data-aos-duration="1500" className="section-title text-center">The world's number one property manager marketplace</h2>
        </div>
        <div className="row cat-container">
          <div className="card-container">
            <div className="image" data-aos="fade-up" data-aos-duration="1700">
            <img src={services1} alt="" />
            </div>
            <div className="card-title">
              <span>Sellers</span>
            </div>
            <div className="descript">
              <span>List your PM quickly, simply and get eyes on <br /> it instantly</span>
            </div>
          </div>
          <div className="card-container">
          <div className="image" data-aos="fade-up" data-aos-duration="2300">
            <img src={services2} alt="" />
            </div>  
            <div className="card-title">
              <span>Platform</span>
            </div>
            <div className="descript">
              <span>We connect buyers, sellers and advisors, starting the right conversations that lead to brilliant results for everyone</span>
            </div>        
          </div>
          <div className="card-container">
          <div className="image" data-aos="fade-up" data-aos-duration="2800">
            <img src={services3} alt="" />   
            </div>
            <div className="card-title">
              <span>Buyers</span>
            </div>
            <div className="descript">
              <span>Find your ideal PM and evaluate key metrics before making an offer</span>
            </div>       
          </div>

        </div>
   
      </section>
      {/* <!---End of Categories--> */}
    </div>
    </div>
  )
}

export default Services