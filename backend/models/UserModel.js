
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Invalid Email '
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [6, 'Password must be at least 6 characters long'],
        // maxLength: [23, 'Password must be less than 23 characters'],
    },
    photo: {
        type: String,
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
        maxLength: [250, 'Bio must be less than 250 characters'],
    },
}, {
    timestamps: true
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;