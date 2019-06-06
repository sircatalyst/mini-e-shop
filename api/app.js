const restify = require('restify');

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

const PORT = 1111;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

server.get('/', (req, res) => {
    res.send('it is working fine!');
})