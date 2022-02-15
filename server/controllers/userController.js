const db = require('../models/model');
const userController = {};
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { signedCookie } = require('cookie-parser');

// get hash and salt

userController.getHash = (req, res, next) => {
  //retrieve hash
  const hashQuery = 'SELECT hash,salt FROM users WHERE username=$1';
  const { username } = req.body;

  db.query(hashQuery, [username])
    .then((data) => {
      res.locals.hash = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// get user from login
userController.getUser = async (req, res, next) => {
  const userQuery = 'SELECT id FROM users WHERE username=$1 and hash=$2';
  const { username, password } = req.body;

  if (res.locals.hash[0]) {
    let { hash, salt } = res.locals.hash[0];

    //hash user password + stored hash
    const check = await bcrypt.hash(password, salt);

    // validation query

    db.query(userQuery, [username, check])
      .then((data) => {
        res.locals = data.rows;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  } else return next();
};

// for signup
userController.createUser = async (req, res, next) => {
  const createUserQuery =
    'INSERT INTO users (id, username, salt, hash) values ($1, $2, $3, $4)';
  const id = uuidv4();
  const { username, password } = req.body;
  res.locals = [{ id: id }];

  const salt = await bcrypt.genSalt(14);

  const hash = await bcrypt.hash(password, salt);

  db.query(createUserQuery, [id, username, salt, hash])
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
