import React from 'react';
import PropTypes from 'prop-types';

import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
  return (
    <div className="main-container">
      <img src={logo} alt="TinDev" />
      <ul>
        <li>
          <img
            src="https://avatars0.githubusercontent.com/u/40746974?s=460&v=4"
            alt=""
          />
          <footer>
            <strong>Diego Mais</strong>
            <p>
              Full Stack Developer: 5+ years of experience in Software
              Development (mainly JavaScript). Currently interested in Node.js,
              Angular, ReactJS and React Native.
            </p>
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
        <li>
          <img
            src="https://avatars0.githubusercontent.com/u/40746974?s=460&v=4"
            alt=""
          />
          <footer>
            <strong>Diego Mais</strong>
            <p>
              Full Stack Developer: 5+ years of experience in Software
              Development (mainly JavaScript). Currently interested in Node.js,
              Angular, ReactJS and React Native.
            </p>
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
        <li>
          <img
            src="https://avatars0.githubusercontent.com/u/40746974?s=460&v=4"
            alt=""
          />
          <footer>
            <strong>Diego Mais</strong>
            <p>
              Full Stack Developer: 5+ years of experience in Software
              Development (mainly JavaScript). Currently interested in Node.js,
              Angular, ReactJS and React Native.
            </p>
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
        <li>
          <img
            src="https://avatars0.githubusercontent.com/u/40746974?s=460&v=4"
            alt=""
          />
          <footer>
            <strong>Diego Mais</strong>
            <p>
              Full Stack Developer: 5+ years of experience in Software
              Development (mainly JavaScript). Currently interested in Node.js,
              Angular, ReactJS and React Native.
            </p>
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
