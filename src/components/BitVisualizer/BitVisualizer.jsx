import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import './BitVisualizer.css';

const BitVisualizer = ({ cidr = 24, bits: externalBits, showLabels = true }) => {
  const [bits, setBits] = useState([]);

  useEffect(() => {
    if (externalBits) {
      setBits(externalBits);
    } else {
      const newBits = Array(32)
        .fill(0)
        .map((_, i) => (i < cidr ? 1 : 0));
      setBits(newBits);
    }
  }, [cidr, externalBits]);

  const renderByteBlocks = () => {
    const bytes = bits.reduce((acc, bit, index) => {
      if (index % 8 === 0) acc.push([]);
      acc[acc.length - 1].push(bit);
      return acc;
    }, []);

    return (
      <div className="bit-container">
        {bytes.map((byte, byteIndex) => (
          <React.Fragment key={byteIndex}>
            <div className="byte-group">
              <div className="bits-row">
                {byte.map((bit, bitIndex) => (
                  <div
                    key={bitIndex}
                    className={`bit ${bit ? 'active' : ''} ${
                      (byteIndex * 8 + bitIndex) < cidr ? 'network' : 'host'
                    }`}
                  >
                    {bit}
                  </div>
                ))}
              </div>
              {showLabels && (
                <span className="byte-number">Byte {byteIndex + 1}</span>
              )}
            </div>
            {byteIndex < 3 && <div className="byte-separator"></div>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="bit-visualizer">
      {showLabels && (
        <div className="legend">
          <span className="network-label">Network</span>
          <span className="host-label">Host</span>
        </div>
      )}
      {renderByteBlocks()}
    </div>
  );
};

BitVisualizer.propTypes = {
  cidr: PropTypes.number,
  bits: PropTypes.arrayOf(PropTypes.number),
  showLabels: PropTypes.bool,
};

export default memo(BitVisualizer);