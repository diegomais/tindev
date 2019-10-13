import React from 'react';
import PropTypes from 'prop-types';

export default function Main({ match }) {
  return <h1>User: {match.params.id}</h1>;
}

Main.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
