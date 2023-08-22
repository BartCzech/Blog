import React, { useState } from 'react';
import './LoginPage.css'; // Import your custom CSS file for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Simulating login logic
    if (username === 'user' && password === 'password') {
      setMessage('Logged in! Redirecting to the home page in ' + countdown);
      startCountdown();
    } else {
      setMessage('Login failed!');
      setUsername('');
      setPassword('');
    }
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      window.location.href = 'http://localhost:5173/';
    }, (countdown + 1) * 1000);
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
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
      {message && (
        <p className={message.includes('Logged in') ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginPage;
