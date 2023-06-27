import axiosInstance, { baseUrl } from "./axiosInstance";

export const getUseSettingInfo = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/setting`);
    // console.log(res.data);
    return res;
  } catch (error) {
    console.error("[Get UseSettingInfo failed]: ", error);
  }
};

export const putUseSettingInfo = async (requestData) => {
  try {
    const res = await axiosInstance.put(
      `${baseUrl}/users/setting`,
      requestData
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.error("[Put UseSettingInfo failed]: ", error);
  }
};
