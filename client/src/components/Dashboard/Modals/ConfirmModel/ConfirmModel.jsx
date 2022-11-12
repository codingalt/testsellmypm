import React, { useContext, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { TailSpin } from "react-loader-spinner";
import MainContext from '../../../Context/MainContext';
import { toast, ToastContainer } from "react-toastify";
import './confirm-model.css'
import { useEffect } from 'react';
import ManageListings from '../../Admin/ManageListings/ManageListings';
import { sidebarContext } from '../../contexts/SidebarContext';

const ConfirmModel = (props) => {
  const [loader, setLoader] = useState(false);
  const { isAuthenticated } = useContext(MainContext);  
  const {deleteListing,deleted} = useContext(sidebarContext);

  useEffect(()=>{
    props.onHide();
  },[deleted])

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
          <Modal.Title>Are you Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="confirm" style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                <span style={{fontSize:'1.3rem',fontWeight:'600'}}>Do you really want to delete this listing ?</span>
                <span>Clicking Delete will delete this listing permanently</span>
            </div>
            <div className="confirm-buttons mt-4">
                <button onClick={()=>props.onHide()} className='btn btn-secondary'>Cancel</button>
                <button onClick={()=>deleteListing(props.listing)} className='btn btn-danger'>Delete</button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ConfirmModel