const express = require('express');
// const bodyParser = require('body-parser');
const loginRouter = express.Router();
loginRouter
    .get('/', (req, res) => {
			res.render('home/login');
    })
    .post('/', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
         if (username == 'admin' && password == 'admin') {
           console.log('loggedIn')
            res.redirect('/client');

        } else {
             console.log('notLogged')
            res.render('home/login')
        }
});
module.exports = {
    loginRouter,
};