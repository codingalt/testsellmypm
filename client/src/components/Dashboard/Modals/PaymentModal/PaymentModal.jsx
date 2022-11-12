import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useState } from "react";
import "./payment-modal.css";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import MainContext from "../../../Context/MainContext";

const PaymentModal = (props) => {
  const [packageType, setPackageType] = useState("monthly");
  const [pkgText, setPkgText] = useState("Monthly");
  const [pkgValue, setPkgValue] = useState(7.99);
  const [loader, setLoader] = useState(false);
  const { isAuthenticated } = useContext(MainContext);
  const navigate = useNavigate();

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

  const handlePackageType = (e) => {
    setPackageType(e.target.value);
    if (e.target.value === "monthly") {
      setPkgText("Monthly");
      setPkgValue(10);
    } else if (e.target.value === "yearly") {
      setPkgText("Yearly");
      setPkgValue(99);
    } else {
      setPkgText("Monthly");
      setPkgValue(10);
    }
  };

  const handleToken = async (token) => {
    props.onHide();
    setLoader(true)
    try {
      const res = await axios.post(`/payment`, {
        token: token.id,
        packageType: packageType,
      });
      if (res.status === 200) {
        props.onHide();
        toastHandle(
          true,
          "Congrats! Your Premium Subscription Activated Successfully"
        );
        setLoader(false)
        navigate("/success");

      } else {
        toastHandle(false, "Payment Unsuccessfull! Please Try again");
        setLoader(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <TailSpin
        height="110"
        width="110"
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
          <Modal.Title>Subscription Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pkg-detail">
            <div className="p-name">
              <span>Package</span>
              <span>Premium</span>
            </div>
            <div className="p-price">
              <span>{pkgText}</span>
              <span>${pkgValue}</span>
            </div>
          </div>
          <Form.Label>Package Type</Form.Label>
          <Form.Select onChange={handlePackageType}>
            <option>Select Package Type</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Form.Select>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token={handleToken}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentModal;
