const express = require('express');
const { addAdvisor, getAdvisors, getAdvisorById, getRelevantAdvisors, sortByExpertise, sortByDealsClosed } = require('../Controllers/AdvisorController');
const router = express.Router();

router.post('/advisor/create',addAdvisor);
router.get('/advisors',getAdvisors);
router.get('/advisors/:id',getAdvisorById);
router.get('/advisors/relevant/:query',getRelevantAdvisors);
router.post('/advisors/sortbyexpertise',sortByExpertise);
router.post('/advisors/sortbydeals',sortByDealsClosed);

module.exports = router;