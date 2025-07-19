require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsMiddleware = require('./middleware/corsMiddleware');
const customMiddle = require('./middleware/customMiddleware');

// Login Routes
const LoginRoutes = require('./routes/login');

// MiddleWaree
app.use(corsMiddleware);
app.use(customMiddle);

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Restaurant Management System API');
});

app.use('/login', LoginRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
