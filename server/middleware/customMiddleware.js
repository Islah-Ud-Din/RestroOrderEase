// middleware/customMiddle.js
const fs = require('fs');

const customMiddle = (req, res, next) => {
    const now = new Date();
    const timestamp = now.toLocaleString();

    const log = `${timestamp}: ${req.method} : ${req.url}\n`;

    fs.appendFile('log.txt', log, (err) => {
        if (err) console.error('Failed to write log:', err);
    });

    console.log(`${req.method} ${req.url}`);
    console.log('second');
    next();
};

module.exports = customMiddle;
