module.exports = function (memoryStore) {
  return {
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: memoryStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    }
  };
};