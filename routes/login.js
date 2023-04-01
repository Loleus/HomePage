const express = require('express');
const loginRouter = express.Router();
const {db} = require('../utils/db');
const path = require('path');

	
const auth = (req, res) => {
    if (req.session.loggedin) {
      res.sendFile(path.resolve(__dirname, '../pages/admin.html'));;;
    } else {
      console.log("notLogged")
      res.redirect('/')
    }
  }
  const valid = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
  
    if (username == 'admin' && password == 'admin') {
      req.session.loggedin = true;
      req.session.username = username;
      console.log("loggedIn")
      res.redirect('/admin')
  
    } else {
  
      res.send('Please enter Username and Password!');
  
    }
  }

  loginRouter
  .get('/', auth)
  .post('/', valid);

module.exports = {
    loginRouter,
}