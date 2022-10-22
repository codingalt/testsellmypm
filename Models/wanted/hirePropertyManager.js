const listingModel = require('../ListingModel');
const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };

var hirePropertyManager = listingModel.discriminator(
    "hirePropertyManager",
    new mongoose.Schema(
      {
        listType: {
            type: String,
        },
        servicesNeeded:{
            type: String,
        }
      },
      options
    )
  );

  module.exports = {hirePropertyManager}