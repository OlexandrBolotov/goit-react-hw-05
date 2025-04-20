import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWE5ZTA4YjE1NmJmN2Q0YjkyMjc0MDI4MWUyOGU4NyIsIm5iZiI6MTc0NTEyNDEzMS44NTYsInN1YiI6IjY4MDQ3YjIzYWMwMmQ0NDA3YmFhNzNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CWSM7E2Ra8XH-Tk6Ki9KS1ssYXYEoDpN7m4DtIm7lRQ'; // 🔁 Заміни на свій токен

const options = {
  headers: {
    Authorization: AUTH_TOKEN,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?language=en-US`, options);
  return response.data;
};

export const fetchMovieCast = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits?language=en-US`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews?language=en-US&page=1`, options);
  return response.data.results;
};