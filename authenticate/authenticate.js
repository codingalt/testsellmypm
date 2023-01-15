const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const bearerToken = req.headers['authorization'];
    if(typeof bearerToken !== 'undefined'){
      const bearer = bearerToken.split(' ');
      const jwtToken = bearer[1];
      console.log('Bearer',jwtToken);
    
    const verifyToken = jwt.verify(jwtToken, process.env.SECRET_KEY);
    const rootUser = await UserModel.findOne({
      _id: verifyToken._id,
      "tokens.token": jwtToken,
    });
    if (!rootUser) {
      throw new Error("User not found..");
    }
    const { password, confirmPass, ...others } = rootUser._doc;
    req.token = jwtToken;
    req.rootUser = { others, success: true };
    req.userId = rootUser._id;
  

    if (others.subscription.length !== 0) {
      const expiryDate = others.subscription.slice(-1)[0].expiryDate;
      const lastSubscription = others.subscription.slice(-1)[0]._id;
      const currentDate = new Date();
      if (currentDate - expiryDate > 0) {
        const user = await UserModel.findOne({
          subscription: { $elemMatch: { _id: lastSubscription } },
        });
        const updateUser = await UserModel.findByIdAndUpdate(user._id, {
          isPaid: false,
        });
        const updateSubscription = await UserModel.updateOne(
          { _id: user._id, "subscription._id": lastSubscription },
          { $set: { "subscription.$.status": "expired" } }
        );
      }
    }

    next();
  }else{
    res.status(401).send({
      message: "Unotherized User: Please login first",
      success: false,
    });
  }
//  end of bearer token if 

  } catch (error) {
    res.status(401).send({
      message: "Unotherized User: Please login first",
      success: false,
    });
    console.log(error);
  }
};

module.exports = Authenticate;
