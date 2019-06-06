const UserAuth = require('../../api/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Router = require('restify-router').Router;
const usersRoutes = new  Router();

usersRoutes.post('/register',  (req, res, next) => {
    var data = {  
        firstName: 'tope',
        lastName: 'bamidele',
        email: 'temibami@gmail.com',
        password: '123456789'
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, async(err, hash) => {
            // hash password
            data.password = hash;
            // save user
            try {
                // Users.forge(data).save().then(function(u) {  
                //     console.log('User saved:', u.get('firstName'));
                // });
                const newUser = await Users.forge(data).save();
                console.log(newUser);
                res.send(201);
                next();
            } catch (error) {
                return next( new errors.InternalError(err.message));
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