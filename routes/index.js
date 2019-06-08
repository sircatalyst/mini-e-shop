const Router = require('restify-router').Router;
const indexRoutes = new Router();
const UsersController = require('../controllers/Users');

// create api routes prefix
const prefix = '/api/v1';

indexRoutes.get(`${prefix}/`, UsersController.index);

indexRoutes.post(`${prefix}/adminRegister`, UsersController.adminRegister);

indexRoutes.post(`${prefix}/register`, UsersController.register);

indexRoutes.post(`${prefix}/login`, UsersController.login);

indexRoutes.get(`${prefix}/logout`, UsersController.logout);

module.exports = indexRoutes;

