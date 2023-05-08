const express = require('express');

const ContactController = require('../controllers/ContactController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const ContactRoutes = express.Router();

const base = '/api/contacts/';

ContactRoutes.post(base + 'store', AuthMiddleware.protect, ContactController.store);

module.exports = ContactRoutes;
