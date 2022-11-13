const express = require('express');
const Authenticate = require('../authenticate/authenticate');
const { sendBuyerRequest, getBuyerRequests } = require('../Controllers/BuyerRequestController');
const router = express.Router();

router.post('/buyerrequest/create',Authenticate,sendBuyerRequest);
router.get('/buyerrequests/',Authenticate,getBuyerRequests);

module.exports = router;