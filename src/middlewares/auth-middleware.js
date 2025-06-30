const jwt = require("jsonwebtoken");

const { jwtKey } = require('../config/server-config.js');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await jwt.verify(token, jwtKey);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
        success:false,
        message: "User not authenticated",
        error: error
    });
  }
};
