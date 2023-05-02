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

const verifyPassword = async function (password, storedHash) {
    return bcrypt.compare(password, storedHash);
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
            secure: true,
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
        const passwordValid = await verifyPassword(password, user.password);

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
            secure: true,
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
        secure: true,
    });

    const message = 'You have successfully logged out';
    return res.status(StatusCodes.OK).json({ message });
});

module.exports = {
    register,
    login,
    logout,
};