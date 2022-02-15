const express = require('express');
const router = express.Router(); 
const messageController = require('../controllers/messageController');
const userController = require('../controllers/userController')

router.get('/', messageController.getMessages, (req, res) => {
  return res.status(200).send(res.locals.messages);
})

router.post('/', messageController.getUser, messageController.postMessage, (req, res) => {
  return res.sendStatus(200);
})

router.put('/:id', messageController.getUser, messageController.updateMessage, (req, res) => {
  return res.sendStatus(200);
})

router.delete('/:id', messageController.getUser, messageController.deleteMessage, (req, res) => {
  return res.sendStatus(200);
})

module.exports = router;