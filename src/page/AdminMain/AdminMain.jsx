import Navbar from '../../component/navbar/Navbar';
import PageTag from '../../component/pageTag/PageTag';
import AdminTweetList from '../../component/adminTweetList/AdminTweetList';
import './AdminMain.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminMain = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login_admin');
    }
  }, [navigate, isAuthenticated]);

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
