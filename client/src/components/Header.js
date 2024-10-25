import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './style.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMouseEnter = () => {
    setShowCategories(true);
  };

  const handleMouseLeave = () => {
    setShowCategories(false);
  };

  return (
    <header className='header'>
      <div className='logo' onClick={handleLogoClick}>
        <img src='/images/logo.png' alt='logo' />
      </div>
      <div>
        <h1>MOVİES</h1>
      </div>

      <ul className="nav">
        <li 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <a href="/">Kategori</a>
          {showCategories && (
            <ul className="dropdown">
              <li><Link to="/">Aksiyon</Link></li>
              <li><Link to="/">Komedi</Link></li>
              <li><Link to="/">Dram</Link></li>
              <li><Link to="/">Belgesel</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/">Dizi</Link></li>
        <li><Link to="/">Film</Link></li>

        {user ? (
          <>
            <li className="welcome-message">{user.name}</li>
            <li><Link to="/profile">Profil</Link></li>
            <button className='icon-button' type='button' onClick={onLogout}>
              <span className="material-icons">logout</span>
            </button>
          </>
        ) : (
          <>
            <li><Link to="/register">Kayıt ol</Link></li>
            <li><Link to="/login">Giriş yap</Link></li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
