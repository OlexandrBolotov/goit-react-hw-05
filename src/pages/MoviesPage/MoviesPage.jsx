import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../components/api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  

  useEffect(() => {
    if (!query) return;
    const fetch = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.query.value.trim();
    if (value === '') return;
    setSearchParams({ query: value });
    form.reset();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="query" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
