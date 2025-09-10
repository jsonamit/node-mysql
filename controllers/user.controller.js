const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendResponse } = require("../utils/response");

exports.signup = async (req, res, next) => {
    try {
        
        if(!req.body){
            return sendResponse(res, false, "Request body is missing", null)
        }
        if(req.body.email === undefined || req.body.mobile === undefined || req.body.name === undefined){
            return sendResponse(res, false, "Name, mobile and email are required", null)
        }

        const token = jwt.sign(
            { name:req.body.name, mobile: req.body.mobile },
            process.env.JWT_SECRET,                                   
            { expiresIn: process.env.JWT_TOKEN_EXPIRE }                                      
        );

        let params = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            token: token,
        }
        const user = await User.create(params);

        let responseData = { 
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            token: token
        };

        return sendResponse(res, true, "User created successfully", responseData);
    } catch (err) {
        return sendResponse(res, false, err.message, null);
    }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return sendResponse(res, true, "User list fetched successfully", users);
  } catch (err) {
    return sendResponse(res, false, err.message, null);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { mobile: req.body.mobile },
    });
    if (!user) {
      return sendResponse(res, false, "User not found", null);
    }
    const token = jwt.sign(
        { id: user.id, mobile: user.mobile },
        process.env.JWT_SECRET,                                   
        { expiresIn: process.env.JWT_TOKEN_EXPIRE }                                      
    );
    let responseData = { 
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: token
    };
    return sendResponse(res, true, "Login successful", responseData);

  } catch (err) {
    console.log('err',err);
    return sendResponse(res, false, err.message, null);
  }
};
