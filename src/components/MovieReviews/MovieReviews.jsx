import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../api/tmdb';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : reviews.length === 0 ? (
        <p className={styles.noReviews}>There is no Reviews</p>
      ) : (
        <ul className={styles.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.item}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
