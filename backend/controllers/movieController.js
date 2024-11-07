const axios = require('axios');
const Movie = require('../models/Movie');

const getPopularMovies = async (req, res) => {
    const page = req.query.page || 1; 
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
        );

        const movies = response.data.results;

        // Veritabanına yeni filmleri ekleyin (tekrarları önlemek için)
        for (const movie of movies) {
            const existingMovie = await Movie.findOne({ title: movie.title });
            if (!existingMovie) {
                await Movie.create({
                    title: movie.title,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                });
            }
        }

        res.json({ results: movies, total_pages: response.data.total_pages }); // Toplam sayfa sayısını da döndür
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Veri alınırken hata oluştu.' });
    }
};

module.exports = { getPopularMovies };
