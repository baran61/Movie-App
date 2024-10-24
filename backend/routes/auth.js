const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Kayıt olma route'u
router.post('/register', [
  check('username', 'Kullanıcı adı gereklidir').not().isEmpty(),
  check('email', 'Lütfen geçerli bir e-mail girin').isEmail(),
  check('password', 'Şifre en az 6 karakter olmalıdır').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Kullanıcı var mı kontrol et
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Bu e-mail ile kayıtlı bir kullanıcı zaten var.' });
    }

    // Yeni kullanıcı oluştur
    user = new User({
      username,
      email,
      password
    });

    // Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Kullanıcıyı kaydet
    await user.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kayıt işlemi başarısız' });
  }
});

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
      // Kullanıcı var mı kontrol et
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Geçersiz kullanıcı e-maili tekrar deneyiniz.' });
      }

      // Şifreyi karşılaştır (hash çözümlemesi)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Geçersiz şifre tekrar deneyiniz.' });
      }

      // JWT oluştur ve kullanıcıya gönder
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET, // .env dosyasındaki JWT_SECRET ile imzalanır
        { expiresIn: '1h' }, // Token 1 saat sonra geçersiz olur
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Hatası');
    }
  }
);

module.exports = router;
