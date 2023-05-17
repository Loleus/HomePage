const path = require('path');
module.exports = (req, res) => {

  if (req.session.loggedin) {

    res.sendFile(path.resolve(__dirname, '../pages/admin.html'));

  } else {

    console.log("notLogged")

    res.sendFile(path.resolve(__dirname, '../pages/index.html'));

  };
};