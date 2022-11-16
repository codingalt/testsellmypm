const express = require("express");
const ListingControlModel = require('../Models/ListingControlModel');

const createSpecialUser = async(req,res) =>{
    const {userId, numListing} = req.body;
    console.log(numListing);
    const defaultListing = 3;
    const newListing = parseInt(defaultListing) + parseInt(numListing);
    if(!userId || !numListing){
        res.status(401).json({ message:'User id or Number of listing cannot be empty', success: false }); 
        return;
    }
    try {
        const newSpecialUser = new ListingControlModel({userId, numListing: newListing})
        const isUser = await ListingControlModel.findOne({userId: userId});
        if(isUser){
            const updateUser = await ListingControlModel.findByIdAndUpdate(isUser._id, {numListing: newListing},{
                new: true,
                useFindAndModify: false,
            });
            res.status(200).json({ updateUser, success: true });
        }else{
        const result = await newSpecialUser.save();
        res.status(200).json({ result, success: true });
        }
        
      } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error);
      }
}

module.exports = {createSpecialUser}