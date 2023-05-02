const globalErrorHandler = require('express-async-handler');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');

const StatusCodes = HttpStatus.StatusCodes;

const protect = globalErrorHandler(async (req, res, next) => {
    try {
        if (req.cookies) {
            const token = req.cookies.token;

            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED);
                throw new Error('Invalid Token.');
            }

            // TODO VERIFY TOKEN
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            
            const user = await UserModel.findById(verified.id).select('-password');

            if(!user){
                res.status(StatusCodes.UNAUTHORIZED);
                throw new Error('Invalid token user data.');
            }

            req.user = user;

            next();
        }

        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Cookies is disabled.');

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid Token.');
    }
});

module.exports = {
    protect,
}; 