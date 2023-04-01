const express = require('express');
const methodOverride = require('method-override');
const { adminRouter } = require('./routes/admin')
const { homeRouter } = require('./routes/home');
const session = require('express-session');
const path = require('path');

const app = express()
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, 
    secure: false,
    sameSite: 'strict',
  } 
}));
app.use('/', homeRouter)
app.use('/admin', adminRouter)

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username == 'admin' && password == 'admin') {
    req.session.loggedin = true;
    req.session.username = username;
    console.log("loggedIn")
    res.redirect('/admin')
  } else {
    res.send('Please enter Username and Password!');
  }
});

app.get('*', (req, res) => {
  console.log(req.session)
  if (req.session.loggedin) {
    res.redirect('/admin');
  } else {
    res.redirect('/');
  }
})


app.listen(3000, '0.0.0.0', () => {
  console.log("Listening on http://0.0.0.0:3000")
});