const express = require('express');
const { createListing, getListingsByCategory, getAllListings, getSingleListing, getListingsByUser } = require('../Controllers/Listing');
const router = express.Router();
const Authenticate = require('../authenticate/authenticate');

router.get('/listings/',getAllListings);
router.get('/listings/:listingId',getSingleListing);
router.post('/listings/:categoryId',getListingsByCategory);
router.get('/mylistings/',Authenticate,getListingsByUser);
router.post('/listing/create',Authenticate,createListing);

module.exports = router;