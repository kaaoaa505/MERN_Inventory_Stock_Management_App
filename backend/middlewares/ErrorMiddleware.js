const HttpStatus = require('http-status-codes');
const StatusCodes = HttpStatus.StatusCodes;

const ErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    const statusCode = res.statusCode > 0 ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(statusCode);

    const stack = process.env.NODE_ENV === 'development' ? err.stack : null;
    const message = err.message

    res.json({ message, stack });
};

module.exports = ErrorHandler; 