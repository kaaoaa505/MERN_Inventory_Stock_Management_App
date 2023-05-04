const express = require('express');

const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const UserRoutes = express.Router();

UserRoutes.post('/api/users/register', UserController.register);
UserRoutes.post('/api/users/login', UserController.login);
UserRoutes.get('/api/users/logout', UserController.logout);

UserRoutes.get('/api/users/user/profile', AuthMiddleware.protect, UserController.profile);
UserRoutes.put('/api/users/user/update', AuthMiddleware.protect, UserController.update);
UserRoutes.patch('/api/users/user/password', AuthMiddleware.protect, UserController.password);

UserRoutes.post('/api/users/user/forgot', UserController.forgot);
UserRoutes.post('/api/users/user/reset/:token', UserController.reset);

UserRoutes.get('/api/users/loggedin', UserController.loggedin);

module.exports = UserRoutes;
