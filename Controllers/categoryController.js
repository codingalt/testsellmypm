const express = require("express");
const router = express.Router();
router.use(express.json());
const categoryModel = require("../Models/Categories");

// Add Category
const addCategory = async (req, res) => {
  const newCategory = categoryModel(req.body);
  try {
    await newCategory.save();
    res
      .status(200)
      .json({ message: "Category Created Successfully..", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({ categories, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// get category by Id
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const categories = await categoryModel.findById(id);
    res.status(200).json({ categories, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { addCategory, getCategories, getCategoryById };
