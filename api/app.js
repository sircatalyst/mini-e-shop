const restify = require('restify');
const rjwt = require('restify-jwt-community');

// import users routes
const usersRoutes = require('./routes/users')

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

usersRoutes.applyRoutes(server);

// protect routes
server.use(rjwt({ secret: 'config.JWT_SECRET'}).unless({path: ['/', '/register']}));

const PORT = 1111;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

