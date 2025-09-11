const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendResponse } = require("../utils/response");
const { verifyRequest } = require("../library/utils.library");
const { pagination } = require("../utils/paginationHelper");

exports.signup = async (req, res, next) => {
    try {        

        const valid = verifyRequest(req,['mobile','email','name']);
        if(!valid.resp) {
            return res.json(valid);
        }

        const findUser = await User.findOne({
            where: { email: req.body.email },
        });

        if(findUser) {
            return sendResponse(res,{
                resp: '0',
                msg: 'Email already exists'
            });
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

        return sendResponse(res,{
            resp: '1',
            msg: 'User created successfully',
            data: responseData
        });
    } catch (err) {
        return sendResponse(res,{
            resp: 0,
            msg: err.message
        });
    }
};

exports.getUsers = async (req, res, next) => {
    try {

        const { pageNumber, pageSize, offset, sortBy, order } = pagination(req.query, ["createdAt"]);

        const { count, rows } = await User.findAndCountAll({
            offset,
            limit: pageSize,
            order: [[sortBy, order]],
            attributes: ["id", "name", "email", "createdAt"] 
        });
      
        return sendResponse(res,{
            resp: '1',
            msg: 'User list fetched successfully',
            data:  {
                records: rows,
                pagination: { totalRecords: count, pageNumber, totalPages: Math.ceil(count / pageSize), pageSize, sortBy, order }
            }
        });
    } catch (err) {
        return sendResponse(res,{
            resp: 0,
            msg: err.message
        });
    }
};

exports.login = async (req, res, next) => {
  try {
    const valid = verifyRequest(req,['mobile']);
    if(!valid.resp) {
        return res.json(valid);
    }
    const user = await User.findOne({
        where: { mobile: req.body.mobile },
    });
    if (!user) {
        return sendResponse(res,{
            resp: '0',
            msg: 'User not found'
        });
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

    return sendResponse(res,{
        resp: '1',
        msg: 'Login successful',
        data: responseData
    });
  } catch (err) {
    return sendResponse(res,{
        resp: 0,
        msg: err.message
    });
  }
};
