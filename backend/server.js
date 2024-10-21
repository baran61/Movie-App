const express = require('express')
const dotenv = require('dotenv')
const movieRoutes = require('./routes/movieRoutes');

dotenv.config();   // .env dosyasından API anahtarını al

const app = express()

const PORT = process.env.PORT || 5001;

// Movie rotalarını kullan
app.use('/api/movies', movieRoutes);


// Server'ı başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});