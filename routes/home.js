const express = require('express');
const homeRouter = express.Router();

homeRouter

    .get('/', (req, res) => {
        res.redirect('/login');
        // res.redirect('/public');
        // res.sendFile('index.html', {
        //     root: '/public'
        //   });
    })
    
    .get('/main', (req, res) => {
        res.render('home/main');
    })

module.exports = {
    homeRouter,
};
