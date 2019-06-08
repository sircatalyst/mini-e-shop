
const Router = require('restify-router').Router;
const productRoutes = new Router();
const ProductsController = require('../controllers/Products');

const prefix = '/api/v1/products';

productRoutes.post(`${prefix}`, ProductsController.addProduct);

productRoutes.put(`${prefix}/:id`, ProductsController.editProduct);

productRoutes.get(`${prefix}`, ProductsController.getAllProducts);

productRoutes.get(`${prefix}/:id`, ProductsController.getOneProduct);

productRoutes.del(`${prefix}/:id`, ProductsController.deleteProduct);

module.exports = productRoutes;

;
