const listingModel = require("../ListingModel");
const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };

// Listing Contract for sell
var listingContractSell = listingModel.discriminator(
  "listingContractSell",
  new mongoose.Schema(
    {
      listType: {
        type: String,
      },
      websiteUrl: String,
      incorporationDate: String,
      companyAddress: String,
      companyNumber: Number,
      companyLogo: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      rentalKpis: {
        grossRevenue: Number,
        netRevenue: Number,
        avgBookingValue: Number,
        avgOccupancyRate: Number,
        monthsLeftOnContract: Number,
        monthsUnderYourControl: Number,
      },

      propertyDetails: {
        maintenanceIssues: String,
        ownerIssues: String,
        stopRentingReason: String,
        howPropertyContracted: String,
        comissionSplit: String,
        otherFeeOnCommission: String,
        whenOwnersPaid: String,
      },
      bookings: {
        directBookingOnWebsite: String,
        directBookingByCard: String,
        directBookingOverPhone: String,
        airBnb: String,
        vrbo: String,
        bookingcom: String,
        tripAdvisor: String,
        otherOta: String,
        overThePhone: String,
      },
      ownerReporting: {
        receivesRegularStatement: String,
        isTailored: String,
        isguestDetails: String,
      },
    },
    options
  )
);

module.exports = { listingContractSell };
