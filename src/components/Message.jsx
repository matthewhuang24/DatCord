import React, { useState } from 'react';
import axios from 'axios';

const Message = (props) => {
  const [updatedMessage, setUpdatedMessage] = useState(props.message);

  const onUpdatedMessageChange = (e, id) => {
    setUpdatedMessage(e.target.value);
  };

  const onEdit = (id, e) => {
    e.preventDefault();
    const message = document.getElementById(id);
    // message.setAttribute("contenteditable", true);
    // message.setAttribute("role", "textbox");
    message.removeAttribute('disabled');
    message.focus();

    message.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setUpdatedMessage(e.target.value);
        message.setAttribute('disabled', true);
        message.blur();
        axios
          .put(
            `http://localhost:3000/api/${id}`,
            {
              message: e.target.value,
            },
            { withCredentials: true, credentials: 'include' }
          )
          .then((response) => {})
          .catch((err) => {
            console.log(err);
          });
      }
      if (e.key === 'Escape') {
        console.log(e);
        message.removeAttribute('contenteditable');
        message.removeAttribute('role');
        message.setAttribute('disabled', true);
        message.blur();
      }
    });
  };

  return (
    <form className="messageForm">
      <input
        id={props.id}
        value={updatedMessage}
        size="50"
        onChange={() => {
          onUpdatedMessageChange(event, props.id);
        }}
        className="messages"
        disabled
      />
      <span>
        <button value={updatedMessage} onClick={() => onEdit(props.id, event)}>
          Edit
        </button>
        <button
          onClick={() => {
            props.deleteMessage(props.id, event);
          }}
        >
          X
        </button>
      </span>
    </form>
  );
};

export default Message;
