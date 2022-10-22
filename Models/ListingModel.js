const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };
const listingSchema = mongoose.Schema(
  {
    userId: String,
    categoryId: String,
    images: [{
      public_id: {
        type: String
      },
      url: {
        type: String,
      }
    }],
    details: {
      title: {
        type: String,
        trim: true,
        required: true,
      },
      summary: {
        type: String,
      },
      location: {
        country: String,
        region: String,
        city: String,
       },
       listingUrl: String,
    },
       saleDetails: {
        reasonForSelling: String,
        askingPrice: Number,
        specificPrice: Number,
        whoOwnsProperty: String,
        quickSaleNeed: String
       },

      },
  { timestamps: true },
  options,
);

const listingModel = mongoose.model("Listing", listingSchema);
module.exports = listingModel;
