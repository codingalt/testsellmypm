const express = require("express");
const router = express.Router();
router.use(express.json());
const buyerRequestModel = require("../Models/BuyerRequests");
const UserModel = require("../Models/UserModel");

const sendBuyerRequest = async (req, res) => {
  const { fromUserId, toUserId, listing } = req.body;

  try {
    if (!fromUserId || !toUserId || !listing) {
      res
        .status(400)
        .json({ message: "Fields cannot be empty", success: false });
      return;
    }
    if (fromUserId === toUserId) {
      res
        .status(400)
        .json({
          message: "You cannot send request to your own listings",
          success: false,
        });
      return;
    }
    // Check whether user is a paid/Member or not
    const user = await UserModel.findOne({ _id: fromUserId });
    if (user.isPaid) {
      const buyerRequest = new buyerRequestModel({
        fromUserId,
        fromUserName: user.name,
        toUserId,
        listing,
      });
      const createBuyerRequest = await buyerRequest.save();
      res
        .status(200)
        .json({
          createBuyerRequest,
          message: "Buyer Request Sent Successfully..",
        });
    } else {
      res
        .status(401)
        .json({
          message:
            "Your are not a Paid Member! Please Subscribe Any Package to Make Buyer Request",
          success: false,
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Get All Buyer Requests

const getBuyerRequests = async (req, res) => {
  const userId = req.userId.toString();
  try {
    const buyerRequests = await buyerRequestModel.find({ toUserId: userId });
    res.status(200).json({ buyerRequests, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { sendBuyerRequest, getBuyerRequests };
