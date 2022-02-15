const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//login
router.post(
  '/',
  userController.getUser,
  userController.setCookie,
  (req, res) => {
    return res.send(res.locals).status(200);
  }
);

//signup
router.post(
  '/signup',
  userController.createUser,
  userController.setCookie,
  (req, res) => {
    return res.sendStatus(200);
  }
);

module.exports = router;
