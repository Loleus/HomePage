const express = require('express');
// const { handleError } = require("./utils/errors")
const methodOverride = require('method-override');
const { clientRouter } = require('./routes/client')
const { loginRouter } = require('./routes/login')
const { homeRouter } = require('./routes/home');
const postsRouter = require("./routes/posts");
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



app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, './pages/index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, './pages/index.html'));
});

// app.get('/post', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// });
// app.use('/', homeRouter);
// app.use('/login', loginRouter)
// app.use('/posts', postsRouter)
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './pages/index.html'));
})

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username == 'admin' && password == 'admin') {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    req.session.loggedin = true;
    req.session.username = username;
    console.log("loggedIn")
    console.log(req.session)
    res.redirect('/client')
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});
const auth = (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.resolve(__dirname, './pages/admin.html'));;;
  } else {
    console.log("notLogged")
    res.redirect('/')
    res.end()
  }
}
app.get('/client', auth)
// app.get('/client/*', auth)
// app.use(handleError)
app.listen(3000, '0.0.0.0', () => {
  console.log("Listening on http://0.0.0.0:3000")
});