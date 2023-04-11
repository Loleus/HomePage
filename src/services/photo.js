const { db } = require('./db');
const { NotFoundError } = require('../utils/errors')

const getAll = async (req, res, next) => {
  try {
    res.send(db.getAll());
  } catch (err) {
    console.error(`Error while getting photos `, err.message);
    next(err);
  }
};

const getOne = async (req, res) => {
  const photo = db.getOne(req.params.id);
  if (!photo) {
    throw new NotFoundError()
  }
  res.send(photo);
};

const create = async (req, res) => {
  db.create(req.body);
  res.status(201)
    .send(`<p>${req.body.title}</p><a href="/admin/photos">Back to photos</a>`);
};

const update = async (req, res) => {
  db.update(req.params.id, req.body);
  res.status(201)
    .redirect('/admin');
};

const remove = async (req, res) => {
  db.delete(req.params.id);
  res.redirect('/admin');
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
