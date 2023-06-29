import axiosInstance, { baseUrl } from './axiosInstance';

/*
追蹤使用者
  {{baseUrl}}/followships 
取消追蹤使用者
  {{baseUrl}}/followships/:followingId 
 */

// 傳入跟隨者名單
export const getPopularList = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/top`);
    console.log(res.data.topUsers);
    return res.data.topUsers;
  } catch (error) {
    console.error('[Get getPopularList failed]: ', error);
  }
};

// 傳出要跟隨的id
export const likePopularCard = async (followerId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/followships`, {
      id: `${followerId}`,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('[Like PopularCard failed]: ', error);
    throw error;
  }
};

// 傳出要取消跟隨的id
export const unlikePopularCard = async (followerId) => {
  try {
    const res = await axiosInstance.delete(
      `${baseUrl}/followships/${followerId} `
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('[Unlike PopularCard failed]: ', error);
    throw error;
  }
};
