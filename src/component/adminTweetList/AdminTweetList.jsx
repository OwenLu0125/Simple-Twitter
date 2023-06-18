import AdminTweet from './adminTweet/AdminTweet';
import './AdminTweetList.scss';
import profileImg from '../../assets/img/canadian-girl.jpg';

const AdminTweetList = ({ tweets, setList }) => {
  return (
    <div className="adminTweetsListContainer">
      {tweets.map((tweet) => (
        <AdminTweet
          key={tweet.id}
          tweetId={tweet.id}
          img={tweet.User.avatar}
          username={tweet.User.name}
          accountName={tweet.User.account}
          postTime={tweet.updatedAt}
          content={tweet.description}
          setList={setList}
        />
      ))}
    </div>
  );
};

export default AdminTweetList;
