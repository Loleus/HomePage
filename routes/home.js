const express = require('express');
const homeRouter = express.Router();

homeRouter

    .get('/', (req, res) => {
        res.redirect('/login');
    })
    
    .get('/home', (req, res) => {
        res.render('home/main');
    })

module.exports = {
    homeRouter,
};
