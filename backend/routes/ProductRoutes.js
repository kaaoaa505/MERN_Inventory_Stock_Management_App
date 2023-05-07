const express = require('express');

const ProductController = require('../controllers/ProductController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const ProductRoutes = express.Router();

const base = '/api/products/';

ProductRoutes.post(base + 'store', AuthMiddleware.protect, ProductController.store);

module.exports = ProductRoutes;