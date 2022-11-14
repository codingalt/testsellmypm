const listingModel = require("../ListingModel");
const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };

// Property for sell
var propertySell = listingModel.discriminator(
  "propertySell",
  new mongoose.Schema(
    {
      listType: {
        type: String,
      },
      indoor: {
        beds: Number,
        bathrooms: Number,
        outdoorSpace: String,
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
      whoOwnsProperty: String,
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
        neighbourhoodIssues: String,
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

module.exports = { propertySell };
