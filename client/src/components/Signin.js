import React from 'react'
import './style.css';

function Signin() {
  return (
    <div className='signin-container'>
      <h2>Giriş yap</h2>
      <form className='form'>
        <div className='input-group'>
          <label>Kullanıcı Adı:</label>
          <input type='text' placeholder='Kullanıcı Adı' required />
        </div>
        <div className='input-group'>
          <label>Şifre:</label>
          <input type='password' placeholder='Şifre' required />
        </div>
        <button className='icon-button'>
          <span>Giriş yap</span>
          <span className='material-icons'>check_circle</span>
        </button>
      </form>
    </div>
  )
}

export default Signin
