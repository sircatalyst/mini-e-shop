const Categories = require('../models/categories');
const schemaCategories = require('../validations/schemaCategories');
const Joi = require('joi');

const CategoriesController = {

    addCategory (req, res, next) {
        if (req.user.role !== "admin") {
            res.send(401, {
                status: 'error',
                message: 'Unauthorized request',
            });
        }
        else {
            var data = {  
                name: req.body.name,
                description: req.body.description,
                tag: req.body.tag,
            }

            const validData = Joi.validate(data, schemaCategories);

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
                Categories.findByName(validData.value.name)
                .then((category) => {  
                    if(category != null){
                        res.send(400, {
                            status: 'error',
                            message: 'Category already exist',
                        });
                        next();
                    }
                    else {
                        Categories.create(validData.value)
                        .then((category) => {  
                                res.send(201, {
                                    status: 'success',
                                    data: category
                                }
                            );
                            next();
                        })
                        .catch(error => {
                            res.send(500, {
                                status: 'error',
                                message: 'Server error1',
                                error: error
                            });
                        });
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

    editCategory (req, res, next) {
        if (req.user.role !== "admin") {
            res.send(401, {
                status: 'error',
                message: 'Unauthorized request',
            });
        }
        else {
            var data = {  
                name: req.body.name,
                description: req.body.description,
                tag: req.body.tag,
            }

            const validData = Joi.validate(data, schemaCategories);

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
                Categories.findByName(validData.value.name)
                .then((category) => {  
                    if(category){
                        res.send(400, {
                            status: 'error',
                            message: 'Category already exist',
                        });
                        next();
                    }
                    else {
                        Categories.update(req.params.id, validData.value)
                        .then((category) => {  
                                res.send(201, {
                                    status: 'success',
                                    data: category
                                }
                            );
                            next();
                        })
                        .catch(error => {
                            res.send(500, {
                                status: 'error',
                                message: 'Server error1',
                                error: error
                            });
                        });
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

    getAllCategories (req, res, next) {
        if (req.user.role !== "admin") {
            res.send(401, {
                status: 'error',
                message: 'Unauthorized request',
            });
        }
        else{
            Categories.findAll()
            .then((category) => {  
                if(category){
                    res.send(200, {
                        status: 'success',
                        message: category
                    });
                }
                else{
                    res.send(200, {
                        status: 'success',
                        message: 'category is empty'
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
    },

    getOneCategory (req, res, next) {
        if (req.user.role !== "admin") {
            res.send(401, {
                status: 'error',
                message: 'Unauthorized request',
            });
        }
        else {
            Categories.findOne(req.params.id)
            .then((category) => {  
                if(!category){
                    res.send(401, {
                        status: 'error',
                        message: 'No such category',
                    });
                }
                else{
                    Categories.findOne(req.params.id)
                    .then((category) => {  
                        if(category){
                            res.send(200, {
                                status: 'success',
                                message: category
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

    deleteCategory (req, res, next) {
        if (req.user.role !== "admin") {
            res.send(401, {
                status: 'error',
                message: 'Unauthorized request',
            });
        }
        else {
            Categories.findOne(req.params.id)
            .then((category) => {  
                if(!category){
                    res.send(400, {
                        status: 'error',
                        message: 'No such category',
                    });
                }
                else {
                    Categories.delete({id: req.params.id})
                    .then((delCategory) => {  
                        if(delCategory){
                            res.send(200, {
                                status: 'success',
                                message: 'category successfully deleted',
                                data: category,
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

module.exports = CategoriesController;