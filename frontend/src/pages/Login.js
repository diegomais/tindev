import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';

export default function Login() {
  const [username, setUsername] = useState('');

  async function handleSubmit() {}

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev Logo" />
        <input
          placeholder="Enter your GitHub username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
