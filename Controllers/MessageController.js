const express = require('express');
const router = express.Router();
const messageModel = require("../Models/MessagesModel");
const chatModel = require('../Models/ChatModel');

const addMessage = async(req,res)=>{
    const {chatId, senderId,text} = req.body;
    const message = new messageModel({
        chatId,
        senderId,
        text,
    });
    
    try {
        // updating last message
        const lastMessage = await chatModel.findByIdAndUpdate(chatId, {lastMessage: text},{
            new: true,
            useFindAndModify: false
        });
        const result = await message.save();
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getMessages = async(req,res)=>{
    const {chatId} = req.params;
    try {
        const result = await messageModel.find({chatId});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const messageSeen = async(req,res)=>{
    const {chatId} = req.params;
    try {
        const result = await messageModel.updateMany({chatId: chatId}, {isRead: true},{
            new: true,
            useFindAndModify: false
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {addMessage,getMessages,messageSeen}