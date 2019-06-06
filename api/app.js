const restify = require('restify');
const rjwt = require('restify-jwt-community');
require('dotenv').config();

// import users routes
const usersRoutes = require('./routes/users')

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

usersRoutes.applyRoutes(server);

// protect routes
server.use(rjwt({ secret: process.env.JWT_SECRET}).unless({path: ['/', '/register', '/auth']}));

const PORT = 1111;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

