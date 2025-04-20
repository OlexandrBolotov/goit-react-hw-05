import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/api/tmdb';
import styles from './MovieDetailsPage.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from ?? '/movies';
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    getMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const { poster_path, title, overview, vote_average, genres } = movie;

  return (
    <div className={styles.wrapper}>
      <Link to={backLink} className={styles.back}>
        ← Go back
      </Link>

      <div className={styles.card}>
        <img
          src={poster_path ? `${BASE_IMG_URL}${poster_path}` : 'https://via.placeholder.com/300x450'}
          alt={title}
          width="300"
        />
        <div>
          <h2>{title}</h2>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />

      <div className={styles.links}>
        <p>Additional Information:</p>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;