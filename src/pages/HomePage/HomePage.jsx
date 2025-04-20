import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
