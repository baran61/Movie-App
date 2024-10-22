import React from 'react';
import './style.css';

function Register() {
  return (
    <div className='register-container'>
      <h2>Kayıt ol</h2>
      <form className='form'>
        <div className='input-group'>
          <label>Kullanıcı Adı:</label>
          <input type='text' placeholder='Kullanıcı Adı' required />
        </div>
        <div className='input-group'>
          <label>E-mail:</label>
          <input type='email' placeholder='E-mail' required />
        </div>
        <div className='input-group'>
          <label>Şifre:</label>
          <input type='password' placeholder='Şifre' required />
        </div>
        <button className='icon-button'>
          <span>Kayıt ol</span>
          <span className='material-icons'>check_circle</span>
        </button>
      </form>
    </div>
  );
}

export default Register;
