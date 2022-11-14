import React from "react";
import "./payment.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Payment = (token) => {
  const handleToken = async (token) => {
    try {
      const res = await axios.post(`/payment`, {
        token: token.id,
        packageType: "monthly",
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
