module.exports = function() {
  return {
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true, 
        secure: false,
        sameSite: 'strict',
    }
  }
}