const globalErrorHandler = require('express-async-handler');
const HttpStatus = require('http-status-codes');

const UploadHelper = require('../helpers/UploadHelper');
const ProductModel = require('../models/ProductModel');

const StatusCodes = HttpStatus.StatusCodes;

const store = globalErrorHandler(async (req, res) => {
    let {
        name, 
        sku,
        category,
        quantity,
        price,
        description,
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

    let fileData = {};
    
    if(req.file){
        fileData = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: UploadHelper.fileSizeFormatter(req.file.size, 2),
        };
    }

    const product = await ProductModel.create({
        userId: req.user._id,
        name, 
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });

    return res.status(StatusCodes.OK).json({ product });
});

module.exports = {
    store,
};