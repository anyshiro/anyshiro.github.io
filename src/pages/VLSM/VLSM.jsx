import React, { useState, useEffect } from 'react';
import IPInput from '../../components/IPInput';
import MaskCIDRSelector from '../../components/MaskCIDRSelector';
import Alert from '../../components/Alert';
import ResultTable from '../../components/ResultTable';
import { vlsmSubnetting } from '../../utils/vlsm';
import './VLSM.css';

const VLSM = () => {
  const [network, setNetwork] = useState({ 
    ip: '192.168.0.0',
    cidr: 24
  });
  
  const [subnets, setSubnets] = useState([{ 
    id: crypto.randomUUID(),
    name: '',
    hosts: ''
  }]);

  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const validSubnets = subnets
        .filter(s => s.hosts > 0)
        .sort((a, b) => b.hosts - a.hosts);
      
      if (validSubnets.length === 0) return;

      const calculated = vlsmSubnetting(network, validSubnets);
      setResults(calculated);
      setError('');
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  }, [network, subnets]);

  const handleSubnetChange = (id, field, value) => {
    setSubnets(prev => prev.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const addSubnet = () => {
    setSubnets(prev => [...prev, {
      id: crypto.randomUUID(),
      name: '',
      hosts: ''
    }]);
  };

  const deleteSubnet = (id) => {
    setSubnets(prev => 
      prev.filter(s => s.id !== id).length > 0 
        ? prev.filter(s => s.id !== id)
        : [{ id: crypto.randomUUID(), name: '', hosts: '' }]
    );
  };

  return (
    <div className="vlsm-page">
      <h1>📡 VLSM Calculator</h1>

      {error && <Alert type="error" message={error} />}

      <div className="vlsm-grid">
        <div className="config-section glass-panel">
          <div className="input-group">
            <div className="network-config">
              <h2>Основная сеть</h2>
              <IPInput
                label="IP-адрес сети"
                value={network.ip}
                onChange={ip => setNetwork(p => ({ ...p, ip }))}
              />
              <MaskCIDRSelector
                label="Маска/CIDR"
                value={network.cidr}
                onChange={cidr => setNetwork(p => ({ ...p, cidr }))}
              />
            </div>

            <div className="subnets-config">
              <h2>Подсети</h2>
              <div className="subnet-list">
                {subnets.map(subnet => (
                  <div key={subnet.id} className="subnet-item">
                    <input
                      className="vlsm-input"
                      placeholder="Название подсети"
                      value={subnet.name}
                      onChange={e => handleSubnetChange(subnet.id, 'name', e.target.value)}
                    />
                    <input
                      className="vlsm-input"
                      type="number"
                      min="1"
                      placeholder="Количество хостов"
                      value={subnet.hosts}
                      onChange={e => handleSubnetChange(subnet.id, 'hosts', Math.max(1, e.target.value))}
                    />
                    <button 
                      className="vlsm-btn danger"
                      onClick={() => deleteSubnet(subnet.id)}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
              <button 
                className="vlsm-btn"
                onClick={addSubnet}
              >
                ＋ Добавить подсеть
              </button>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div className="results-section glass-panel">
            <h2>Результаты распределения</h2>
            <div className="results-grid">
              {results.map((result, i) => (
                <ResultTable
                  key={i}
                  title={subnets[i].name || `Подсеть ${i+1}`}
                  columns={['Параметр', 'Значение']}
                  data={Object.entries({
                    'Сеть': result.network,
                    'Маска': result.mask,
                    'CIDR': `/${result.cidr}`,
                    'Диапазон': `${result.firstHost} - ${result.lastHost}`,
                    'Broadcast': result.broadcast
                  }).map(([key, value]) => ({ 'Параметр': key, 'Значение': value }))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VLSM;