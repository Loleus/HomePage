const express = require('express');
const homeRouter = express.Router();
const path = require('path');
homeRouter
    .get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
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
    .get('/video', (req, res) => {
        res.render('home/video');
    })
    .get('/music', (req, res) => {
        res.render('home/music');
    })



module.exports = {
    homeRouter,
};
