import axiosInstance, { baseUrl } from "./axiosInstance";

export const getUserEdit = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/edit`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get User Edit failed]: ", error);
  }
};

export const updateUserProfile = async (userId, FormData) => {
  try {
    const res = await axiosInstance.put(
      `${baseUrl}/users/${userId}`,
      FormData,
      { headers: { "Content-type": "multipart/form-data" } }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Update User failed]: ", error);
  }
};
