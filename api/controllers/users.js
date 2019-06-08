const UserAuth = require('../config/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const Users = require('../models/users');
const schemaRegister = require('../validations/schemaRegister');
const schemaLogin = require('../validations/schemaLogin');
const Joi = require('joi');

const UsersController = {

    index (req, res, next) {
        res.send('Hi there, welcome to mini-e-shop built with Restify, Knex, Bookshelf and Joi');
    },

    register (req, res, next) {
        var data = {  
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword, 
        }

        const validData = Joi.validate(data, schemaRegister);

        if(validData.error != null){
            const err = validData.error.toString().replace(/Error:/, '');
            res.send(422, {
                status: 'error',
                message: 'Invalid request data',
                error: err,
            });
        }
        else {

            Users.forge({email: validData.value.email}).fetch()
            .then((user) => {  
                if(user){
                    res.send(400, {
                        status: 'error',
                        message: 'Email already exist',
                    });
                }
            })
            .catch(error => {
                res.send(500, {
                    status: 'error',
                    message: 'Server error',
                    error: error
                });
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(validData.value.password, salt, async(err, hash) => {
                    // hash password
                    validData.value.password = hash;
                    try {
                        // save user
                        const newUser = await Users.forge(validData.value).save();
                        res.send(201, {
                                status: 'success',
                                data: newUser
                            }
                        );
                        next();
                    } catch (error) {
                        return next( new errors.InternalError(error.message));
                    }
                });
            });
            next
        }

    },
    
    login (req, res, next) {
        var data = {  
            email: req.body.email,
            password: req.body.password
        }
        const validData = Joi.validate(data, schemaLogin);

        if(validData.error !== null){
            const err = validData.error.toString().replace(/Error:/, '');
            res.send(422, {
                status: 'error',
                message: 'Invalid request data',
                error: err,
            });
        }
        else {
            UserAuth(validData.value.email, validData.value.password, req, res)
            .then(user => {  
                // create jwt
                const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '60m'});
                const {iat, exp} = jwt.decode(token);
                // respond with token
                res.send(200, {
                    status: 'success',
                    data: {iat, exp, token}
                });
                next();
            })
            .catch(err => {
                console.log(err)
            }); 
        }
    },

    logout (req, res, next) {
        delete req.headers.authorization;
        req.rawHeaders.splice(5, 1)
        delete req.user;
        res.send(200, {
                status: 'success',
                message: 'You are successfully logged out'
            }
        );
        // res.redirect(301,`${prefix}/`, next);
        next();
    },
};

module.exports = UsersController;
