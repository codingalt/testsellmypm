const listingModel = require('../ListingModel');
const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };

var buyListingContract = listingModel.discriminator(
    "buyListingContract",
    new mongoose.Schema(
      {
        listType: {
            type: String,
        },
        rentalKpis:{
            avgBookingValue: Number,
            avgOccupancyRate: Number,
        }
      },
      options
    )
  );

  module.exports = {buyListingContract}