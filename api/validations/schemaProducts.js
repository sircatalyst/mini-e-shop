const Joi = require('joi');

const schemaProducts = Joi.object({
    categories_id: Joi.string().required().trim().error(new Error("name: Product name is required")),
    name: Joi.string().required().trim().error(new Error("name: Product name is required")),
    description: Joi.string().required().trim().error(new Error('description: Product description is required')),
    tag: Joi.string().required().trim().error(new Error('tag: Product tag is required')),
});

module.exports = schemaProducts;