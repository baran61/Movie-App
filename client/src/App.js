import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Detail from './pages/Detail';
import Login from './components/Login'
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Favorite from './components/Favorite';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');  // LocalStorage'daki user'ı al
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);
  
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Kullanıcı çıkış yaptığında localStorage'dan sil
  };

  return (
    <div className="App">
      <Router>
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/movie/:id" element={<Detail />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/:userId" element={<HomePage user={user} />} />
          <Route path='/favorite' element={<Favorite/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
