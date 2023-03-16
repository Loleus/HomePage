const express = require('express');
const bodyParser = require('body-parser');  
const loginRouter = express.Router();
const path = require('path');
loginRouter
    .get('/', (req, res) => {
			// res.render('home/login');
    })
    .post('/', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
         if (username == 'admin' && password == 'admin') {
           console.log('loggedIn')
        //    res.redirect("/client")
           res.sendFile(path.resolve(__dirname, '../pages/admin.html'));

        } else {
             console.log('notLogged')
             res.sendFile(path.resolve(__dirname, '../pages/index.html#'));
        }
});
module.exports = {
    loginRouter,
};