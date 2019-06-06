const UserAuth = require('../../api/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const Router = require('restify-router').Router;
const usersRoutes = new  Router();

const Users = require('../models/users');

usersRoutes.post('/register',  (req, res, next) => {
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
                console.log(newUser);
                // res.json(201);
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
});

usersRoutes.post('/auth', (req, res, next) => {
    var data = {  
        firstName: 'tope',
        lastName: 'bamidele',
        email: 'temibami@gmail.com',
        password: '123456789'
    }
    
    UserAuth(data.email, data.password).then(user => {  
        // create jwt
        const token = jwt.sign(user.toJSON(), '12345', { expiresIn: '15m'});
        const {iat, exp} = jwt.decode(token);
        // respond with token
        res.send({iat, exp, token});
        next();
    })
    .catch(err => {
        console.log(err)
    }); 

})

usersRoutes.post('/', (req, res) => {
    var data = {  
        firstName: 'Johnson',
        lastName: 'Doe',
        email: 'joe@example.com',
        password: 28
    }
    
    Users.forge(data).save().then(function(u) {  
        console.log('User saved:', u.get('firstName'));
    });
});

module.exports = usersRoutes;