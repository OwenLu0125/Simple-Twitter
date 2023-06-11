import axios from 'axios';

const baseUrl = 'https://infinite-dawn-77240.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6bnVsbCwiYWNjb3VudCI6InJvb3QiLCJlbWFpbCI6InJvb3RAZXhhbXBsZS5jb20iLCJhdmF0YXIiOm51bGwsImludHJvZHVjdGlvbiI6bnVsbCwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0wOVQxMDozMToyNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0wOVQxMDozMToyNy4wMDBaIiwiaWF0IjoxNjg2MzI4MDg0LCJleHAiOjE2ODg5MjAwODR9.25qVAtzKJnW6UYG7BZlkpBWoZ3zRGygeO4z00sE2wWA';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    return res.data.tweets;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};
