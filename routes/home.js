const express = require('express');
const homeRouter = express.Router();
const path = require('path');
homeRouter
    .get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
    })
    .get('/info', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/info.html'));
    })
module.exports = {
    homeRouter,
};
