module.exports = (req, res) => {

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
};