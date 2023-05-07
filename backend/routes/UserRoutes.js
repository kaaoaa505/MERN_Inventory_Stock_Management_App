const express = require('express');

const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const UserRoutes = express.Router();

const base = '/api/users/';

UserRoutes.post(base + 'register', UserController.register);
UserRoutes.post(base + 'login', UserController.login);
UserRoutes.get(base + 'logout', UserController.logout);

UserRoutes.get(base + 'user/profile', AuthMiddleware.protect, UserController.profile);
UserRoutes.put(base + 'user/update', AuthMiddleware.protect, UserController.update);
UserRoutes.patch(base + 'user/password', AuthMiddleware.protect, UserController.password);

UserRoutes.post(base + 'user/forgot', UserController.forgot);
UserRoutes.post(base + 'user/reset/:token', UserController.reset);

UserRoutes.get(base + 'loggedin', UserController.loggedin);

module.exports = UserRoutes;
