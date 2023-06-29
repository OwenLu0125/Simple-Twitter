export function formatTime(timestamp) {
  const currentTime = new Date();
  const postTime = new Date(timestamp);

  const diffInMilliseconds = currentTime - postTime;
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return "剛剛";
  } else {
    return `${diffInHours}小時`;
  }
}

export const formatDate = (timeString) => {
  const date = new Date(timeString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const period = hours < 12 ? "上午" : "下午";

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${period} ${formattedHours}:${formattedMinutes} ‧ ${year}年${month}月${day}日`;
};
