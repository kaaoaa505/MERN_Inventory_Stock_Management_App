const HttpStatus = require('http-status-codes');
const StatusCodes = HttpStatus.StatusCodes;

const register = (req, res) => {
    if(!req.body.email){
        res.status(StatusCodes.BAD_REQUEST)
        return res.json({
            message: 'Email is required'
        })
    }

    return res.send({
        success: 'register method in user controller'
    });
};

module.exports = { register };