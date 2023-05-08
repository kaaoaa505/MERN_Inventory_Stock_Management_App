const express = require('express');

const ProductController = require('../controllers/ProductController');
const UploadHelper = require('../helpers/UploadHelper');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const ProductRoutes = express.Router();

const base = '/api/products/';

ProductRoutes.post(
    base + 'store',
    AuthMiddleware.protect,
    UploadHelper.storageUpload.single('imageFile'),
    ProductController.store
);

ProductRoutes.get(
    base + 'index',
    AuthMiddleware.protect,
    ProductController.index,
);

module.exports = ProductRoutes;