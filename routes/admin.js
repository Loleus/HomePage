const express = require('express');
const adminRouter = express.Router();
const { db } = require('../utils/db');
const { NotFoundError } = require('../utils/errors')
const auth = require('../utils/auth')

adminRouter
  .get('/', auth)
  .get('/getAll', async function (req, res, next) {
    try {
      res.send(db.getAll());
    } catch (err) {
      console.error(`Error while getting photos `, err.message);
      next(err);
    }
  })
  .post('/', (req, res) => {
    db.create(req.body);
    res.status(201)
      .send(`<p>${req.body.title}</p><a href="/admin/photos">Back to photos</a>`);
  })
  .get('/photos', auth)
  .get('/:id', (req, res) => {
    const photo = db.getOne(req.params.id);
    if (!photo) {
      throw new NotFoundError()
    }
    res.send(photo);
  })
  .put('/:id', (req, res) => {
    db.update(req.params.id, req.body);
    res.status(201)
      .redirect('/admin');
  })

  .delete('admin/:id', (req, res) => {
    db.delete(req.params.id);
    res.redirect('/admin');
  })
module.exports = {
  adminRouter,
}