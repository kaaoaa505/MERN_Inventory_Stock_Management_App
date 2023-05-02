
const express = require('express');

const UserController = require('../controllers/UserController');

const UserRoutes = express.Router();

UserRoutes.post('/api/users/register', UserController.register);
UserRoutes.post('/api/users/login', UserController.login);
UserRoutes.get('/api/users/logout', UserController.logout);

module.exports = UserRoutes;