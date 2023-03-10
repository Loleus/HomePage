const express = require('express');
const hbs = require('express-handlebars');
const {handleError} = require("./utils/errors")
const methodOverride = require('method-override');
const {clientRouter} = require('./routes/client')
const {loginRouter} = require('./routes/login')
const {homeRouter} = require('./routes/home');
const postsRouter = require("./routes/posts");
const {join } = require('path');

const app = express()
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static(join(__dirname, 'public')));
app.use('/',homeRouter)


// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/about.html'));
// });

// app.get('/contact', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
// });

// app.get('/post', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// });
// app.engine('.hbs', hbs.engine({
//   defaultLayout: 'main',
//   extname: '.hbs',
//   layoutsDir: join(__dirname, 'views/layouts')
// }));
// app.set('view engine', '.hbs');
// app.use('/', homeRouter);
app.use('/login', loginRouter)
// app.use('/posts', postsRouter)
app.use('/client', clientRouter)
app.use(handleError)
app.listen(3000, '0.0.0.0',() => {
  console.log("Listening on http://0.0.0.0:3000")
});