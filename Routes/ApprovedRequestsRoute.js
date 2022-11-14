const express = require("express");
const Authenticate = require("../authenticate/authenticate");
const {
  PostApproveRequest,
  getApprovedRequests,
} = require("../Controllers/ApprovedRequestController");
const router = express.Router();

router.post("/buyerrequest/accept", Authenticate, PostApproveRequest);
router.get("/approvedrequests/", Authenticate, getApprovedRequests);

module.exports = router;
