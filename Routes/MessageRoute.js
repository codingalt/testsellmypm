const express = require('express');
const { addMessage, getMessages, messageSeen } = require('../Controllers/MessageController');
const router = express.Router();

router.post('/message/',addMessage);
router.get('/message/:chatId', getMessages);
router.get('/messageseen/:chatId',messageSeen);

module.exports = router;