import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data); // Yanıtı konsola yazdır

      if (response.ok) {
        // Yanıtı kontrol edin
        console.log(data); // API'den gelen veriyi kontrol et

        // Token ve kullanıcı bilgilerini localStorage'a kaydedin
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ id: data.user.id, name: data.user.username }));

        setSuccess('Giriş başarılı!');
        setError('');

        // Kullanıcı bilgilerini App.js'e gönder
        onLogin({ id: data.user.id, name: data.user.username });

        navigate('/');  // Ana sayfaya yönlendir
      } else {
        // Hata mesajını güncelle
        setError(data.msg || 'Giriş işlemi başarısız');
        setSuccess('');
      }
    } catch (err) {
      setError('Giriş işlemi sırasında bir hata oluştu');
      setSuccess('');
    }
  };

  return (
    <div className='signin-container'>
      <h2>Giriş yap</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>E-posta:</label>
          <input
            type='email'
            name='email'
            placeholder='E-Posta'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-group'>
          <label>Şifre:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Şifre'
            required
          />
        </div>
        <button type="submit" className='icon-button'>
          <span>Giriş yap</span>
          <span className='material-icons'>check_circle</span>
        </button>
      </form>
      {success && <p className='success-message'>{success}</p>}
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
}

export default Login;
