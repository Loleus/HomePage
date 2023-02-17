const express = require('express');
const homeRouter = express.Router();

homeRouter

    .get('/', (req, res) => {
        res.redirect('/login');
        // res.redirect('/public');
    })
    
    .get('/home', (req, res) => {
        res.render('home/main');
    })

module.exports = {
    homeRouter,
};
