const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
});

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = ContactModel;