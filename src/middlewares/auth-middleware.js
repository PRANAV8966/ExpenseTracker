const jwt = require("jsonwebtoken");

const { jwtKey } = require('../config/server-config.js');

exports.authenticate = async (req, res, next) => {
  try {
    console.log('this is the token from headers', req.header("Authorization"));
    const token = req.header("Authorization");
    const user = await jwt.verify(token, jwtKey);
    const userId = user.id;
    req.body = {...req.body, userId};
    next();
  } catch (error) {
    console.log('this is the error', error);
    return res.status(401).json({ 
        success:false,
        message: "User not authenticated",
        error: error
    });
  }
};
