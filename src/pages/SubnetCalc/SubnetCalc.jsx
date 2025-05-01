import React, { useState, useEffect } from 'react';
import IPInput from '../../components/IPInput';
import MaskCIDRSelector from '../../components/MaskCIDRSelector';
import ResultTable from '../../components/ResultTable';
import Alert from '../../components/Alert';
import { calculateSubnetInfo } from '../../utils/subnetCalc';
import './SubnetCalc.css';

const SubnetCalc = () => {
  const [network, setNetwork] = useState({ ip: '192.168.0.0', cidr: 24 });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const calculated = calculateSubnetInfo(network.ip, network.cidr);
      setResults(calculated);
      setError('');
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  }, [network]);

  return (
    <div className="subnet-page">
      <h1>🧮 Калькулятор подсетей</h1>
      
      {error && <Alert type="error" message={error} />}

      <div className="config-section glass-panel">
        <div className="input-group">
          <IPInput
            label="IP-адрес сети"
            value={network.ip}
            onChange={(ip) => setNetwork(p => ({ ...p, ip }))}
          />
          <MaskCIDRSelector
            label="Маска/CIDR"
            value={network.cidr}
            onChange={(cidr) => setNetwork(p => ({ ...p, cidr }))}
          />
        </div>
      </div>

      {results && (
        <div className="results-section glass-panel">
          <ResultTable
            columns={['Параметр', 'Значение']}
            data={[
              { 'Параметр': 'Сеть', 'Значение': results.network },
              { 'Параметр': 'Маска', 'Значение': results.mask },
              { 'Параметр': 'CIDR', 'Значение': `/${results.cidr}` },
              { 'Параметр': 'Первый хост', 'Значение': results.firstHost },
              { 'Параметр': 'Последний хост', 'Значение': results.lastHost },
              { 'Параметр': 'Broadcast', 'Значение': results.broadcast },
              { 'Параметр': 'Хостов доступно', 'Значение': results.usableHosts },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default SubnetCalc;