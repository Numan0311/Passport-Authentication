const jwt = require('jsonwebtoken');

const db = require('../models');


module.exports.authenticateToken=function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      console.log(err);
      res.status(403).send("You are not allowed to access this page. please login again")
      // return res.end();
    }else {
      req.user = user
      next()
    }
  });
}
