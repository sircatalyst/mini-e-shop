const Router = require('restify-router').Router;
const orderRoutes = new Router();
const OrderController = require('../controllers/order');

const prefix = '/api/v1/order';

orderRoutes.post(`${prefix}`, OrderController.orderProduct);

orderRoutes.get(`${prefix}`, OrderController.getAllOrders);

orderRoutes.get(`${prefix}/:id`, OrderController.getOneOrder);

orderRoutes.del(`${prefix}/:id`, OrderController.deleteOrder);

module.exports = orderRoutes;