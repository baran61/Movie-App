import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Sayfa geçişleri için Link
import './style.css';

function MyMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [page,setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Filmleri çekme fonksiyonu
  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/movies?page=${page}`);
      setMovies(response.data.results); // Gelen film verileri
      setTotalPages(response.data.total_pages); // Toplam sayfa sayısını güncelle
      setError(null);
    } catch (err) {
      setError('Filmler çekilirken hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  // Sayfa değiştiğinde veriyi yeniden çek
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  if (loading) return <div className='loading'>Yükleniyor...</div>;
  if (error) return <div className='error'>{error}</div>;

  return (
    <div>
      <div className='movie-list'>
        {movies.map(movie => (
          <div className="movie-card" key={movie.id}>
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

      {/* Sayfa geçiş butonları */}
      <div className="icon-buttons">
        <button 
      
          onClick={() => setPage(page - 1)} 
          disabled={page === 1} // İlk sayfadaysa buton devre dışı
        >
          Önceki
        </button>
        <span>Sayfa {page} / {totalPages}</span>
        <button 
          
          onClick={() => setPage(page + 1)} 
          disabled={page === totalPages} // Son sayfadaysa buton devre dışı
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}

export default MyMovies;
