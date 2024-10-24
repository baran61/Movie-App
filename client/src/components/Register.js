import React, {useState,} from 'react';
import './style.css';

function Register() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //credentials: 'include', // CORS'da kimlik doğrulama bilgilerini eklemek için
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess(data.message);
        setError('');
        setFormData({ username: '', email: '', password: '' });
        console.log("Kullanıcı başarılı bir şekilde kayıt edildi !")
      } else {
        setError(data.error || 'Kayıt işlemi başarısız');
        setSuccess('');
      }
    } catch (err) {
      setError('Kayıt işlemi sırasında bir hata oluştu');
      setSuccess('');
    }
  };
  
  
  return (
    <div className='register-container'>
      <h2>Kayıt ol</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>Kullanıcı Adı:</label>
          <input 
           type='text'
           name='username'
           placeholder='Kullanıcı Adı'
           value={formData.username}
           onChange={handleChange}
           required 
           />
        </div>
        <div className='input-group'>
          <label>E-mail:</label>
          <input 
            type='email' 
            name='email'
            placeholder='E-mail'
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
          placeholder='Şifre'
          value={formData.password}
          onChange={handleChange} 
          required 
          />
        </div>
        <button className='icon-button' type='submit'>
          <span>Kayıt ol</span>
          <span className='material-icons'>check_circle</span>
        </button>
      </form>
      {success && <p className='success-message'>{success}</p>}
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
}

export default Register;
