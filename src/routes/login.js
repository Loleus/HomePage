const express = require('express');
const loginRouter = express.Router();
const auth = require('../utils/auth')
const valid = require('../utils/valid')

  loginRouter
  .get('/', auth)
  .post('/', valid);

module.exports = {
    loginRouter,
}