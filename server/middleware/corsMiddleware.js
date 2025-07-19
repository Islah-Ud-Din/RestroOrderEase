const cors = require('cors');

const { originURL} = process.env;

const corsOptions = {
    origin: originURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization'],
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
