const cors = require('cors');

const { clientOriginURL} = process.env;

const corsOptions = {
    origin: clientOriginURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization'],
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
