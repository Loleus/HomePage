const express = require('express');
const homeRouter = express.Router();

homeRouter

    .get('/', (req, res) => {
        res.render('home/start');
    })
    
    .get('/home', (req, res) => {
        res.redirect('/login');
    })
    
    .get('/main', (req, res) => {
        res.render('home/main');
    })
    .get('/info', (req, res) => {
        res.render('home/info');
    })
    .get('/blog', (req, res) => {
        res.render('home/blog');
    })

module.exports = {
    homeRouter,
};
