
import { formatTime } from "../../utils/timeUtils";
import UserPageTweet from "../userPageTweet/UserPageTweet";


const UserRepliesList = ({ replies, username, userImage }) => {
  return (
    <div className="tweetsListContainer">
      {replies.map((reply) => (
        <UserPageTweet
          key={reply.id}
          logo={userImage ?? reply.replyAvatar}
          username={username ?? reply.replyName}
          accountName={reply.replyAccount}
          postTime={formatTime(reply.createdAt)}
          content={reply.comment}
          replyTo={reply.Tweet?.User?.account}
          tweetId={reply?.TweetId}
          hideFooter={true}
        />
      ))}
    </div>
  );
};

export default UserRepliesList;
