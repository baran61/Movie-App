const express = require('express');
const User = require('../models/User');
//Login işlemi için gerekli 3 paket
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();

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

//Login route'u

// Login route'u
router.post(
  '/login',
  [
    check('email', 'Lütfen geçerli bir e-mail adresi girin').isEmail(),
    check('password', 'Lütfen şifrenizi girin').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Kullanıcının olup olmadığını kontrol et
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Geçersiz kullanıcı e-maili tekrar deneyiniz.' });
      }

      // Şifreyi karşılaştır (hash çözümlemesi)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Geçersiz şifre tekrar deneyiniz.' });
      }

      // JWT oluştur ve kullanıcı bilgilerini ekle
      const payload = {
        user: {
          id: user.id,
          username: user.username, // Kullanıcı adını payload'a ekleyin
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET, // .env dosyasındaki JWT_SECRET ile imzalanır
        { expiresIn: '1h' },    // Token 1 saat sonra geçersiz olur
        (err, token) => {
          if (err) throw err;
          // Kullanıcı bilgileriyle birlikte token'ı döndür
          res.json({
            token,
            user: {
              id: user.id,
              username: user.username,  // Kullanıcı adını burada döndürün
            },
          });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


  module.exports = router;