const express = require("express");
const UserModel = require("../Models/UserModel");
const router = express.Router();
router.use(express.json());
const userModel = require('../Models/UserModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const uuid = require('uuid').v4

const activateSubscription = async(req,res)=>{
    const {token,packageType} = req.body;
    let amount,numerOfDays;
    if(packageType === 'monthly'){
        amount = 7.99;
        numerOfDays = 30;
    }else{
        amount = 79;
        numerOfDays = 360;
    }
    try {
        const customer = await stripe.customers.create({
           email: token.email,
           source: token
          });

          const idempotencyKey = uuid();

          const charge = await stripe.charges.create(
            {
              amount: amount * 100,
              currency: "gbp",
              customer: customer.id,
              receipt_email: token.email,
            },
            {
                idempotencyKey,
            }
          );
          var date = new Date();
          date.setDate(date.getDate() + numerOfDays);
          const subscriptionDetails = {
            package: 'premium',
            packageType: packageType,
            status: 'active',
            expiryDate: date,
            createdDate: Date.now()
          }

          // First Expiring the previous activated package
    if(req.rootUser.others.subscription.length !== 0){
          const lastSubscription = req.rootUser.others.subscription.slice(-1)[0]._id;
          const user = await UserModel.findOne({subscription: {$elemMatch: {_id: lastSubscription}}})
          const updateUser = await UserModel.findByIdAndUpdate(user._id,{isPaid: false});
          const updateSubscription = await UserModel.updateOne( 
          { _id: user._id, "subscription._id": lastSubscription},
          { $set: { "subscription.$.status" : 'expired' } })
    }

    // Activating New Membership

          const userId = req.userId.toString();
          const newSubscription = await userModel.updateOne({_id: userId},{$push: {subscription: subscriptionDetails}},{
            new: true,
            useFindAndModify: false
          });
          const updateIsPaid = await userModel.updateOne({_id: userId},{isPaid: true},{
            new: true,
            useFindAndModify: false
          });
          res.status(200).json({message: 'Congrats! Your Premium Subscription Activated Successfully'});
          
    } catch (error) {
        res.status(500).json({message: error.message,success: false});
    }
   
}

module.exports = {activateSubscription}