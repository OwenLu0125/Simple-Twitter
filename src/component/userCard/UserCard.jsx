import profileImg from '../../assets/img/canadian-girl.jpg';
import profileBg from '../../assets/img/maple-leaf.jpg';
import featherIcon from '../../assets/feather.svg';
import heartIcon from '../../assets/heart.svg';
import './UserCard.scss';

const UserCard = ({
  name,
  account,
  avatar,
  tweetNum,
  likeNum,
  followingNum,
  followerNum,
  bgImg,
}) => {
  return (
    <li className="userCardContainer">
      <img className="bgImg" src={bgImg} alt="user-img" />

      <img className="userImg" src={avatar} alt="profile-background" />

      <div className="userInfoContainer">
        <p className="name">{name}</p>
        <span className="account">@{account}</span>

        <div className="countSec">
          <span>
            <img src={featherIcon} alt="feather-icon" />
            <p>{tweetNum}</p>
          </span>
          <span>
            <img src={heartIcon} alt="likes" />
            <p>{likeNum}</p>
          </span>
        </div>

        <div className="subscription">
          <p className="follow">{followingNum}</p>
          <p className="follower">{followerNum}</p>
        </div>
      </div>
    </li>
  );
};

export default UserCard;
