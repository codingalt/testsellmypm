const mongoose = require("mongoose");

const buyerRequests = mongoose.Schema(
  {
    toUserId: {
      type: String,
      required: true,
    },
    fromUserId: {
      type: String,
      required: true,
    },
    fromUserName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    listing: [],
  },
  { timestamps: true }
);

const buyerRequestModel = mongoose.model("BuyerRequests", buyerRequests);
module.exports = buyerRequestModel;
