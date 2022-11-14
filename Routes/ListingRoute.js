const express = require("express");
const {
  createListing,
  getListingsByCategory,
  getAllListings,
  getSingleListing,
  getListingsByUser,
  deleteListing,
  getAllListingsAdmin,
  updateListing,
} = require("../Controllers/Listing");
const router = express.Router();
const Authenticate = require("../authenticate/authenticate");

router.get("/listings/", getAllListings);
router.get("/listingsadmin/",Authenticate,getAllListingsAdmin);
router.get("/listings/:listingId", getSingleListing);
router.post("/listings/:categoryId", getListingsByCategory);
router.get("/mylistings/", Authenticate, getListingsByUser);
router.post("/listing/create", Authenticate, createListing);
router.delete("/listing/:listingId", Authenticate, deleteListing);
router.put("/listing/:listingId", Authenticate, updateListing);

module.exports = router;
