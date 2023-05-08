const globalErrorHandler = require('express-async-handler');
const HttpStatus = require('http-status-codes');

const EmailHelper = require('../helpers/EmailHelper');
const ContactModel = require('../models/ContactModel');

const StatusCodes = HttpStatus.StatusCodes;

const store = globalErrorHandler(async (req, res) => {
    let {
        subject, 
        message,
    } = req.body;


    if(
        !subject || 
        !message
    ){
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('subject and message required');
    }

    const contact = await ContactModel.create({
        userId: req.user._id,
        subject, 
        message,
    });

    const to = req.user.email;
    const from = process.env.EMAIL_SENDER;
    const replyTo = process.env.EMAIL_NOREPLY;

    try {
        await EmailHelper.send(subject, message, to, from, replyTo);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Reset email sent successfully.',
            result
        });
    } catch (error) {
        console.log(error);
    }

    return res.status(StatusCodes.OK).json(contact);
});

module.exports = {
    store,
};