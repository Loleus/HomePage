const express = require('express');
const clientRouter = express.Router();
const {db} = require('../utils/db');
const {NotFoundError} = require('../utils/errors')
clientRouter
	
.get('/', (req, res) => {
  res.render('client/list-all', {
    clients: db.getAll(),
  });
})
.get('/getAll', (req, res) => {
  res.send(db.getAll());
})

.get('/:id', (req, res) => {
  const client = db.getOne(req.params.id);
  if(!client) {
    throw new NotFoundError()
  }
  res.render('client/one', {
    client,
  });
})

.post('/', (req,res) => {
  const id = db.create(req.body);
  res
  .status(201)
  .render('client/added', {
    name: req.body.name,
    id,
  });
})

.put('/:id', (req, res) => {
  db.update(req.params.id, req.body);
  res.render('client/modified', {
    name: req.body.name,
    id: req.params.id,
  });
})

.delete('/:id', (req, res) => {
  db.delete(req.params.id);
  res.render('client/deleted');
  
})

.get('/form/add', (req, res) => {
  res.render('client/forms/add');
})

.get('/form/edit/:id', (req, res) => {
  const client = db.getOne(req.params.id);
  if (!client) {
    throw new NotFoundError()
  }
  res.render('client/forms/edit', {
    client: db.getOne(req.params.id),
  });
  
});

module.exports = {
    clientRouter,
}