import UserPageTweet from "../userPageTweet/UserPageTweet";
import { formatTime } from "../../utils/timeUtils";

const UserLikesList = ({ likes, setTweetsList }) => {
  return (
    <div className="tweetsListContainer">
      {likes.map((like) => (
        <UserPageTweet
          key={like.TweetId}
          logo={like.tweetOwnerAvatar}
          username={like.tweetOwnerName}
          accountName={like.tweetOwnerAccount}
          postTime={formatTime(like.createdAt)}
          content={like.description}
          comments={like.replyCount}
          likes={like.likeCount}
          isLiked={like.isLiked}
          tweetId={like.TweetId}
          setList={setTweetsList}
        />
      ))}
    </div>
  );
};

export default UserLikesList;
