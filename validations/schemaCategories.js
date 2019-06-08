const Joi = require('joi');

const schemaCategories = Joi.object({
    name: Joi.string().required().trim().error(new Error("name: Category name is required")),
    description: Joi.string().required().trim().error(new Error('description: Category description is required')),
    tag: Joi.string().required().trim().error(new Error('tag: Category tag is required')),
});

module.exports = schemaCategories;
