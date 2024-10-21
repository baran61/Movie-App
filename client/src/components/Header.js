import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'; 
import './style.css'

function Header() {

    const handleLogoClick = () => {
        Navigate('/');
    }

  return (
    <header className='header'>
        <div className='logo' onClick={handleLogoClick}>
            <img src='/images/logo.png' alt='logo'/>
        </div>
      
      <ul className="nav">
        <li><a href="#">Kategori</a></li>
        <li><a href="#">Dizi</a></li>
        <li><a href="#">Film</a></li>
      </ul>

      <h1>Movie Website</h1>
    </header>
  )
}

export default Header
