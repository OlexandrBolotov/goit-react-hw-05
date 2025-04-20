import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../components/api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;