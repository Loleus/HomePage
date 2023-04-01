const { adminRouter } = require('../routes/admin')
const { homeRouter } = require('../routes/home');
const { loginRouter } = require('../routes/login');

module.exports = function(app) {
app.use('/admin', adminRouter)
app.use('/login', loginRouter)
app.use('/', homeRouter)
}