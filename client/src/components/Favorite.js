import React, { useState, useEffect } from 'react';
import './style.css';

function Favorite({ user }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Favori filmleri sadece user var ise yükle
  useEffect(() => {
    if (user && user.id) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavoriteMovies(JSON.parse(savedFavorites));
      }
    }
  }, [user]);

  // Favori silme işlemi
  const handleRemoveFavorite = (movieId) => {
    if (user && user.id) {
      const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
      setFavoriteMovies(updatedFavorites);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
    }
  };

  // Kullanıcı oturumu yoksa log in olma mesajı göster
  if (!user) {
    return <div><h1>Please log in to see your favorite movies!</h1></div>;
  }

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
            <div className="release-info">
              <h2>{movie.title}</h2>
              <p>Oy: {movie.vote_average} ({movie.vote_count} oy)</p>
              <p>Popularity: {movie.popularity}</p>
              <p>Remove Favorite!</p>
              <button 
                className="icon-button" 
                onClick={() => handleRemoveFavorite(movie.id)}
              >
                <span className="material-icons">delete</span>
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
