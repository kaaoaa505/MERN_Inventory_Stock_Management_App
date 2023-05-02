const express = require('express');

const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const UserRoutes = express.Router();

UserRoutes.post('/api/users/register', UserController.register);
UserRoutes.post('/api/users/login', UserController.login);
UserRoutes.get('/api/users/logout', UserController.logout);

UserRoutes.get('/api/users/user/profile', AuthMiddleware.protect, UserController.profile);
UserRoutes.put('/api/users/user/update', AuthMiddleware.protect, UserController.update);

UserRoutes.get('/api/users/loggedin', UserController.loggedin);

module.exports = UserRoutes;
