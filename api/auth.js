const bcrypt = require('bcryptjs');
const Users = require('../api/models/users');

const authenticate = (email, password) => {
        return new Promise((resolve, reject) => {
            // get user by email
            Users.forge({email: email}).fetch()  
            .then( user => {
                    // match password
                    bcrypt.compare(password, user.get('password'), (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch) {
                            resolve(user);
                        } else {
                            // pass did not match
                            reject('Authentication failed')
                        }
                    })
            })
            .catch (error => {
                console.log(error)
                // email not found
                reject('Authentication failed')
            });
        })  
};

module.exports = authenticate;