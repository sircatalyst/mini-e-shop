const Joi = require('joi');

const schemaRegister = Joi.object({
    firstName: Joi.string().required().trim().error(new Error('first name field is required')),
    lastName: Joi.string().required().trim().error(new Error('last name field is required')),
    // accepts only valid lowercase email addresses
    email: Joi.string().email().required().error(new Error('email field is required with a valid email')),
    // accepts alphanumeric strings at least 9 characters long
    password: Joi.string().min(9).alphanum().required().error(new Error('password is required. Must be alphanumeric and minimum of 9 characters')),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().error(new Error('confirm password is required. Must be the same with password')),
});

module.exports = schemaRegister;