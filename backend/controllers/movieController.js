const axios = require('axios');
const Movie = require('../models/Movie'); 

const getPopularMovies = async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        );

        const movies = response.data.results;

        // Veritabanına kaydet
        await Movie.insertMany(movies.map(movie => ({
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
        })));
        
        res.json(movies); // Gelen veriyi JSON olarak döndür
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Veri alınırken hata oluştu.' });
    }
};

module.exports = { getPopularMovies };
