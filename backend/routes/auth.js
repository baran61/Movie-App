const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Kayıt olma route'u
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Yeni kullanıcı oluşturma
      const newUser = new User({
        username,
        email,
        password,
      });
  
      // Kullanıcıyı MongoDB'ye kaydetme
      await newUser.save();
      res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kayıt işlemi başarısız' });
    }
  });

  module.exports = router;