const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const connectDB = require('./clients/db')

dotenv.config(); // .env dosyasından API anahtarını al

const app = express();

const PORT = process.env.PORT || 5001;

connectDB();

// CORS ayarlarını buraya koy
app.use(cors()); // Tüm originlerden gelen istekleri kabul et
app.use(express.json()); // JSON gövdesini ayrıştırmak için middleware

// Movie rotalarını kullan
app.use('/api/movies', movieRoutes);

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
