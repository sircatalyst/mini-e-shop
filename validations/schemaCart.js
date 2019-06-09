const Joi = require('joi');

const schemaCart = Joi.object({
    product_name: Joi.string().required().trim().error(new Error("product_name: Product name is required")),
    user_id: Joi.string().required().trim().error(new Error("user_id: Your user id is required")),
    product_id: Joi.string().required().trim().error(new Error("product_id: Product id is required")),
    price: Joi.string().required().trim().error(new Error("price: Product price is required")),
    description: Joi.string().required().trim().error(new Error('description: Product description is required')),
    ordered: Joi.string().required().trim().error(new Error('ordered: Order status is required')),
});

module.exports = schemaCart;
