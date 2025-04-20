import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'Bearer YOUR_ACCESS_TOKEN_HERE'; // 🔁 Заміни на свій токен

const options = {
  headers: {
    Authorization: AUTH_TOKEN,
  },
};

// 🔥 Отримати популярні фільми
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};
