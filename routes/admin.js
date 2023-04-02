const express = require('express');
const adminRouter = express.Router();
const {db} = require('../utils/db');
const {NotFoundError} = require('../utils/errors')
const path = require('path');

	
const auth = (req, res) => {
    if (req.session.loggedin) {
      res.sendFile(path.resolve(__dirname, '../pages/admin.html'));;;
    } else {
      console.log("notLogged")
      res.redirect('/')
    }
  }
  adminRouter
  .get('/', auth)
  
  .get('/getAll', async function(req, res, next) {
    try {
      res.send(db.getAll());
    } catch (err) {
      console.error(`Error while getting photos `, err.message);
      next(err);
    }
  })

  .post('/', (req,res) => {
    db.create(req.body);
    res.status(201)
    .send(`<p>${req.body.title}</p><a href="/admin/photos">Back to photos</a>` );
  })
  .get('/photos', (req, res) => {
    console.log(req.session)
    if (req.session.loggedin) {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  })
  .get('/:id', (req, res) => {
    const photo = db.getOne(req.params.id);
    if(!photo) {
      throw new NotFoundError()
    }
    res.send(photo);
  })
  .put('/:id', (req, res) => {
    db.update(req.params.id, req.body);
    res.status(201)
    .redirect('/admin' );
  })
  
  .delete('admin/:id', (req, res) => {
    db.delete(req.params.id);
    res.redirect('/admin' );
  })

module.exports = {
    adminRouter,
}