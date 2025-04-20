import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../api/tmdb';
import styles from './MovieCast.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w200';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error('Error fetching cast:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : cast.length === 0 ? (
        <p className={styles.noCast}>There is no Cast info</p>
      ) : (
        <ul className={styles.list}>
          {cast.map(({ cast_id, name, profile_path, character }) => (
            <li key={cast_id} className={styles.item}>
              {profile_path ? (
                <img
                  src={`${BASE_IMG_URL}${profile_path}`}
                  alt={name}
                  className={styles.image}
                />
              ) : (
                <div className={styles.emptyFrame}></div>
              )}
              <p><strong>{name}</strong></p>
              <p>as {character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;