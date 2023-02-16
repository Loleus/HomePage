const express = require('express');
const methodOverride = require('method-override');
const { join } = require('path');
const app = express()
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static(join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send('public/index.html')
})
app.get('/admin', (req, res) => {
  res.send('login')
})
app.listen(3000, '0.0.0.0',() => {
  console.log("Listening on http://0.0.0.0:3000")
});