import Tweet from "../tweets/tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";

const UserRepliesList = ({ likes }) => {
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
      {likes.map((like) => (
        <Tweet
          key={like.id}
          logo={like.avatar ?? grayLogo}
          username={like?.account ?? "John Doe"} //要改成user name
          accountName={like?.account ?? "John Doe"}
          postTime={formatTime(like.createdAt)}
          content={like.description ?? ""}
          comments={like.replyCount ?? 0} //缺少按讚數及愛心數
          likes={like.LikesCount ?? 0}
          postName={like.id} //要改成發文者名稱
        />
      ))}
    </div>
  );
};

export default UserRepliesList;
