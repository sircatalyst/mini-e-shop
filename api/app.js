const restify = require('restify');
const Users = require('../api/models/users');

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

const PORT = 1111;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

server.get('/', (req, res) => {
    Users.byEmail('temibami@gmail.com').then(function(u) {  
        console.log('Got user:', u.get('firstName'));
    });
    res.send('it is working fine!');
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