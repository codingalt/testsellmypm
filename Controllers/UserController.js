const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
router.use(express.json());
const UserModel = require('../Models/UserModel');
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
const Authenticate = require('../authenticate/authenticate');

router.use(cookieParser());

//Registeration Route
const registerUser = async(req,res)=>{
    try {
        const {name,email,password,confirmPass,terms} = req.body;
        if(!name || !email || !password || !confirmPass || !terms){
           return res.status(422).json({message: 'Please fill out the fileds..',success:false});
        }

        if(password != confirmPass){
            return res.status(422).json({message: "Password do not match",success:false});
        }

         const userExist = await UserModel.findOne({email: email})
             if(userExist){
               return res.status(422).json({message: 'Email already exist',success:false});
             }
         const user = new UserModel({ name, email, password, confirmPass,terms });
         const userRegister = await user.save();
         if(userRegister){
            res.status(201).json({message: 'User registered successfully..',success: true});
            console.log('User Registered successfully');
         }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message,success:false})
    }
};

//Login Route
const loginUser = async(req,res)=>{
    try {
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email or Password cannot be empty",success:false});
        }
       const signin= await UserModel.findOne({email: email});
       if(signin){
          const isMatch = await bcrypt.compare(password, signin.password);
          if(isMatch){
            //Generating JSON web token
            token = await signin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token,{
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true
            });
            res.status(200).json({message: "Login Successfully",success:true});
            console.log("Login Successfully");
        }else{
            res.status(400).json({message: "Invalid login details",success:false});   
        }
       } else {
        res.status(404).json({ message: "Invalid login details",success:false});
      }  
    } catch (error) {
        res.status(500).json({message: "Something went wrong Please try again",success:false});
    }

}

const getUserData = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user= await UserModel.findById(userId);
        const {password,confirmPass,...other} = user._doc;
        res.status(200).json({user: other,success: true})
    } catch (error) {
        res.status(500).json(error)
    }
 
}

//Logout Route
const logoutUser = async(req,res)=>{
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).json({message:'Logout Successfully..',success:true})
}


//Forgot Password

// router.post('/forgotpassword', async(req,res)=>{
//     try {

//         mailchimp.setConfig({
//             apiKey: "ae80c3926d307f2fc573185758ae3f8b-us14",
//             server: "us14",
//           });

//           const campaignDefaults = {
//             from_name: "Fast Shares",
//             from_email: "faheemmalik886@gmail.com",
//             subject: "Reset Password",
//             language: "EN_US"
//           };
          
//           async function run() {
//             const response = await mailchimp.lists.getAlLists();
//             console.log(response);
//           }
          
//           run()

//         const {email} = req.body;
//         console.log(email);
//         if(!email){
//             return res.status(400).json({error: "Please enter Email"})
//         }
//         const isEmail = await Register.findOne({email});
//         if(!isEmail){
//             res.status(400).json({error: "Email do not exist"});
//         }
//         else{
//             var transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                   user: 'faheemmalik886@gmail.com',
//                   pass: 'devill123'
//                 }
//               });
              
//               var mailOptions = {
//                 from: 'faheemmalik886@pepisandbox.com',
//                 to: "faheemmalik886@gmail.com",
//                 subject: 'Reset Password',
//                 text: 'Click on the link below to reset your Fast Shares Password!'
//               };
              
//               transporter.sendMail(mailOptions, function(error, info){
//                 if (error) {
//                   console.log(error);
//                 } else {
//                   console.log('Email sent: ' + info.response);
//                 }
//               });
//         }

//     } catch (error) {
//         console.log(error);
//     }
  
// });

module.exports={registerUser,loginUser,logoutUser,getUserData};