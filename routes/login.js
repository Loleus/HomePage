const express = require('express');
const bodyParser = require('body-parser');  
const loginRouter = express.Router();
const path = require('path');

loginRouter
    .get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../pages/admin.html'));
    })
    .post('/', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        //  if (username == 'admin' && password == 'admin') {
        //    console.log('loggedIn')
        //    res.redirect("/client")

        // } else {
        //      console.log('notLogged')
        //      res.sendFile(path.resolve(__dirname, '../pages/index.html'));
        // }
        if (username == 'admin' && password == 'admin') {
            // Execute SQL query that'll select the account from the database based on the specified username and password
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect("/client")
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
});
module.exports = {
    loginRouter,
};