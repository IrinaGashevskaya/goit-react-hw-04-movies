import React from 'react';
import PropTypes from 'prop-types';
import './GoBackButton.css';
const GoBackButton = ({ onBack }) => (
  <button type="button" className="button" onClick={onBack}>
    Go back
  </button>
);

GoBackButton.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default GoBackButton;
