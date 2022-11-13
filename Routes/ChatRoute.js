const express = require('express');
const { userChats, createChat, findChat } = require('../Controllers/ChatController');
const Authenticate = require('../authenticate/authenticate')

const router = express.Router();

router.post('/chat/',Authenticate, createChat);
router.get('/chat/',Authenticate,userChats);
router.get('/chat/find/:firstId/:secondId',Authenticate,findChat);

module.exports = router;