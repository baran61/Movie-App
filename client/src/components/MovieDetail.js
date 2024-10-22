import { useLocation } from 'react-router-dom';
import './style.css';

function MovieDetail() {
    const location = useLocation();
    const { movie } = location.state; // MyMovies'ten gelen movie verisi
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
              <p>Add Favorite !</p>
              <button class="icon-button">
                <span class="material-icons">star</span>
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
