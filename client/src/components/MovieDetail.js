import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';

function MovieDetail({ user }) {
  const [favorite, setFavorite] = useState(() => {
    if (user && user.id) {
      console.log('User:', user); // Kullanıcı bilgisini kontrol et
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    return [];
  });

  const location = useLocation();
  const { movie } = location.state; // MyMovies'ten gelen movie verisi

  const handleSubmit = () => {
    if (!user || !user.id) {
      alert("Please log in to add to favorites!");
      return;
    }

    // Check if the movie is already in favorites
    const isFavorite = favorite.some((favMovie) => favMovie.id === movie.id);

    if (!isFavorite) {
      const updatedFavorites = [...favorite, movie];
      setFavorite(updatedFavorites);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
    } else {
      alert("This movie is already in your favorites!");
    }
  };

  return (
    <div>
      {movie ? (
        <div className='movie-detail'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
          />
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <div className="release-info">
              <p>Yayın Tarihi: {movie.release_date}</p>
              <p>Oy: {movie.vote_average} ({movie.vote_count} oy)</p>
              {/* Eğer kullanıcı oturum açmışsa, favoriye ekle butonunu göster */}
              {user && user.id ? (
                <>
                  <p>Add Favorite!</p>
                  <button className="icon-button" onClick={handleSubmit}>
                    <span className="material-icons">star</span>
                  </button>
                </>
              ) : (
                <p>Please log in to add to favorites.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Film bulunamadı.</div>
      )}
    </div>
  );
}

export default MovieDetail;
