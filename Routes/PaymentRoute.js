const express = require('express');
const Authenticate = require('../authenticate/authenticate');
const { activateSubscription } = require('../Controllers/Payment');
const router = express.Router();

router.post('/payment',Authenticate,activateSubscription);

module.exports = router;