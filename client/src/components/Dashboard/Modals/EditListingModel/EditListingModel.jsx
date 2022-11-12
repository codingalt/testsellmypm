import React, { useContext, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { TailSpin } from "react-loader-spinner";
import MainContext from '../../../Context/MainContext';
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from 'react';
import { sidebarContext } from '../../contexts/SidebarContext';
import { useFormik,ErrorMessage  } from 'formik';

const EditListingModel = (props) => {
    const [loader, setLoader] = useState(false);
    const {deleteListing,deleted} = useContext(sidebarContext);
    const [title, setTitle] = useState('');

    const toastHandle = (result, message) => {
      if (result) {
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
   
    const formik = useFormik({
        initialValues: {
          details: {
            title: title,
            summary: ''
          },       
          saleDetails: {
            askingPrice: "",
            specificPrice: "",
          },
         
        },
        onSubmit: values => {
            // console.log(JSON.stringify(values, null, 2));
            const updateData = async () => {
              setLoader(true);
              const res = await fetch(`/listing/${props.listing._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values,null,2),
              });
              const data = await res.json();
              console.log(data);
              if(data.success){
                toastHandle(true, 'Listing Updated Successfully.');
                window.location.reload(false);
              }
              setLoader(false);
              formik.resetForm();
            };
            updateData();
          },
        
        });
    // console.log(props.listing);

    useEffect(()=>{
        const setInitialVal = ()=>{
            setTitle(props.listing.details?.title)
            formik.values.listType = props.listing?.listType;
            formik.values.details.title = props.listing.details?.title;
            formik.values.details.summary = props.listing.details?.summary;
            formik.values.saleDetails.askingPrice = props.listing.saleDetails?.askingPrice;
            formik.values.saleDetails.specificPrice = props.listing.saleDetails?.specificPrice;
        }
        setInitialVal();
    },[props])

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
        dialogClassName="modal-100w"
        size="lg"
        className="payment-modal edit-modal"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="listing-contract mt-0">
      <div className="">
         <form onSubmit={formik.handleSubmit}>
         <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Listing Title</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formik.values.details.title}
                  onChange={formik.handleChange}
                  name="details.title"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Summary</label>
                <textarea
                  type="text"
                  className="form-control"
                  required
                  name="details.summary"
                  value={formik.values.details.summary}
                  onChange={formik.handleChange}
                  rows={7}
                />
              </div>
            </div>
          </div>
          {
            props.listing.saleDetails?.askingPrice &&
            <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Asking Price</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={formik.values.saleDetails.askingPrice}
                  onChange={formik.handleChange}
                  name="saleDetails.askingPrice"
                />
              </div>
            </div>
          </div>
          }

          {
            props.listing.saleDetails?.specificPrice &&
            <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Specific Price</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={formik.values.saleDetails.specificPrice}
                  onChange={formik.handleChange}
                  name="saleDetails.specificPrice"
                />
              </div>
            </div>
          </div>
          }
         
          
          <div className="listing-contract-btn">
            <button style={loader ? {opacity: '.75'} : {opacity: '1'}} type="submit" className="button">{loader ? 'Please wait...' : 'Update Listing'}</button>
            </div>

         </form>

        </div>
        </div>
            
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditListingModel