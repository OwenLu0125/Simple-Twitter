import './AdminTweet.scss';
import deleteIcon from '../../../assets/delete.svg';
import { DeleteTweetByAdmin } from '../../../api/admin';

const AdminTweet = ({
  tweetId,
  img,
  username,
  accountName,
  postTime,
  content,
  setList,
}) => {
  const handleDelete = async () => {
    try {
      await DeleteTweetByAdmin(tweetId);
      setList((prev) => {
        return prev.filter((tweet) => {
          return tweet.id !== tweetId;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div key={tweetId} className="adminTweetContainer">
      <img className="userImg" src={img} alt="user-img" />
      <div className="adminMainContent">
        <div className="adminTweetContent">
          <span className="name">{username}</span>
          <span className="account">{accountName}</span>
          <span className="dot" />
          <span className="date">{postTime}</span>
        </div>
        <div className="content">{content}</div>
      </div>
      <img
        className="delete"
        src={deleteIcon}
        alt="delete-icon"
        onClick={handleDelete}
      />
    </div>
  );
};

export default AdminTweet;
