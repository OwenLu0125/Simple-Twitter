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
          logo={tweet.avatar ?? grayLogo} //logo要再改
          username={tweet.name}
          accountName={tweet.account}
          postTime={formatTime(tweet.createdAt)}
          content={tweet.description}
          comments={tweet.replyCount}
          likes={tweet.likeCount}
        />
      ))}
    </div>
  );
};

export default UserTweetsList;
