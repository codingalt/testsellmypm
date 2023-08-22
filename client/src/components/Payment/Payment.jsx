import React from "react";
import "./payment.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Payment = (token) => {
  const handleToken = async (token) => {
    console.log('handle payment');
    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/payment`, {
        token: token.id,
        packageType: "monthly",
      },{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mx-auto my-3">Stripe Payment</h1>
      <br />
      <div className="form-group container">
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={handleToken}
        />
      </div>
    </div>
  );
};

export default Payment;
