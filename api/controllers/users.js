const UserAuth = require('../config/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const Users = require('../models/users');

const UsersController = {

    index (req, res, next) {
        res.send('Hi there, welcome to mini-e-shop');
    },

    register (req, res, next) {
        var data = {  
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, async(err, hash) => {
                // hash password
                data.password = hash;
                try {
                    // save user
                    const newUser = await Users.forge(data).save();
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
    },
    
    login (req, res, next) {
        var data = {  
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        
        UserAuth(data.email, data.password).then(user => {  
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
