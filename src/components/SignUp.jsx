import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signup = (e) => {
    // post request to server
    e.preventDefault();
    axios
      .post(
        'http://localhost:3000/user/signup',
        {
          // id: props.id,
          username: username,
          password: password,
        },
        { withCredentials: true, credentials: 'include' }
      )
      .then((data) => {
        // window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form>
        <h1>SignUp</h1>

        <div className="input-field">
          <input
            type="text"
            placeholder="Username"
            onChange={onUsernameChange}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            onChange={onPasswordChange}
          />
        </div>

        <div className="idkYet">
          <button onClick={signup}>SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
