const Router = require('restify-router').Router;
const cartRoutes = new Router();
const CartController = require('../controllers/Cart');

const prefix = '/api/v1/carts';

cartRoutes.post(`${prefix}`, CartController.addToCart);

cartRoutes.put(`${prefix}/:id`, CartController.editCart);

cartRoutes.get(`${prefix}`, CartController.getAllCarts);

cartRoutes.get(`${prefix}/:id`, CartController.getOneCart);

cartRoutes.del(`${prefix}/:id`, CartController.deleteCart);

module.exports = cartRoutes;
