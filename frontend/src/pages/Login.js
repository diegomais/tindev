import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import './Login.css';
import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', { username });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="TinDev Logo" />
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
