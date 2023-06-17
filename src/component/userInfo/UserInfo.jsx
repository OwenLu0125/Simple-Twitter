import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPopupModal from "../popupModal/editPopupModal/EditPopupModal";
import { getUserEdit } from "../../api/popupEditModal";
import { useAuth } from "../../contexts/AuthContext";
import "./UserInfo.scss";

const UserInfo = ({
  avatar,
  username,
  accountName,
  bio,
  followingCount,
  followersCount,
  banner,
  handleUserDataUpdate,
}) => {
  const { currentMember } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();



  const handleEditProfileClick = async () => {
    if (!currentMember || !currentMember.id) {
      return;
    }
    const { id } = currentMember;

    try {
      const userData = await getUserEdit(id);
      setUserData(userData);
      setShowModal(true);
    } catch (error) {
      console.error("獲取用户編輯數據失敗:", error);
    }
  };

  const handleClosePopup = () => {
    setShowModal(false);
  };

  const handleFollowingClick = () => {
    navigate("/follow");
  };

  const handleFollowersClick = () => {
    navigate("/follower");
  };


  return (
    <div className="userInfoContainer">
      <img src={banner} className="background" alt="banner" />
      <div className="userContext">
        <div className="upSection">
          <img src={avatar} alt="User Icon" className="userAvatar" />
          <button className="whiteButton" onClick={handleEditProfileClick}>
            編輯個人資料
          </button>
        </div>
        <div className="lowerSection">
          <h5 className="medium">{username}</h5>
          <div className="accountName">@{accountName}</div>
          <div className="bio">{bio}</div>
          {/* 要新增bio */}
          <div className="countSection">
            <div
              className="count followingCount"
              onClick={handleFollowingClick}
            >
              {followingCount}位<span>跟隨中</span>
            </div>
            <div
              className="count followersCount"
              onClick={handleFollowersClick}
            >
              {followersCount}位<span>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditPopupModal
          open={showModal}
          onClose={handleClosePopup}
          userData={userData}
          onUserDataUpdate={handleUserDataUpdate}
        />
      )}
    </div>
  );
};

export default UserInfo;
