import { formatTime } from "../../utils/timeUtils";
import UserPageTweet from "../userPageTweet/UserPageTweet";

const UserTweetsList = ({ tweets, username, userImage, setTweetsList }) => {
  return (
    <div className="tweetsListContainer">
      {tweets.map((tweet) => (
        <UserPageTweet

          key={tweet?.id}
          logo={userImage ?? tweet?.avatar}
          username={username ?? tweet?.name}
          accountName={tweet?.account}
          postTime={formatTime(tweet?.createdAt)}
          content={tweet?.description}
          comments={tweet?.replyCount}
          likes={tweet?.likeCount}
          isLiked={tweet?.currentUserIsLiked}
          tweetId={tweet?.id}

          setList={setTweetsList}
        />
      ))}
    </div>
  );
};

export default UserTweetsList;
