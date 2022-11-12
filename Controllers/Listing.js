const express = require('express');
const listingModel = require('../Models/ListingModel');
const { listingContractSell } = require('../Models/sell/ListingContract');
const { propertyManagerServices } = require('../Models/sell/PropertyManagerServices');
const { propertySell } = require('../Models/sell/PropertySell');
const { buyABuisness } = require('../Models/wanted/BuyABuisness');
const { buyListingContract } = require('../Models/wanted/buyListingContract');
const { hirePropertyManager } = require('../Models/wanted/hirePropertyManager');
const router = express.Router();
const multer  = require('multer')
const cloudinary = require('cloudinary');
const SearchListing = require('../utils/search');
const { BuisnessSell } = require('../Models/sell/BuisnessSell');

cloudinary.config({ 
    cloud_name: process.env.CLOUDANIRY_CLOUD_NAME, 
    api_key: process.env.CLOUDANIRY_API_KEY,
    api_secret: process.env.CLOUDANIRY_API_SECRET
});


const createListing = async(req,res)=>{
    const userId = req.userId.toString();
    req.body.userId = userId;
    let images = []
    if(typeof req.body.images === "string"){
        images.push(req.body.images)
    }else{
        images = req.body.images;
    }

    const imagesLink = []

    for(let i=0; i<images.length; i++){

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'listings',
            });
                
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }    

    req.body.images = imagesLink;

    try {

        if(!req.rootUser.others.isPaid){
            res.status(401).json({message: "You are not a Paid Member. Please Activate a package to Advertise Your Listing",success: false});
            return;
        }

        // Checking if user has added 3 listings per month / year or not
        const expiryDate = req.rootUser.others.subscription.slice(-1)[0].expiryDate;
        const createdDate = req.rootUser.others.subscription.slice(-1)[0].createdDate;
        const listings = await listingModel.find({createdAt: {$gte: createdDate, $lte: expiryDate}});
        if(listings.length > 2){
            res.status(400).json({message: 'You Can Add only 3 listings per month. To add more listings, Please Reactivate your Membership plan',success: false})
            return;
        }

        if(req.body.listType === "listingContractForSell"){
            const liContract = new listingContractSell(req.body);
            let companyLogo = []
            if(typeof req.body.companyLogo === "string"){
                companyLogo.push(req.body.companyLogo)
            }else{
                companyLogo = req.body.companyLogo;
            }
            console.log(companyLogo.length);
            const companyLogoLink = []

            for(let i=0; i<companyLogo.length; i++){
        
                    const result = await cloudinary.v2.uploader.upload(companyLogo[i], {
                        folder: 'listings',
                    });
                        
                    companyLogoLink.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    })
        
                }    
            req.body.companyLogo = companyLogoLink;
            console.log(req.body.companyLogo);
        try {
        
            const result = await liContract.save();
        res.status(200).json({result,message: 'Congrats! Listing Posted Successfully',success: true});
            
        } catch (error) {
            console.log(error.message);
        }
        }

        else if(req.body.listType === "buisnessForSell"){
            const buisness = new BuisnessSell(req.body);
            let companyLogo = []
            if(typeof req.body.companyLogo === "string"){
                companyLogo.push(req.body.companyLogo)
            }else{
                companyLogo = req.body.companyLogo;
            }
            const companyLogoLink = []

            for(let i=0; i<companyLogo.length; i++){
        
                    const result = await cloudinary.v2.uploader.upload(companyLogo[i], {
                        folder: 'listings',
                    });
                        
                    companyLogoLink.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    })
        
                }    
            req.body.companyLogo = companyLogoLink;
        try {
        
            const result = await buisness.save();
        res.status(200).json({result,message: 'Congrats! Listing Posted Successfully',success: true});
            
        } catch (error) {
            console.log(error.message);
        }
        }
      
    
        else if(req.body.listType === "propertyForSell"){
            const property = new propertySell(req.body);
            try {
                const result = await property.save();
            res.status(200).json({result,message: 'Congrats! Listing Posted Successfully',success: true});
                
            } catch (error) {
                console.log(error.message);
            }
            
        }
    
        else if(req.body.listType === "propertyManagerServices"){
            const propertySerice = new propertyManagerServices(req.body);
            try {
                const result = await propertySerice.save();
            res.status(200).json({result,message: 'Congrats! Listing Posted Successfully',success: true});
                
            } catch (error) {
                console.log(error.message);
            }
        }
    
        // Wanted
        else if(req.body.listType === "buyABuisness"){
            const buyBuisness = new buyABuisness(req.body);
            try {
                const result = await buyBuisness.save();
            res.status(200).json({result,message: 'Congrats! Listing Posted Successfully',success: true});
                
            } catch (error) {
                console.log(error.message);
            }
        }
    
        else if(req.body.listType === "buyListingContract"){
            const buyListing = new buyListingContract(req.body);
            try {
                const result = await buyListing.save();
            res.status(200).json({result,message: 'Congrats! Listing Posted Successfully',success: true});
                
            } catch (error) {
                console.log(error.message);
            }
        }
    
        else if(req.body.listType === "hirePropertyManager"){
            const hireManager = new hirePropertyManager(req.body);
            try {
                const result = await hireManager.save();
            res.status(200).json({result,message: 'Congrats! Listing Posted Successfully',success: true});
                
            } catch (error) {
                console.log(error.message);
            }
        }
        
    } catch (error) {
        res.status(500).json(error)
    }

    
       
}

// Get Listings by Category ID
const getListingsByCategory = async(req,res)=>{
    const {categoryId} = req.params;
    try {
        const listings = await listingModel.find({categoryId});
        res.status(200).json(listings);
        
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

// Get All Listings 
const getAllListings = async(req,res)=>{
    try {
        const search = new SearchListing(listingModel.find({}), req.query).search();
        const listings = await search.query;
        res.status(200).json(listings);
        
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

// Get All Listings Admin 
const getAllListingsAdmin = async(req,res)=>{
    try {
        const search = new SearchListing(listingModel.find({}), req.query).searchByTitle();
        const listings = await search.query;
        res.status(200).json(listings);
        
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

// Get Single Listing
const getSingleListing = async(req,res)=>{
    const {listingId} = req.params;
    try {
        const listings = await listingModel.findById(listingId);
        res.status(200).json(listings);
        
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

// Get Listings By A User
const getListingsByUser = async(req,res)=>{
    const userId = req.userId.toString();
    try {
        const listings = await listingModel.find({userId: userId});
        res.status(200).json(listings);
        
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

// Delete Listing by id
const deleteListing = async(req,res)=>{
    const {listingId} = req.params;
    try {
        const listings = await listingModel.deleteOne({_id: listingId});
        res.status(200).json({listings,success:true});
        
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

// Update Listing
const updateListing = async(req,res)=>{
    const {listingId} = req.params;
    const {title,summary} = req.body.details;
    const {askingPrice, specificPrice} = req.body.saleDetails;
    try {
        const listings = await listingModel.findByIdAndUpdate(listingId,{'details.title': title,'details.summary': summary, 'saleDetails.askingPrice': askingPrice, 'saleDetails.specificPrice': specificPrice},{
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({listings,success:true});
        
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

module.exports = {createListing,getListingsByCategory,getAllListings,getSingleListing,getListingsByUser,deleteListing, getAllListingsAdmin, updateListing}