import axios from 'axios';

const baseUrl = 'https://infinite-dawn-77240.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};

export const postTweet = async ({ tweetText }) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets`, {
      description: tweetText,
    });
    return res;
  } catch (error) {
    console.error('[Post Tweet failed]: ', error);
    throw error;
  }
};
