const Joi = require('joi');

const schemaCart = Joi.object({
    name: Joi.string().required().trim().error(new Error("name: Product name is required")),
    user_id: Joi.string().required().trim().error(new Error("user_id: Your user id is required")),
    product_id: Joi.string().required().trim().error(new Error("product_id: Product id is required")),
    price: Joi.string().required().trim().error(new Error("price: Product price is required")),
    description: Joi.string().required().trim().error(new Error('description: Product description is required')),
    tag: Joi.string().required().trim().error(new Error('tag: Product tag is required')),
});

module.exports = schemaCart;
