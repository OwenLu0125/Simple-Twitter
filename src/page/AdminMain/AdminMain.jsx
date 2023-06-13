import Navbar from '../../component/navbar/Navbar';
import PageTag from '../../component/pageTag/PageTag';
import AdminTweetList from '../../component/adminTweetList/AdminTweetList';
import './AdminMain.scss';

const AdminMain = () => {
  return (
    <div className="adminMainContainer">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="subContainer">
        <PageTag title="推文清單" />
        <div className="listContainer">
          <AdminTweetList />
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
