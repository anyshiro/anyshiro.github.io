import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = !isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDarkTheme(!isDarkTheme);
  };

  // Закрытие меню при клике вне области
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  // Блокировка скролла
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
  }, [isMenuOpen]);

  return (
    <header className="header glass-effect">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🛠️</span>
          <span className="logo-text">NetAdminTools</span>
        </Link>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/converter" className="nav-link">Конвертер</Link>
          <Link to="/subnet-calc" className="nav-link">Калькулятор</Link>
          <Link to="/vlsm" className="nav-link">VLSM</Link>
          
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Переключить тему"
          >
            {isDarkTheme ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;