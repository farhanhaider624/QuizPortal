const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    // console.log("lll",data);
    if(user?.isAdmin){
        next();
    }
    else{
        res.status(401).send({
          message: "You are not authorized",
          data: error,
          success: false,
        });
    }
  } catch (error) {
    res.status(401).send({
      message: "You are not authorized",
      data: error,
      success: false,
    });
  }
};
