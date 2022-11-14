const mongoose = require("mongoose");

const approvedRequests = mongoose.Schema(
  {
    approvedByUserId: {
      type: String,
      required: true,
    },
    receivedByUserId: {
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

const approvedRequestModel = mongoose.model(
  "ApprovedRequests",
  approvedRequests
);
module.exports = approvedRequestModel;
