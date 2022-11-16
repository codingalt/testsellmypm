import React, { useContext, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { TailSpin } from "react-loader-spinner";
import MainContext from '../../../Context/MainContext';
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from 'react';
import { sidebarContext } from '../../contexts/SidebarContext';

const IncreaseListingModel = (props) => {
  const [loader, setLoader] = useState(false);
  const { isAuthenticated } = useContext(MainContext); 
  const [numListing, setNumListing] = useState(1);

  useEffect(()=>{
    props.onHide();
  },[])

  return (
    <>
      <ToastContainer />
      <TailSpin
        height="60"
        width="60"
        color="#744BBE"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="loader_wrapper2"
        visible={loader}
      />
      <Modal
        {...props}
        dialogClassName="modal-50w"
        size="lg"
        className="payment-modal"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Increase User Listings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="confirm" style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                <span>Enter the number of listings you want to increase</span>
                <span style={{fontSize:'1.3rem',fontWeight:'600'}}>By default Premium user can post 3 listings per month / year</span>
            </div>
            <div className="row">
            <div className="col-md-12">
              <div className="form-group mt-3">
                <label>Number of Listings</label>
                <select className="form-select mt-3" required style={{height:'3.1rem'}} onChange={(e)=> setNumListing(e.target.value)}>
                  <option value="">Select Number of Listings</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              
              </div>
            </div>
          </div>
            <div className="confirm-buttons mt-4">
                <button onClick={()=>props.onHide()} className='btn btn-secondary'>Cancel</button>
                <button onClick={()=> props.increaseListing(numListing)} className='btn btn-primary'>Increase Listings</button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default IncreaseListingModel