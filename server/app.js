require('dotenv').config();
const express = require('express');
const winston = require('winston');
const app = express();

const { PORT } = process.env;

// --------------------------------------------------------------------------------------------------------------------
// Middleware
// --------------------------------------------------------------------------------------------------------------------
const corsMiddleware = require('./middleware/corsMiddleware');
const customMiddle = require('./middleware/customMiddleware');

// Apply Middlewares
app.use(corsMiddleware);
app.use(customMiddle);
app.use(express.json());

// --------------------------------------------------------------------------------------------------------------------
// Logger Configuration
// --------------------------------------------------------------------------------------------------------------------
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/server.log' })
    ]
});

logger.log('info', 'Server Initiating...');

// --------------------------------------------------------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------------------------------------------------------
const LoginRoutes = require('./routes/login');

app.get('/', (req, res) => {
    res.send('Restaurant Management System API');
    logger.log('info', 'Root route accessed');
});

app.use('/login', LoginRoutes);

// --------------------------------------------------------------------------------------------------------------------
// Start Server
// --------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    logger.log('info', `Server started on port ${PORT}`);
});
