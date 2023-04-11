module.exports = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username == process.env.LOGIN && password == process.env.PASSWORD) {
    req.session.loggedin = true;
    req.session.username = username;
    console.log("loggedIn")
    res.redirect('/admin')
  } else {
    res.send('Please enter Username and Password!');
  }
};
