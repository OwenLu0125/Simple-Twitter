import axiosInstance, { baseUrl } from "./axiosInstance";
import Swal from "sweetalert2";

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
    Swal.fire({
      position: "top",
      title: "更改成功!",
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
    });
    return res;
  } catch (error) {
    Swal.fire({
      position: "top",
      title: "更改失敗!",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: true,
    });
    // console.error("[Put UseSettingInfo failed]: ", error);
  }
};
