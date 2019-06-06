const restify = require('restify');
const Users = require('../api/models/users');
const UserAuth = require('../api/auth');
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

const PORT = 1111;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

server.get('/', rjwt({ secret: 1234 }), (req, res) => {
    Users.byEmail('temibami@gmail.com').then(function(u) {  
        console.log('Got user:', u.get('firstName'));
    });
    res.send('it is working fine!');
});

server.post('/register',  (req, res, next) => {
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


server.post('/auth', (req, res, next) => {
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


server.post('/', (req, res) => {
    var data = {  
        firstName: 'Johnson',
        lastName: 'Doe',
        email: 'joe@example.com',
        password: 28
    }
    
    Users.forge(data).save().then(function(u) {  
        console.log('User saved:', u.get('firstName'));
    });
})