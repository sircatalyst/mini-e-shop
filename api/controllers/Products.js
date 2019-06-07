const errors = require('restify-errors');
const Products = require('../models/products');
const Categories = require('../models/categories');
const schemaProducts = require('../validations/schemaProducts');
const Joi = require('joi');

const ProductController = {

    addProduct (req, res, next) {
        var data = {  
            categories_id: req.body.categories_id,
            name: req.body.name,
            description: req.body.description,
            tag: req.body.tag,
        }

        const validData = Joi.validate(data, schemaProducts);

        if(validData.error != null){
            const err = validData.error.toString().replace(/Error: /, '');
            res.send(422, {
                status: 'error',
                message: 'Invalid request data',
                error: err,
            });
            next();
        }
        else {
            Categories.findOne(validData.value.categories_id)
            .then(category => {
                if(!category) {
                    res.send(422, {
                        status: 'error',
                        message: 'Invalid category',
                        error: err,
                    });
                    next();
                }
                else{
                    // console.log(validData.value.name)
                    Products.findByName(validData.value.name)
                    .then((product) => {  
                        if(product){
                            Categories.findByName(product.get('name'))
                            .then((same) => { 
                                console.log('hi')
                                if(same == product.name){
                                    res.send(401, {
                                        status: 'error',
                                        message: 'Product name already exist',
                                    });
                                    next();
                                }
                                else {
                                    Products.create(validData.value)
                                    .then((product) => {  
                                            res.send(201, {
                                                status: 'success',
                                                data: product
                                            }
                                        );
                                        next();
                                    })
                                    .catch(error => {
                                        res.send(500, {
                                            status: 'error',
                                            message: 'Server error3',
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
                        }
                        else {
                            Products.create(validData.value)
                            .then((product) => {  
                                    res.send(201, {
                                        status: 'success',
                                        data: product
                                    }
                                );
                                next();
                            })
                            .catch(error => {
                                res.send(500, {
                                    status: 'error',
                                    message: 'Server error3',
                                    error: error
                                });
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        res.send(500, {
                            status: 'error',
                            message: 'Server error2',
                            error: error
                        });
                    })
                }
            })
            .catch(error => {
                res.send(500, {
                    status: 'error',
                    message: 'Server error1',
                    error: error
                });
            })
        }
    },

    editProduct (req, res, next) {
        var data = {  
            categories_id: req.body.categories_id,
            name: req.body.name,
            description: req.body.description,
            tag: req.body.tag,
        }

        const validData = Joi.validate(data, schemaProducts);

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
            Categories.findOne(validData.value.categories_id)
            .then(category => {
                if(!category) {
                    res.send(422, {
                        status: 'error',
                        message: 'Invalid category',
                        error: err,
                    });
                    next();
                }
                else {
                    Products.findByName(validData.value.name)
                    .then((product) => {  
                        if(product){
                            res.send(401, {
                                status: 'error',
                                message: 'Product already exist',
                            });
                            next();
                        }
                        else {
                            Products.update(req.params.id, validData.value)
                            .then((product) => {  
                                    res.send(201, {
                                        status: 'success',
                                        data: product
                                    }
                                );
                                next();
                            })
                            .catch(error => {
                                console.log(error)
                                res.send(500, {
                                    status: 'error',
                                    message: 'Server error1',
                                    error: error
                                });
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        res.send(500, {
                            status: 'error',
                            message: 'Server error2',
                            error: error
                        });
                    })
                }
            })
            .catch(error => {
                console.log(error)
                res.send(500, {
                    status: 'error',
                    message: 'Server error2',
                    error: error
                });
            })
        }
    },

    getAllProducts (req, res, next) {
        Products.findAll()
        .then((product) => {  
            if(product){
                res.send(200, {
                    status: 'success',
                    message: product
                });
            }
            else{
                res.send(200, {
                    status: 'success',
                    message: 'product is empty'
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

    getOneProduct (req, res, next) {
        Products.findOne(req.params.id)
        .then((product) => {  
            if(!product){
                res.send(401, {
                    status: 'error',
                    message: 'No such product',
                });
            }
            else{
                Products.findOne(req.params.id)
                .then((product) => {  
                    if(product){
                        res.send(200, {
                            status: 'success',
                            message: product
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

    deleteProduct (req, res, next) {
        Products.findOne(req.params.id)
        .then((product) => {  
            if(!product){
                res.send(401, {
                    status: 'error',
                    message: 'No such product',
                });
            }
            else {
                Products.delete({id: req.params.id})
                .then((deleteProduct) => {  
                    if(deleteProduct){
                        res.send(200, {
                            status: 'success',
                            message: 'product successfully deleted',
                            data: product,
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

module.exports = ProductController;