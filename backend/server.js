const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./clients/db');
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/auth');

// .env dosyasından API anahtarlarını al
dotenv.config(); 

// Express uygulamasını başlat
const app = express();

// Portu ayarla
const PORT = process.env.PORT || 5001;

// MongoDB bağlantısını gerçekleştir
connectDB();

// CORS ayarlarını yapılandır
const corsOptions = {
  origin: 'http://localhost:3000',                            // Sadece React uygulamasına izin ver
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],       // İzin verilen HTTP metodları
  allowedHeaders: ['Content-Type', 'Authorization'], // İzin verilen başlıklar
  //credentials: true,                                        // Eğer kimlik doğrulaması gerekiyorsa
};

app.use(cors(corsOptions));                                   // CORS middleware'ini uygulamaya dahil et

// Preflight OPTIONS isteklerine yanıt ver
app.options('*', cors(corsOptions));

// JSON gövdesini ayrıştırmak için middleware
app.use(express.json()); 

// Route'ları tanımla
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
