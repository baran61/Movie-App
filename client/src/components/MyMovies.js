import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Sayfa geçişleri için Link
import './style.css';

function MyMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/movies'); // API'den filmleri çek
        setMovies(response.data);
      } catch (err) {
        setError('Filmler çekilirken hata oluştu!'); // Hata mesajı
      } finally {
        setLoading(false); // Yüklenme bitti
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className='loading'>Yükleniyor...</div>;
  if (error) return <div className='error'>{error}</div>;

  return (
    <div className='movie-list'>
      {movies.map(movie => (
        <div className="movie-card" key={movie.id}>
          {/* movie verisini state olarak ilet */}
          <Link to={`/movie/${movie.id}`} state={{ movie }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="movie-poster"
            />
          </Link>
          <h3 className="movie-title">{movie.title}</h3>
          <p className='release-date'>{movie.release_date}</p>
          <p className="movie-rating">
            Oy: 
            {Array.from({ length: Math.round(movie.vote_average) }, (_, index) => (
              <span key={index} className="material-icons star">star</span>
            ))}
            <span className="rating-count"> ({movie.vote_count} oy)</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyMovies;
