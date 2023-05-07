const globalErrorHandler = require('express-async-handler');
const HttpStatus = require('http-status-codes');
const ProductModel = require('../models/ProductModel');

// const ProductModel = require('../models/ProductModel');

const StatusCodes = HttpStatus.StatusCodes;

const store = globalErrorHandler(async (req, res) => {
    let {
        name, 
        sku,
        category,
        quantity,
        price,
        description,
        image,
    } = req.body;


    if(
        !name || 
        !category ||
        !quantity ||
        !price ||
        !description
    ){
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('name, category, quantity, price, and description required');
    }

    // TODO IMAGE UPLOAD

    const product = await ProductModel.create({
        userId: req.user._id,
        name, 
        sku,
        category,
        quantity,
        price,
        description,
        image,
    });

    return res.status(StatusCodes.OK).json({ product });
});

module.exports = {
    store,
};