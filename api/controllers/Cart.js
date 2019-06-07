const errors = require('restify-errors');
const Cart = require('../models/cart');
const schemaCart = require('../validations/schemaCart');
const Joi = require('joi');

const CartController = {

    addToCart (req, res, next) {
        var data = {  
            name: req.body.name,
            user_id: req.user.id,
            product_id: req.body.product_id,
            description: req.body.description,
            price: req.body.price,
            tag: req.body.tag,
            ordered: "0",
        }

        const validData = Joi.validate(data, schemaCart);

        if(validData.error != null){
            const err = validData.error.toString().replace(/Error:/, '');
            res.send(422, {
                status: 'error',
                message: 'Invalid request data',
                error: err,
            });
            next();
        }
        else {
            Cart.create(validData.value)
            .then((cart) => {  
                res.send(201, {
                    status: 'success',
                    data: cart
                });
                next();
            })
            .catch(error => {
                res.send(500, {
                    status: 'error',
                    message: 'Server error',
                    error: error
                });
            })
        }
    },

    editCart (req, res, next) {
        var data = {  
            name: req.body.name,
            user_id: req.user.id,
            product_id: req.body.product_id,
            description: req.body.description,
            price: req.body.price,
            tag: req.body.tag,
            ordered: "0",
        }

        const validData = Joi.validate(data, schemaCart);

        if(validData.error != null){
            const err = validData.error.toString().replace(/Error:/, '');
            res.send(422, {
                status: 'error',
                message: 'Invalid request data',
                error: err,
            });
            next();
        }
        else {
            Categories.update(req.params.id, validData.value)
            .then((cart) => {  
                res.send(201, {
                    status: 'success',
                    data: cart
                });
                next();
            })
            .catch(error => {
                res.send(500, {
                    status: 'error',
                    message: 'Server error',
                    error: error
                });
            })
        }
    },

    getAllCarts (req, res, next) {
        Cart.findAll()
        .then((cart) => {  
            if(cart){
                res.send(200, {
                    status: 'success',
                    message: cart
                });
            }
            else{
                res.send(200, {
                    status: 'success',
                    message: 'Your cart is empty'
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
    },

    getOneCart (req, res, next) {
        Cart.findOne(req.params.id)
        .then((cart) => {  
            if(!cart){
                res.send(401, {
                    status: 'error',
                    message: 'No such product in your cart',
                });
            }
            else{
                Cart.findOne(req.params.id)
                .then((cart) => {  
                    if(cart){
                        res.send(200, {
                            status: 'success',
                            message: cart
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
            }
        })
        .catch(error => {
            res.send(500, {
                status: 'error',
                message: 'Server error',
                error: error
            });
        });
    },

    deleteCart (req, res, next) {
        Cart.findOne(req.params.id)
        .then((cart) => {  
            if(!cart){
                res.send(401, {
                    status: 'error',
                    message: 'No such product in your cart',
                });
            }
            else {
                Cart.delete({id: req.params.id})
                .then((delCart) => {  
                    if(delCart){
                        res.send(200, {
                            status: 'success',
                            message: 'Product has been successfully deleted from Cart',
                            data: cart,
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
            }  
            next();
        })
        .catch(error => {
            console.log(error)
            res.send(500, {
                status: 'error',
                message: 'Server error',
                error: error
            });
        });
    },
}

module.exports = CartController;