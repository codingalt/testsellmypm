const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
   name: {
    type: String,
    required: true,
   },
   type: {
    type: String,
    required: true,
   },
   shortKey: {
    type: String,
    required: true
   }
  
  },
);

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;