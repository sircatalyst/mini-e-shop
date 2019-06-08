const Joi = require('joi');

const schemaProducts = Joi.object({
    categories_id: Joi.string().required().trim().error(new Error("categories_id: Category name is required")),
    product_name: Joi.string().required().trim().error(new Error("product_name: Product name is required")),
    description: Joi.string().required().trim().error(new Error('description: Product description is required')),
    price: Joi.string().required().trim().error(new Error('tag: Product price is required')),
});

module.exports = schemaProducts;