const db = require('../models/model');
const messageController = {};

messageController.getMessages = (req, res, next) => {
  const messageQuery = 'SELECT * FROM messages ORDER BY created_at ASC';
  db.query(messageQuery)
    .then((data) => {
      res.locals.messages = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

messageController.postMessage = (req, res, next) => {
  const postQuery =
    'INSERT INTO messages (id, user_id, message) VALUES ($1, $2, $3)';
  const { id, message } = req.body;

  db.query(postQuery, [id, res.locals.user_id, message])
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log('Error', err);
      return next(err);
    });
};

messageController.updateMessage = (req, res, next) => {
  const updateQuery = 'UPDATE messages SET message = $1 WHERE id = $2';
  const updatedMessage = req.body.message;
  const id = req.params.id;
  db.query(updateQuery, [updatedMessage, id])
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log('Error', err);
      return next(err);
    });
};

messageController.deleteMessage = (req, res, next) => {
  const deleteQuery = 'DELETE FROM messages WHERE id = $1';

  db.query(deleteQuery, [req.params.id])
    .then((data) => {
      if (data.rowCount === 0) {
        return next({ message: 'Message not found' });
      }
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// grab user id from session
messageController.getUser = (req, res, next) => {
  const userQuery = 'SELECT user_id FROM sessions WHERE session=$1';
  const sessionID = req.cookies.dopeCookie;
  db.query(userQuery, [sessionID])
    .then((data) => {
      res.locals.user_id = data.rows[0].user_id;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = messageController;
