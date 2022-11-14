const express = require("express");
const Authenticate = require("../authenticate/authenticate");
const {
  addCategory,
  getCategories,
  getCategoryById,
} = require("../Controllers/categoryController");
const router = express.Router();

router.post("/categories/create", Authenticate, addCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);

module.exports = router;
