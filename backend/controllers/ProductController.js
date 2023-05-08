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

    return res.status(StatusCodes.OK).json(product);
});

const index = globalErrorHandler(async (req, res) => {
    const products = await ProductModel.find({userId: req.user._id}).sort('-createdAt');
    return res.status(StatusCodes.OK).json(products);
});

const show = globalErrorHandler(async (req, res) => {
    const {id} = req.params;
    const product = await ProductModel.findById(id);

    if(!product){
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('Product not found');
    }

    if(product.userId.toString() !== req.user._id.toString()){
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not allowed');
    }

    return res.status(StatusCodes.OK).json(product);
});

const destroy = globalErrorHandler(async (req, res) => {
    const {id} = req.params;
    const product = await ProductModel.findById(id);

    if(!product){
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('Product not found');
    }

    if(product.userId.toString() !== req.user._id.toString()){
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not allowed');
    }

    await product.deleteOne();

    return res.status(StatusCodes.NO_CONTENT).json({});
});


const update = globalErrorHandler(async (req, res) => {
    const {id} = req.params;
    const product = await ProductModel.findById(id);

    if(!product){
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('Product not found');
    }

    if(product.userId.toString() !== req.user._id.toString()){
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not allowed');
    }

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

    await product.updateOne({
        userId: req.user._id,
        name, 
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData || product.image,
    });

    const productUpdated = await ProductModel.findById(id);

    return res.status(StatusCodes.OK).json(productUpdated);
});

module.exports = {
    store,
    index,
    show,
    destroy,
    update,
};