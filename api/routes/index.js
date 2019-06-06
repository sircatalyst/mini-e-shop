const Router = require('restify-router').Router;
const indexRoutes = new Router();
const UsersController = require('../controllers/users');

// create api routes prefix
const prefix = '/api/v1';

indexRoutes.post(`${prefix}/register`, UsersController.register);

indexRoutes.post(`${prefix}/login`, UsersController.login);

module.exports = indexRoutes;

