const express = require('express')
const {getPopularMovies} = require('../controllers/movieController')

const router = express.Router()

// /api/movies/ altında popüler filmleri çekmek için GET rotası
router.get('/', getPopularMovies);

module.exports = router;