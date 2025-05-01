import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const tools = [
    {
      icon: '🔀',
      title: 'Конвертер',
      path: '/converter',
      description: 'Преобразование IPv4 между форматами: десятичный, двоичный, HEX'
    },
    {
      icon: '🧮',
      title: 'Калькулятор подсетей',
      path: '/subnet-calc',
      description: 'Расчет сети, широковещательного адреса, количества хостов'
    },
    {
      icon: '📊',
      title: 'VLSM',
      path: '/vlsm',
      description: 'Разбиение сети на подсети переменной длины'
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section glass-panel">
        <h1>Добро пожаловать в NetAdminTools</h1>
        <p className="subtitle">Набор профессиональных инструментов для работы с IPv4-сетями</p>
      </div>

      <div className="tools-grid">
        {tools.map((tool, index) => (
          <Link 
            key={index} 
            to={tool.path}
            className="tool-card glass-panel"
          >
            <div className="card-icon">{tool.icon}</div>
            <h3 className="card-title">{tool.title}</h3>
            <p className="card-description">{tool.description}</p>
            <div className="card-hover-effect"></div>
          </Link>
        ))}
      </div>

      <div className="info-section glass-panel">
        <h2>📚 Быстрый старт</h2>
        <div className="tips">
          <p>• Используйте навигацию выше для перехода между инструментами</p>
          <p>• Нажмите ♻️ в правом верхнем углу для сброса данных</p>
          <p>• Переключите тему с помощью 🌙/🌞 в хедере</p>
        </div>
      </div>
    </div>
  );
};

export default Home;