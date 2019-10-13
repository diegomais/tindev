import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        },
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  return (
    <div className="main-container">
      <img src={logo} alt="TinDev" />
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons">
              <button type="button" onClick={() => {}}>
                <img src={dislike} alt="Dislike" />
              </button>

              <button type="button" onClick={() => {}}>
                <img src={like} alt="Like" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Main.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
