const express = require('express');
const homeRouter = express.Router();
const path = require('path');
homeRouter
    .get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
    })
    .get('/about', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
    })
    .get('/contact', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
    })
    .get('/music', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
    })
    .get('/video', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
    })
    .get('*', (req, res) => {
        console.log(req.session)
        if (req.session.loggedin) {
          res.redirect('/admin');
        } else {
          res.redirect('/');
        }
      })

module.exports = {
    homeRouter,
};
