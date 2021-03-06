const errors = require('restify-errors');
const Cart = require('../models/cart');
const Products = require('../models/products');
const schemaCart = require('../validations/schemaCart');
const Joi = require('joi');

const CartController = {

    addToCart (req, res, next) {
        const user = req.user.id;
        const user_id = user.toString();

        var data = {  
            product_name: req.body.product_name,
            user_id: user_id,
            product_id: req.body.product_id,
            description: req.body.description,
            price: req.body.price,
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
            Products.findOne(validData.value.product_id)
            .then(product => {
                if(!product) {
                    res.send(400, {
                        status: 'error',
                        message: 'Invalid product id.',
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
                            message: 'Server error1',
                            error: error
                        });
                    })
                }
            })
            .catch(error => {
                res.send(500, {
                    status: 'error',
                    message: 'Server error2',
                    error: error
                });
            })
        }
    },

    editCart (req, res, next) {
        if (req.user.role !== "user") {
            res.send(401, {
                status: 'error',
                message: 'Unauthorized request',
            });
        }
        else{
            const user = req.user.id;
            const user_id = user.toString();
            
            var data = {  
                product_name: req.body.product_name,
                user_id: user_id,
                product_id: req.body.product_id,
                description: req.body.description,
                price: req.body.price,
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
                Products.findOne(validData.value.product_id)
                .then(product => {
                    if(!product) {
                        res.send(422, {
                            status: 'error',
                            message: 'Invalid product id.',
                        });
                        next();
                    }
                    else {
                        Cart.update(req.params.id, req.user.id, validData.value)
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
                                message: 'Server error1',
                                error: error
                            });
                        })
                    }
                })
                .catch(error => {
                    res.send(500, {
                        status: 'error',
                        message: 'Server error2',
                        error: error
                    });
                })
            }
        }
    },

    getAllCarts (req, res, next) {
        Cart.findAll(req.user.id)
        .then((cart) => {  
            if(cart.length == 0){
                res.send(200, {
                    status: 'success',
                    message: 'Your cart is empty'
                });
            }
            else{
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
    },

    getOneCart (req, res, next) {
        Cart.findOne(req.params.id, req.user.id)
        .then((cart) => {  
            if(!cart){
                res.send(400, {
                    status: 'error',
                    message: 'No such product in your cart',
                });
            }
            else{
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
    },

    deleteCart (req, res, next) {
        if (req.user.role !== "user") {
            res.send(401, {
                status: 'error',
                message: 'Unauthorized request',
            });
        }
        else{
            Cart.findOne(req.params.id, req.user.id)
            .then((cart) => {  
                if(!cart){
                    res.send(400, {
                        status: 'error',
                        message: 'No such product in your cart',
                    });
                }
                else {
                    Cart.delete(req.params.id, req.user.id)
                    .then((delCart) => {  
                        if(delCart){
                            res.send(200, {
                                status: 'success',
                                message: 'Product has been successfully deleted from your Cart',
                                data: cart,
                            });
                        }
                    })
                    .catch(error => {
                        res.send(500, {
                            status: 'error',
                            message: 'Server error1',
                            error: error
                        });
                    });
                }  
                next();
            })
            .catch(error => {
                res.send(500, {
                    status: 'error',
                    message: 'Server error2',
                    error: error
                });
            });
        }
    },
}

module.exports = CartController;