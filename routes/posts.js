const express = require('express');
const postsRouter = express.Router();
const posts = require('../utils/posts');

/* GET programming languages. */
postsRouter.get('/', async function(req, res, next) {
  try {
    // res.json(await posts.getMultiple(req.query.page));
    res.send(await posts.getMultiple(req.query.page))
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = {
  postsRouter
};