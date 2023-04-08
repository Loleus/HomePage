require('dotenv').config()
const port = process.env.PORT || 3001;
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const memoryStore = new session.MemoryStore();
const path = require('path');
const sessionObj = require('./src/utils/session');
const router = require('./src/utils/router');
const app = express()

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(session(sessionObj(memoryStore)));

router(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});