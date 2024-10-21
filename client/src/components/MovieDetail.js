import { useLocation } from 'react-router-dom';

function MovieDetail() {
    const location = useLocation();
    const { movie } = location.state; // MyMovies'ten gelen movie verisi
  return (
    <div>
      {movie ? (
        <div>
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
          />
          <p>{movie.overview}</p>
          <p>Yayın Tarihi: {movie.release_date}</p>
          <p>Oy: {movie.vote_average} ({movie.vote_count} oy)</p>
        </div>
      ) : (
        <div>Film bulunamadı.</div> 
      )}
    </div>
  )
}

export default MovieDetail
