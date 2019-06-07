const errors = require('restify-errors');
const Cart = require('../models/cart');
const schemaOrder = require('../validations/schemaOrder');
const Joi = require('joi');

const OrderController = {

    order (req, res, next) {
        var data = {  
            name: req.body.name,
            user_id: req.user.id,
            product_id: req.body.product_id,
            description: req.body.description,
            price: req.body.price,
            tag: req.body.tag,
            ordered: "1", //if 1, the product is ordered
        }

        const validData = Joi.validate(data, schemaOrder);

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
            Order.update(req.params.id, validData.value)
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
        }
    },

}

module.exports = OrderController;