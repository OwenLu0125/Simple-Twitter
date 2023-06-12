import UserCard from '../../component/userCard/UserCard';
import Navbar from '../../component/navbar/Navbar';
import PageTag from '../../component/pageTag/PageTag';
import './UsersDashboard.scss';

const UsersDashboard = () => {
  return (
    <div className="AdminUserContainer">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="cardsContainer">
        <PageTag />
        <ul className="cardList">
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
        </ul>
      </div>
    </div>
  );
};

export default UsersDashboard;
