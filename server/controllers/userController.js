const db = require('../models/model');
const userController = {};
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

// for login
userController.getUser = (req, res, next) => {
  const userQuery = 'SELECT id FROM users WHERE username=$1 and password=$2';
  const { username, password } = req.body;
  db.query(userQuery, [username, password])
    .then((data) => {
      res.locals = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// for signup
userController.createUser = async (req, res, next) => {
  const createUserQuery =
    'INSERT INTO users (id, username, password) values ($1, $2, $3)';
  const id = uuidv4();
  const { username } = req.body;
  res.locals = [{ id: id }];

  const password = await bcrypt.hash(req.body.password, 10);

  db.query(createUserQuery, [id, username, password])
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// set a cookie once the user logs in
userController.setCookie = (req, res, next) => {
  const setCookieQuery =
    'INSERT INTO sessions (user_id, session) values ($1, $2)';
  const uuid = uuidv4();
  db.query(setCookieQuery, [res.locals[0].id, uuid]);
  res.cookie('dopeCookie', uuid);
  return next();
};

module.exports = userController;
