const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization'],
};

const corsMiddleware = cors(
    corsOptions,
    console.log('first')
);

module.exports = corsMiddleware;
