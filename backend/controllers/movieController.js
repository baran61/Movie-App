const axios = require('axios')
const { response } = require('express')

// TMDB API'sinden popüler filmleri çeken fonksiyon

const getPopularMovies = async (req,res) => {
    try{
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        );
        res.json(response.data.results); // Gelen veriyi JSON olarak döndür
    } catch(err){
        console.error(err)
        res.status(500).json({ message: 'Veri alınırken hata oluştu.' });
    }
}

module.exports = {getPopularMovies};