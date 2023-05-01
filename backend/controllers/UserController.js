const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');

const StatusCodes = HttpStatus.StatusCodes;

// Encrypt Password before saving to database
const encryptedPassword = async function (password) {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const registerSync = (req, res) => {
    if (!req.body.email) {
        res.status(StatusCodes.BAD_REQUEST);

        throw new Error('Email is required');
    }

    return res.send({
        success: 'registerSync method in user controller'
    });
};

const register = expressAsyncHandler(async (req, res) => {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Name, Email, and Password required');
    }

    if (password.length < 6) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Password length must be more than 6 characters');
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Email already exist');
    }

    password = await encryptedPassword(password);

    const user = await UserModel.create({ name, email, password });

    const token = generateToken(user._id);

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        return res.status(StatusCodes.CREATED).json({ _id, name, email, photo, phone, bio, token });
    }

    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Invalid user data.');
});

module.exports = { registerSync, register };