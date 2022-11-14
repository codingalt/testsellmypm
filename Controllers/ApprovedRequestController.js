const express = require("express");
const router = express.Router();
router.use(express.json());
const approvedRequestModel = require("../Models/ApprovedRequests");
const buyerRequestModel = require("../Models/BuyerRequests");
const UserModel = require("../Models/UserModel");

const PostApproveRequest = async (req, res) => {
  const { approvedByUserId, receivedByUserId, listing } = req.body;

  const listingId = listing[0]._id;

  try {
    if (!approvedByUserId || !receivedByUserId || !listing) {
      res
        .status(400)
        .json({ message: "Fields cannot be empty", success: false });
    }

    // Checking if already approved listing
    const isAlreadyApproved = await approvedRequestModel.findOne({
      listing: { $elemMatch: { _id: listingId } },
    });
    if (isAlreadyApproved) {
      if (isAlreadyApproved.approvedByUserId === approvedByUserId) {
        res
          .status(400)
          .json({
            message: "You have Already Approved this Listing",
            success: false,
          });
      }
    } else {
      const buyerRequestUpdate = await buyerRequestModel.findOne({
        listing: { $elemMatch: { _id: listingId } },
      });
      const findAndUpdateStatus = await buyerRequestModel.findByIdAndUpdate(
        buyerRequestUpdate._id,
        { status: "Approved" },
        {
          new: true,
          useFindAndModify: false,
        }
      );

      const approveRequest = new approvedRequestModel({
        approvedByUserId,
        receivedByUserId,
        listing,
        status: "Approved",
      });
      const postRequest = await approveRequest.save();
      res.status(200).json({ postRequest, success: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getApprovedRequests = async (req, res) => {
  const userId = req.userId.toString();
  try {
    const approvedRequests = await approvedRequestModel.find({
      receivedByUserId: userId,
    }).sort({createdAt: -1});
    res.status(200).json({ approvedRequests, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { PostApproveRequest, getApprovedRequests };
