import Tweet from "../tweets/tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";

const UserRepliesList = ({ replies }) => {
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
      {replies.map((reply) => (
        <Tweet
          key={reply.id}
          logo={reply.avatar ?? grayLogo}
          username={reply?.account ?? "John Doe"} //要改成user name
          accountName={reply?.account ?? "John Doe"}
          postTime={formatTime(reply.createdAt)}
          content={reply.comment ?? ""}
          replyTo={reply.id} //要改成發文者名稱
          hideFooter={true}
        />
      ))}
    </div>
  );
};

export default UserRepliesList;
