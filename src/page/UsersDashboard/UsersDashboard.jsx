import UserCard from '../../component/userCard/UserCard';
import Navbar from '../../component/navbar/Navbar';
import PageTag from '../../component/pageTag/PageTag';
import { useEffect, useState } from 'react';
import { getUsersByAdmin } from '../../api/admin';
import './UsersDashboard.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UsersDashboard = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const list = await getUsersByAdmin();
        setAllUsersData(list);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login_admin');
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="AdminUserContainer">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="cardsContainer">
        <PageTag title="使用者列表" />
        <ul className="cardList">
          {allUsersData.map((user) => {
            return (
              <UserCard
                name={user.name}
                account={user.account}
                avatar={user.avatar}
                tweetNum={user.tweetCount}
                likeNum={user.likedTweetsCount}
                followingNum={user.followingsCount}
                followerNum={user.followersCount}
                bgImg={user.banner}
              ></UserCard>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UsersDashboard;
