const express = require("express");
const Authenticate = require("../authenticate/authenticate");
const {
  addMessage,
  getMessages,
  messageSeen,
} = require("../Controllers/MessageController");
const router = express.Router();

router.post("/message/", Authenticate, addMessage);
router.get("/message/:chatId", Authenticate, getMessages);
router.get("/messageseen/:chatId", Authenticate, messageSeen);

module.exports = router;
