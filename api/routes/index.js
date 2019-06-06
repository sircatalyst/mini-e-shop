const Router = require('restify-router').Router;
const indexRoutes = new Router();
const UsersController = require('../controllers/users');
// const schemaRegister = require('../validations/users');
// const validateRegister = schemaRegister(false);
// create api routes prefix
const prefix = '/api/v1';

indexRoutes.get(`${prefix}/`, UsersController.index);

indexRoutes.post(`${prefix}/register`, UsersController.register);

indexRoutes.post(`${prefix}/login`, UsersController.login);

indexRoutes.get(`${prefix}/logout`, UsersController.logout);

module.exports = indexRoutes;

