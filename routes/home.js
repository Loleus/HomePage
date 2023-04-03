const express = require('express');
const homeRouter = express.Router();
const path = require('path');
const auth = require('../utils/auth')

const index = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../pages/index.html'));
}

homeRouter
    .get('/', index)
    .get('/about', index)
    .get('/contact', index)
    .get('/music', index)
    .get('/video', index)
    .get('*',auth)
    
module.exports = {
    homeRouter,
};
