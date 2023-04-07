const express = require('express');
const adminRouter = express.Router();
const auth = require('../services/auth')
const photoService = require('../services/photo')

adminRouter
  .get('/', auth)
  .get('/getAll', photoService.getAll)
  .post('/', photoService.create)
  .get('/photos', auth)
  .get('/:id', photoService.getOne)
  .put('/:id', photoService.update)
  .delete('admin/:id', photoService.remove)

module.exports = {
  adminRouter,
}