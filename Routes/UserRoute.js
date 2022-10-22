const express = require('express');
const Authenticate = require('../authenticate/authenticate');
const { registerUser, loginUser, logoutUser, getUserData } = require('../Controllers/UserController');
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/user/:userId',getUserData);
router.get('/auth', Authenticate, (req,res)=>{
    res.send(req.rootUser);
});
// router.get('/',Home);

module.exports = router;