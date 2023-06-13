import profileImg from '../../assets/img/canadian-girl.jpg';
import profileBg from '../../assets/img/maple-leaf.jpg';
import featherIcon from '../../assets/feather.svg';
import heartIcon from '../../assets/heart.svg';
import './UserCard.scss';

const UserCard = () => {
  return (
    <li className="userCardContainer">
      <img className="bgImg" src={profileBg} alt="user-img" />

      <img className="userImg" src={profileImg} alt="profile-background" />

      <div className="userInfoContainer">
        <p className="name">Amanda Swift</p>
        <span className="account">@amandaswift</span>

        <div className="countSec">
          <span>
            <img src={featherIcon} alt="feather-icon" />
            <p>1.5k</p>
          </span>
          <span>
            <img src={heartIcon} alt="likes" />
            <p>20k</p>
          </span>
        </div>

        <div className="subscription">
          <p>34個</p>
          <p>59位</p>
        </div>
      </div>
    </li>
  );
};

export default UserCard;
