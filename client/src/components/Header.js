import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './style.css';

function Header() {
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
              <li><a href="/">Aksiyon</a></li>
              <li><a href="/">Komedi</a></li>
              <li><a href="/">Dram</a></li>
              <li><a href="/">Belgesel</a></li>
            </ul>
          )}
        </li>
        <li><a href="/">Dizi</a></li>
        <li><a href="/">Film</a></li>
        <li><a href="/register">Kayıt ol</a></li>
        <li><a href="/signup">Giriş yap </a></li>
      </ul>

    </header>
  );
}

export default Header;
