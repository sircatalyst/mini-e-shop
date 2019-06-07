const restify = require('restify');
const rjwt = require('restify-jwt-community');
require('dotenv').config();

// import users routes
const indexRoutes = require('./routes/index')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

indexRoutes.applyRoutes(server);
categoryRoutes.applyRoutes(server);
productRoutes.applyRoutes(server);

// create api routes prefix
const prefix = '/api/v1';

// protect routes
server.use(rjwt({ secret: process.env.JWT_SECRET}).unless({path: [`${prefix}/`, `${prefix}/register`, `${prefix}/login`]}));

const PORT = 1111;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
