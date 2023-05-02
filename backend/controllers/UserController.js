const bcrypt = require('bcrypt');
const globalErrorHandler = require('express-async-handler');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');

const StatusCodes = HttpStatus.StatusCodes;

const encryptedPassword = async function (password) {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const register = globalErrorHandler(async (req, res) => {
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

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;

        const token = generateToken(_id);

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 Day
            sameSite: 'none',
            secure: false,
        });
        return res.status(StatusCodes.CREATED).json({ _id, name, email, photo, phone, bio, token });
    }

    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Invalid user data.');
});

const login = globalErrorHandler(async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Name, Email, and Password required');
    }

    const user = await UserModel.findOne({ email });

    if (user) {
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            res.status(StatusCodes.UNAUTHORIZED);
            throw new Error('Invalid Password.');
        }

        const { _id, name, email, photo, phone, bio } = user;

        const token = generateToken(_id);

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 Day
            sameSite: 'none',
            secure: false,
        });

        return res.status(StatusCodes.OK).json({ _id, name, email, photo, phone, bio, token });
    }

    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error('Invalid Email.');
});

const logout = globalErrorHandler(async (_req, res) => {

    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: false,
    });

    const message = 'You have successfully logged out';
    return res.status(StatusCodes.OK).json({ message });
});

const profile = globalErrorHandler(async (req, res) => {
    console.log('----req.session is: ', req.session);
    console.log('----req.cookies is: ', req.cookies);

    const { _id, name, email, photo, phone, bio } = req.user;
    return res.status(StatusCodes.OK).json({ _id, name, email, photo, phone, bio });
});

module.exports = {
    register,
    login,
    logout,
    profile,
};