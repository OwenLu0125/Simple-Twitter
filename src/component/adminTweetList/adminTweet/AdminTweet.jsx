import './AdminTweet.scss';
import deleteIcon from '../../../assets/delete.svg';

const AdminTweet = ({ img, username, accountName, postTime, content }) => {
  return (
    <div className="adminTweetContainer">
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
      <img className="delete" src={deleteIcon} alt="delete-icon" />
    </div>
  );
};

export default AdminTweet;
