const Joi = require('joi');

const schemaLogin = Joi.object({
    email: Joi.string().email().required().error(new Error('email field is required with a valid email')),
    // accepts alphanumeric strings at least 9 characters long
    password: Joi.string().min(9).alphanum().required().error(new Error('password is required. Must be alphanumeric and minimum of 9 characters')),
});

module.exports = schemaLogin;