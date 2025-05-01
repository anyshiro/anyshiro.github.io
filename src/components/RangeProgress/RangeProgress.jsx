import React from 'react';
import './RangeProgress.css';
import PropTypes from 'prop-types';

const RangeProgress = ({ start, end, total }) => {
  const validTotal = Math.max(total, 1); // Защита от деления на ноль
  const percentage = ((end - start) / validTotal) * 100;
  const offset = (start / validTotal) * 100;

  return (
    <div className="range-progress">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${percentage}%`,
            left: `${offset}%`
          }}
        />
      </div>
      <div className="labels">
        <span>{start}</span>
        <span>{end}</span>
      </div>
    </div>
  );
};

RangeProgress.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default RangeProgress;