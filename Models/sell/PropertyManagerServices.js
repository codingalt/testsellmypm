const listingModel = require("../ListingModel");
const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };

// Property Manager Services for sell
var propertyManagerServices = listingModel.discriminator(
  "propertyManagerServices",
  new mongoose.Schema(
    {
      listType: String,
      socialDetails: {
        website: String,
        linkdin: String,
        socialMediaChannels: String,
      },

      rentalKpis: {
        avgBookingValue: Number,
        avgOccupancyRate: Number,
      },

      servicesOffered: {
        type: String,
      },

      fees: {
        type: String,
      },
    },
    options
  )
);

module.exports = { propertyManagerServices };
