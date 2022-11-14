const express = require("express");
const router = express.Router();
const chatModel = require("../Models/ChatModel");
const UserModel = require("../Models/UserModel");
const advisorModel = require("../Models/Advisors");

const createChat = async (req, res) => {
  try {
    // check if chat is already present
    const chat = await chatModel.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (chat) {
      res
        .status(400)
        .json({
          message: "Chat with this person is already Created",
          success: false,
          chat: chat,
        });
    } else {
      const sender = await UserModel.findById(req.body.senderId);
      const receiver = await UserModel.findById(req.body.receiverId);
      const advisor = await advisorModel.findById(req.body.receiverId);
      if (sender && receiver) {
        const newChat = new chatModel({
          members: [req.body.senderId, req.body.receiverId],
          senderName: sender.name,
          receiverName: receiver.name,
        });
        const result = await newChat.save();
        res.status(200).json({ result, success: true });
      } else if (sender && advisor) {
        const newChat = new chatModel({
          members: [req.body.senderId, req.body.receiverId],
          senderName: sender.name,
          receiverName: advisor.name,
        });
        const result = await newChat.save();
        res.status(200).json({ result, success: true });
      } else {
        res.status(401).json({ message: "User not found", success: false });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userChats = async (req, res) => {
  const userId = req.userId.toString();
  try {
    const chat = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createChat, userChats, findChat };
