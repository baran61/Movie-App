import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';

function MovieDetail() {
  const [favorite, setFavorite] = useState(() => {
    // Retrieve from local storage on initial load
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const location = useLocation();
  const { movie } = location.state; // MyMovies'ten gelen movie verisi

  const handleSubmit = () => {
    // Check if the movie is already in favorites
    const isFavorite = favorite.some((favMovie) => favMovie.id === movie.id);

    if (!isFavorite) {
      const updatedFavorites = [...favorite, movie];
      setFavorite(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
              <p>Add Favorite!</p>
              <button className="icon-button" onClick={handleSubmit}>
                <span className="material-icons">star</span>
              </button>
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
