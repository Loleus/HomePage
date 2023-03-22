const express = require('express');
const { handleError } = require("./utils/errors")
const methodOverride = require('method-override');
const { clientRouter } = require('./routes/client')
const { loginRouter } = require('./routes/login')
const { homeRouter } = require('./routes/home');
const postsRouter = require("./routes/posts");
const session = require('express-session');
const {db} = require('./utils/dbp');
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
app.get('/blog', (req, res) => {
    res.sendFile(path.resolve(__dirname, './pages/index.html'));
});
app.get('/music', (req, res) => {
    res.sendFile(path.resolve(__dirname, './pages/index.html'));
});
app.get('/video', (req, res) => {
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
//     CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
// USE `nodelogin`;

// CREATE TABLE IF NOT EXISTS `accounts` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `username` varchar(50) NOT NULL,
//   `password` varchar(255) NOT NULL,
//   `email` varchar(100) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

// INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
    // connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
		// 	// If there is an issue with the query, output the error
		// 	if (error) throw error;
		// 	// If the account exists
		// 	if (results.length > 0) {
		// 		// Authenticate the user
		// 		request.session.loggedin = true;
		// 		request.session.username = username;
		// 		// Redirect to home page
		// 		response.redirect('/home');
		// 	} else {
		// 		response.send('Incorrect Username and/or Password!');
		// 	}			
		// 	response.end();
		// });
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

// app.get('/client/getAll', (req, res) => {
//   res.send(db.getAll());
// })

app.get('/client/getAll', async function(req, res, next) {
  try {
    // res.json(await posts.getMultiple(req.query.page));
    res.send(db.getAll());
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
app.post('/client', (req,res) => {
  db.create(req.body);
  res.status(201)
  .redirect('/client' );
})
// app.get('/client/*', (req, res) => {
//   console.log(req.session)
//   if (req.session.loggedin) {
//     res.redirect('/client');
//     res.end()
//   } else {
//     res.send('oh w#t&f%s !!!s')
//   }


// })

app.listen(3000, '0.0.0.0', () => {
  console.log("Listening on http://0.0.0.0:3000")
});