import AdminTweet from "./adminTweet/AdminTweet";
import "./AdminTweetList.scss";

const AdminTweetList = ({ tweets, setList }) => {
  return (
    <div className="adminTweetsListContainer">
      {tweets.map((tweet) => (
        <AdminTweet
          key={tweet.id}
          tweetId={tweet.id}
          userId={tweet.UserId}
          tweetOwnerAvatar={tweet.tweetOwnerAvatar}
          username={tweet.tweetOwnerName}
          accountName={tweet.tweetOwnerAccount}
          postTime={tweet.createdAt}
          content={tweet.description}
          setList={setList}
        />
      ))}
    </div>
  );
};

export default AdminTweetList;
