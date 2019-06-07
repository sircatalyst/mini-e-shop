const bcrypt = require('bcryptjs');
const Users = require('../models/users');

const authenticate = (email, password, req, res) => {
        return new Promise((resolve, reject) => {
            // get user by email
            Users.forge({email: email}).fetch()  
            .then(user => {
                    // match password
                    bcrypt.compare(password, user.get('password'), (err, isMatch) => {
                        if(err) 
                        throw  res.send(401, {
                            status: 'error',
                            message: 'Something is not right',
                            err: err
                        });
                        if(isMatch) {
                            resolve(user);
                        } else {
                            // pass did not match
                            // reject('Oops! Authentication failed')
                            res.send(401, {
                                status: 'error',
                                message: 'Oops! Authentication failed',
                            });
                        }
                    })
            })
            .catch (error => {
                // console.log(error)
                // email not found
                // reject('Authentication failed')
                res.send(401, {
                    status: 'error',
                    message: 'Oops! Something Wrong! Authentication failed!',
                });
            });
        })  
};

module.exports = authenticate;