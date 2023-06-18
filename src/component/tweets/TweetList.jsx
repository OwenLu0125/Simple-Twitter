import Tweet from "./tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";
import { useUserId } from "../../contexts/UserIdContext";

const TweetsList = ({ tweets }) => {
  const { setUserIdFromTweet } = useUserId();

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
      {tweets.map(
        (tweet) =>
          tweet.User?.account && (
            <Tweet
              key={tweet.id}
              logo={tweet.User.avatar ?? grayLogo}
              username={tweet.User?.name ?? ""}
              accountName={tweet.User?.account ?? ""}
              postTime={formatTime(tweet.createdAt)}
              content={tweet.description ?? ""}
              comments={tweet.RepliesCount ?? 0}
              tweetId={tweet.id}
              likes={tweet.LikesCount}
              onGetUserIdFromTweet={() => setUserIdFromTweet(tweet.User.id)}
            />
          )
      )}
    </div>
  );
};

export default TweetsList;
