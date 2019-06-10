const Router = require('restify-router').Router;
const categoryRoutes = new Router();
const CategoriesController = require('../controllers/Categories');

const prefix = '/api/v1/categories';

categoryRoutes.post(`${prefix}`, CategoriesController.addCategory);

categoryRoutes.put(`${prefix}/:id`, CategoriesController.editCategory);

categoryRoutes.get(`${prefix}`, CategoriesController.getAllCategories);

categoryRoutes.get(`${prefix}/:id`, CategoriesController.getOneCategory);

categoryRoutes.del(`${prefix}/:id`, CategoriesController.deleteCategory);

module.exports = categoryRoutes;
