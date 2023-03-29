
const express = require('express');

const UserController = require('../controllers/UserController');

const UserRoutes = express.Router();

UserRoutes.post('/api/users/register', UserController.register);

module.exports = UserRoutes;