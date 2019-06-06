const Router = require('restify-router').Router;
const usersRoutes = new  Router();
const UsersController = require('../controllers/users');

usersRoutes.post('/register', UsersController.register );

usersRoutes.post('/login', UsersController.login);

module.exports = usersRoutes;