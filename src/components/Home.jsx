import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import logo from '../../dist/assets/logo.png';

import MessageContainer from '../containers/MessageContainer';
import InputForm from './InputForm';

const Home = (props) => {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    axios(`http://localhost:3000/api`)
      .then((response) => {
        setMessageList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    const messageId = uuidv4();

    if (e.target.value[0] === undefined) {
      alert('Message contains no value.');
    } else {
      //database update
      axios.post(
        'http://localhost:3000/api',
        {
          id: messageId,
          message: e.target.value,
        },
        { withCredentials: true, credentials: 'include' }
      );

      //state update
      setMessageList([
        ...messageList,
        {
          id: messageId,
          message: e.target.value,
        },
      ]);
    }
  };

  const deleteMessage = (id, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/api/${id}`, {
        withCredentials: true,
        credentials: 'include',
      })
      .then((response) => {
        setMessageList(
          messageList.filter((message) => {
            return message.id !== id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div id="title">
        <img src={logo} id="logo" />
        <h1>DATCORD</h1>
      </div>
      <MessageContainer
        messageList={messageList}
        deleteMessage={deleteMessage}
      />
      <InputForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
