import React, { useState, useEffect } from 'react';
import IPInput from '../../components/IPInput';
import MaskCIDRSelector from '../../components/MaskCIDRSelector';
import BitVisualizer from '../../components/BitVisualizer';
import ResultTable from '../../components/ResultTable';
import Alert from '../../components/Alert';
import { ipToBinary, ipToHex, isValidIPv4, cidrToMask } from '../../utils/ipUtils';
import './Converter.css';

const Converter = () => {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState(24);
  const [error, setError] = useState('');
  const [results, setResults] = useState({});

  useEffect(() => {
    try {
      if (!isValidIPv4(ip)) throw new Error('Неверный формат IP-адреса');
      
      const binary = ipToBinary(ip);
      const hex = ipToHex(ip);
      const mask = cidrToMask(cidr);
      const networkClass = getNetworkClass(ip);

      setResults({
        'Address': ip,
        'BIN': binary,
        'MASK': mask,
        'CIDR': `/${cidr}`,
        'Class': networkClass
      });

      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, [ip, cidr]);

  const getNetworkClass = (ip) => {
    const firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet < 128) return 'A';
    if (firstOctet < 192) return 'B';
    if (firstOctet < 224) return 'C';
    if (firstOctet < 240) return 'D';
    return 'E';
  };

  return (
    <div className="converter-page">
      <h1>🔀 Конвертер IP-адресов</h1>

      {error && <Alert type="error" message={error} />}

      <div className="converter-grid">
        <div className="input-section glass-panel">
          <div className="input-group">
            <IPInput
              label="IPv4 адрес"
              value={ip}
              onChange={setIp}
              error={!!error}
            />
            <MaskCIDRSelector
              label="Маска/CIDR"
              value={cidr}
              onChange={setCidr}
            />
          </div>
        </div>

        <div className="visualization-section glass-panel">
          <h3>Битовое представление</h3>
          <BitVisualizer cidr={cidr} />
        </div>

        <div className="results-section glass-panel">
        <ResultTable
            columns={['Parameter', 'Value']}
            data={Object.entries(results).map(([key, value]) => ({
              'Parameter': key,
              'Value': value
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;