require('dotenv').config()

const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const sessionObj = require('./src/utils/session');
const router = require('./src/utils/router');
const app = express()

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(session(sessionObj()));

router(app);

app.listen(3000, '0.0.0.0', () => {
  console.log("Listening on http://0.0.0.0:3000")
});