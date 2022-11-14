const express = require("express");
const router = express.Router();
router.use(express.json());
const cloudinary = require("cloudinary");
const advisorModel = require("../Models/Advisors");
const SearchListing = require("../utils/search");

cloudinary.config({
  cloud_name: process.env.CLOUDANIRY_CLOUD_NAME,
  api_key: process.env.CLOUDANIRY_API_KEY,
  api_secret: process.env.CLOUDANIRY_API_SECRET,
});

// Add Advisor
const addAdvisor = async (req, res) => {
  const {
    name,
    title,
    location,
    dealSize,
    since,
    dealsClosed,
    expertise,
    shortBio,
    linkdin,
    website,
  } = req.body;

  let profilePic = [];
  if (typeof req.body.profilePicture === "string") {
    profilePic.push(req.body.profilePicture);
  } else {
    profilePic = req.body.profilePicture;
  }
  const companyLogoLink = [];

  for (let i = 0; i < profilePic.length; i++) {
    const result = await cloudinary.v2.uploader.upload(profilePic[i], {
      folder: "advisors",
    });

    companyLogoLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  const newAdvisor = new advisorModel({
    name,
    location,
    title,
    dealSize,
    since,
    dealsClosed,
    expertise,
    shortBio,
    linkdin,
    website,
    profilePicture: {
      public_id: companyLogoLink[0].public_id,
      url: companyLogoLink[0].url,
    },
  });

  try {
    const result = await newAdvisor.save();
    res.status(200).json({ result, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// get All Advisors
const getAdvisors = async (req, res) => {
  try {
    const search = new SearchListing(
      advisorModel.find({}),
      req.query
    ).searchAdvisors();
    const advisors = await search.query;
    res.status(200).json({ advisors, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// get Advisor by Id
const getAdvisorById = async (req, res) => {
  const { id } = req.params;
  try {
    const advisor = await advisorModel.findById(id);
    res.status(200).json({ advisor, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// get Sort Relevant Advisors
const getRelevantAdvisors = async (req, res) => {
  const { query } = req.params;
  try {
    if (query === "newest") {
      const advisors = await advisorModel.find().sort({ createdAt: -1 });
      res.status(200).json({ advisors, success: true });
    } else if (query === "oldest") {
      const advisors = await advisorModel.find().sort({ createdAt: 1 });
      res.status(200).json({ advisors, success: true });
    } else if (query === "lowtohigh") {
      const advisors = await advisorModel.find().sort({ dealsClosed: 1 });
      res.status(200).json({ advisors, success: true });
    } else {
      const advisors = await advisorModel.find().sort({ dealsClosed: -1 });
      res.status(200).json({ advisors, success: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// sort advisor by expertise
const sortByExpertise = async (req, res) => {
  const { expertise } = req.body;
  try {
    const advisors = await advisorModel.find({ expertise: { $eq: expertise } });
    res.status(200).json({ advisors, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// get Advisor by Id
const sortByDealsClosed = async (req, res) => {
  const { lessThan, greaterThan } = req.body;
  try {
    const advisors = await advisorModel.find({
      dealsClosed: { $gte: greaterThan, $lte: lessThan },
    });
    res.status(200).json({ advisors, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  addAdvisor,
  getAdvisors,
  getAdvisorById,
  getRelevantAdvisors,
  sortByExpertise,
  sortByDealsClosed,
};
