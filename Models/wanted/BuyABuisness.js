const listingModel = require('../ListingModel');
const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };

var buyABuisness = listingModel.discriminator(
    "buyABuisness",
    new mongoose.Schema(
      {
        listType: {
            type: String,
        },
        rentalKpis:{
            numberOfListings: Number,
            avgBookingValue: Number,
            avgOccupancyRate: Number,
            onYearGrowthRate: String,
        }
      },
      options
    )
  );

  module.exports = {buyABuisness}