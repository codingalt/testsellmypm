const mongoose = require("mongoose");

const AdvisorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dealSize: {
      type: String,
      required: true,
    },
    since: {
      type: String,
      required: true,
    },
    dealsClosed: {
      type: Number,
      required: true,
    },
    expertise: [],
    shortBio: {
      type: String,
      required: true,
    },
    linkdin: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    profilePicture: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const advisorModel = mongoose.model("Advisors", AdvisorSchema);
module.exports = advisorModel;
