const express = require("express");
const Authenticate = require("../authenticate/authenticate");
const { createSpecialUser } = require("../Controllers/ListingControl");
const router = express.Router();

router.post('/listingcontrol',createSpecialUser);

module.exports = router;