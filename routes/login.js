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
            res.send(true);

        } else {
             console.log('notLogged')
             res.send(false)
        }
});
module.exports = {
    loginRouter,
};