import axios from 'axios';
const baseUrl = 'https://infinite-dawn-77240.herokuapp.com/api';
//const testApi = 'http://localhost:3004/users';

// 驗證區
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

// // 測試用
// export const getPopularlists = async () => {
//   try {
//     const res = await axios.get(`${testApi}`);
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     console.error('[Get getPopularlist failed]: ', error);
//   }
// };

// 正式版
export const getPopularList = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/top`);
    console.log(res.data.users);
    return res.data.users;
  } catch (error) {
    console.error("[Get getPopularList failed]: ", error);
  }
};
