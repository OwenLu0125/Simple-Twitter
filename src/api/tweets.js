import axiosInstance, { baseUrl } from "./axiosInstance";

export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get Tweets failed]: ", error);
  }
};

export const postTweet = async ({ tweetText }) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets`, {
      description: tweetText,
    });
    return res;
  } catch (error) {
    console.error("[Post Tweet failed]: ", error);
  }
};

export const getSingleTweet = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get Tweet failed]: ", error);
  }
};

export const getTweetReplies = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/tweets/${id}/replies`);
    //console.log(data);
    return data;
  } catch (error) {
    console.error("[Get Tweet failed]: ", error);
  }
};

export const postReply = async ({ id, comment }) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${id}/replies`, {
      comment,
    });
    return res;
  } catch (error) {
    console.error("[Post Reply failed]: ", error);
    throw error;
  }
};

export const getUserTweets = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/tweets`);
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get User Tweets failed]: ", error);
  }
};

export const getUserRepliedTweets = async (userId) => {
  try {
    const res = await axiosInstance.get(
      `${baseUrl}/users/${userId}/replied_tweets`
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get User Replied Tweets failed]: ", error);
  }
};

export const getUserLikes = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/likes`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get User Likes failed]: ", error);
  }
};

export const getPostTweet = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/postTweet`);
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("[Get Tweets failed]: ", error);
  }
};
