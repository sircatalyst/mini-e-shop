const errors = require('restify-errors');
const Order = require('../models/order');
const Joi = require('joi');

const OrderController = {

    orderProduct (req, res, next) {

        var data = { ordered: "1" } //if 1, the product is ordered. "0" MEANS it is not ordered

            Order.update(req.params.id, req.user.id, data)
            .then((order) => {  
                res.send(201, {
                    status: 'success',
                    data: order
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
    },

    getAllOrders (req, res, next) {

        Order.findAll(req.user.id)
        .then((order) => {  
            if(order){
                res.send(200, {
                    status: 'success',
                    message: order
                });
            }
            else{
                res.send(200, {
                    status: 'success',
                    message: 'Your order is empty'
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

    getOneOrder (req, res, next) {
        Order.findOne(req.params.id, req.user.id)
        .then((order) => {  
            if(!order){
                res.send(401, {
                    status: 'error',
                    message: 'You do not order such product',
                });
            }
            else{
                res.send(200, {
                    status: 'success',
                    message: order
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

    deleteOrder (req, res, next) {
        Order.findOne(req.params.id, req.user.id)
        .then((order) => {  
            if(!order){
                res.send(401, {
                    status: 'error',
                    message: 'You do not order such product',
                });
            }
            else {
                data = {
                    ordered: 0
                }
                Order.update(req.params.id, req.user.id, data)
                .then((delOrder) => {  
                    if(delOrder){
                        res.send(200, {
                            status: 'success',
                            message: 'Ordered Product has been successfully deleted but remains in your Cart',
                            data: order,
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                    res.send(500, {
                        status: 'error2',
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

module.exports = OrderController;