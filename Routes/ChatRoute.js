const express = require('express');
const { userChats, createChat, findChat } = require('../Controllers/ChatController');
const Authenticate = require('../authenticate/authenticate')

const router = express.Router();

router.post('/chat/', createChat);
router.get('/chat/',userChats);
router.get('/chat/find/:firstId/:secondId',findChat);

module.exports = router;