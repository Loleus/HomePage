const express = require('express');
const loginRouter = express.Router();
const auth = require('../services/auth')
const valid = require('../services/valid')

  loginRouter
  .get('/', auth)
  .post('/', valid);

module.exports = {
    loginRouter,
}