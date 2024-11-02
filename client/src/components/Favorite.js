import React, { useState, useEffect } from 'react';
import './style.css';

function Favorite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavoriteMovies(JSON.parse(savedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorite-container">
      <h2>Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie, index) => (
          <div key={index} className="movie-detail">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
            <div className='relase-info'>
              <h2>{movie.title}</h2>
              <p>Oy: {movie.vote_average} ({movie.vote_count} oy)</p>
              <p>Popularity: {movie.popularity}</p>
              <p>Remove Favorite !</p>
              <button class="icon-button" onClick={() => handleRemoveFavorite(movie.id)}>
                <span class="material-icons">delete</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No favorite movies added.</p>
      )}
    </div>
  );
}

export default Favorite;
