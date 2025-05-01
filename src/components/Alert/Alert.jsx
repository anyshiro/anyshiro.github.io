import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ type = 'info', message, children, onClose }) => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  return (
    <div className={`alert alert-${type}`} role="alert">
      <div className="alert-content">
        <span className="alert-icon">{icons[type]}</span>
        <div className="alert-text">
          {message || children}
        </div>
      </div>
      {onClose && (
        <button 
          className="alert-close"
          onClick={onClose}
          aria-label="Закрыть уведомление"
        >
          &times;
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default Alert;