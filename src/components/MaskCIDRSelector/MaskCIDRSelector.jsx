import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MaskCIDRSelector.css';

const MaskCIDRSelector = ({ value = 24, onChange, label }) => {
  const [cidr, setCidr] = useState(value);
  const presets = [8, 16, 24];

  useEffect(() => {
    setCidr(value);
  }, [value]);

  const handleChange = (newCidr) => {
    const validCidr = Math.min(32, Math.max(0, newCidr));
    setCidr(validCidr);
    onChange(validCidr);
  };

  return (
    <div className="cidr-selector">
      {label && <label className="cidr-label">{label}</label>}
      
      <div className="preset-buttons">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`preset-btn ${preset === cidr ? 'active' : ''}`}
            onClick={() => handleChange(preset)}
          >
            /{preset}
          </button>
        ))}
      </div>

      <div className="custom-cidr">
        <input
          type="range"
          min="0"
          max="32"
          value={cidr}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="cidr-slider"
        />
        <div className="cidr-value">
          /{cidr}
        </div>
      </div>
    </div>
  );
};

MaskCIDRSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default MaskCIDRSelector;