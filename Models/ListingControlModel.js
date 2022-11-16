const mongoose = require("mongoose");

const ListingControl = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  numListing: {
    type: Number,
    required: true,
  }
},
{ timestamps: true }
);

const ListingControlModel = mongoose.model("listingControl", ListingControl);
module.exports = ListingControlModel;
