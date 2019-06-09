const Router = require('restify-router').Router;
const orderRoutes = new Router();
const OrderController = require('../controllers/order');

const prefix = '/api/v1/orders';
const prefixProducts = '/api/v1/orderProducts';

orderRoutes.get(`${prefixProducts}/:id`, OrderController.orderProduct);

orderRoutes.get(`${prefix}`, OrderController.getAllOrders);

orderRoutes.get(`${prefix}/adminOrders`, OrderController.getAllAdminOrders);

orderRoutes.get(`${prefix}/:id`, OrderController.getOneOrder);

orderRoutes.del(`${prefix}/:id`, OrderController.deleteOrder);

module.exports = orderRoutes;