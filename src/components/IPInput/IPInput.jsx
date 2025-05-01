import React, { useState, useEffect, useRef } from 'react';
import './IPInput.css';

const IPInput = ({ value = '', onChange, label }) => {
  const [octets, setOctets] = useState(['', '', '', '']);
  const inputs = useRef(Array(4).fill(null));

  useEffect(() => {
    const newOctets = value.split('.').slice(0, 4);
    setOctets([...newOctets, ...Array(4 - newOctets.length).fill('')]);
  }, [value]);

  const handleChange = (index, newValue) => {
    if (/^\d*$/.test(newValue) && newValue >= 0 && newValue <= 255) {
      const newOctets = [...octets];
      newOctets[index] = newValue.replace(/\D/g, '');
      setOctets(newOctets);
      
      if (newValue.length === 3 && index < 3) {
        inputs.current[index + 1].focus();
      }
      
      onChange(newOctets.join('.'));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === '.' || e.key === 'Enter') {
      e.preventDefault();
      if (index < 3) inputs.current[index + 1].focus();
    }
    
    if (e.key === 'Backspace' && octets[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="ip-input-container">
      {label && <label className="ip-input-label">{label}</label>}
      <div className="octets-wrapper">
        {octets.map((octet, index) => (
          <React.Fragment key={index}>
            <input
              ref={el => inputs.current[index] = el}
              type="text"
              className="ip-octet"
              value={octet}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength="3"
              inputMode="numeric"
              placeholder="0"
            />
            {index < 3 && <span className="dot-divider">.</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default IPInput;