const express = require('express');
const adminRouter = express.Router();
const auth = require('../services/auth')
const photoService = require('../services/photo')

adminRouter
  .get('/', auth)
  .get('/getAll', photoService.getAll(req, res, next))
  .post('/', photoService.create(req, res))
  .get('/photos', auth)
  .get('/:id', photoService.getOne(req, res))
  .put('/:id', photoService.update(req, res))
  .delete('admin/:id', photoService.remove(req, res))

module.exports = {
  adminRouter,
}