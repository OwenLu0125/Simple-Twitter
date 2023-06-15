import Tweet from "../tweets/tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";

const UserTweetsList = ({ tweets }) => {
  function formatTime(timestamp) {
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

  return (
    <div className="tweetsListContainer">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          logo={tweet.avatar ?? grayLogo}
          username={tweet.User?.account ?? "John Doe"}
          accountName={tweet?.account ?? "John Doe"}
          postTime={formatTime(tweet.createdAt)}
          content={tweet.description ?? ""}
          comments={tweet.replyCount ?? 0}
          likes={tweet.LikesCount ?? 0}
        />
      ))}
    </div>
  );
};

export default UserTweetsList;
