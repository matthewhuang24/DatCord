import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:3000/user',
        {
          username: username,
          password: password,
        },
        { withCredentials: true, credentials: 'include' }
      )
      .then((response) => {
        const id = response.data[0].id;
        console.log('id', id);
        if (id) {
          // setting ID state to confirmed/retrieved username/password combination
          // props.setLoginId(response.data[0].id);
          // link to home
          // window.location.replace('/');
        } else {
          //link to signup
          // window.location.replace('/signup');
          alert('incorrect username/password');
        }
      });
  };

  const onUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const onPasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  return (
    <div>
      <form>
        <h1>Login</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            onChange={onUsernameChange}
            placeholder="username"
            autoComplete="username"
            required
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="username"
            onChange={onPasswordChange}
            placeholder="password"
            autoComplete="current-password"
            required
          ></input>
        </div>
        <br></br>
        <div>
          <button value={[username, password]} onClick={handleLogin}>
            Login
          </button>
          <button onClick={() => window.location.replace('/signup')}>
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
