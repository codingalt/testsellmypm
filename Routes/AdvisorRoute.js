const express = require("express");
const Authenticate = require("../authenticate/authenticate");
const {
  addAdvisor,
  getAdvisors,
  getAdvisorById,
  getRelevantAdvisors,
  sortByExpertise,
  sortByDealsClosed,
} = require("../Controllers/AdvisorController");
const router = express.Router();

router.post("/advisor/create", Authenticate, addAdvisor);
router.get("/advisors", Authenticate, getAdvisors);
router.get("/advisors/:id", Authenticate, getAdvisorById);
router.get("/advisors/relevant/:query", getRelevantAdvisors);
router.post("/advisors/sortbyexpertise", sortByExpertise);
router.post("/advisors/sortbydeals", sortByDealsClosed);

module.exports = router;
