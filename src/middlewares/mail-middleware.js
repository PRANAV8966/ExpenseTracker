const jwt = require("jsonwebtoken");

const { jwtKey } = require('../config/server-config.js');

const mailAuth = async (req, res, next) => {
  try {
    const token = req.query.token;
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

module.exports = {
    mailAuth
}