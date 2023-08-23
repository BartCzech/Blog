import React, { useState } from 'react';
import './LoginPage.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log('Token saved to localStorage:', token);
        setLoginStatus('Logged in');
      } else {
        console.error('Login failed');
        setLoginStatus('Wrong credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginStatus('Error occurred');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      {loginStatus && (
        <p className={loginStatus === 'Logged in' ? 'success' : 'error'}>
          {loginStatus}
        </p>
      )}
    </div>
  );
}

export default LoginPage;
