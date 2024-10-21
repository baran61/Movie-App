import React , {useEffect, useState} from 'react'
import axios from 'axios'
import './style.css'

function MyMovies() {

const[movies,setMovies] = useState([]);
const[loading,setLoading]= useState();
const[error,setError] = useState();

useEffect(() => {
  const fetchMovies = async () => {
    setLoading(true); // Yükleniyor durumunu başlat
    try {
      const response = await axios.get('http://localhost:5001/api/movies'); // API'den filmleri çek
      setMovies(response.data);
    } catch (err) {
      setError('Filmler çekilirken hata oluştu!'); // Hata durumunu ayarla
    } finally {
      setLoading(false); // Yükleniyor durumunu sona erdir
    }
  };

  fetchMovies();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

  return (
    <div className='movie-list'>
      {movies.map(movie => (
        <div className="movie-card" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB poster URL'si
            alt={movie.title}
            className="movie-poster"
          />
          <h3>{movie.title}</h3>
          <p>Açıklama: {movie.overview}</p>
          <p>Oy Ortalaması: {movie.vote_average} ({movie.vote_count} oy)</p>
        </div>
      ))}
    </div>
  )
}

export default MyMovies
