import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPopupModal from "../popupModal/editPopupModal/EditPopupModal";
import { getUserEdit } from "../../api/popupEditModal";
import { useAuth } from "../../contexts/AuthContext";
import { useUserId } from "../../contexts/UserIdContext";
import grayLogo from "../../assets/logoGray.svg";
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
  const { setUserIdFromTweet } = useUserId();
  const id = currentMember?.id;

  const handleEditProfileClick = async () => {
    try {
      const userData = await getUserEdit(id);
      setUserData(userData);
      setShowModal(true);
    } catch (error) {
      console.error("獲取用户編輯數據失敗:", error);
    }
  };

  const handleClosePopup = () => {
    setUserIdFromTweet(id);
    setShowModal(false);
  };

  const handleFollowingClick = () => {
    setUserIdFromTweet(id, username);
    navigate("/follower");
  };

  const handleFollowersClick = () => {
    setUserIdFromTweet(id, username);
    navigate("/follow");
  };

  return (
    <div className="userInfoContainer">
      <img src={banner} className="background" alt="banner" />
      <div className="userContext">
        <div className="upSection">
          <img
            src={avatar ?? grayLogo}
            alt="User Icon"
            className="userAvatar"
          />
          <button className="whiteButton" onClick={handleEditProfileClick}>
            編輯個人資料
          </button>
        </div>
        <div className="lowerSection">
          <h5 className="medium">{username}</h5>
          <div className="accountName">@{accountName}</div>
          <div className="bio">{bio}</div>
          <div className="countSection">
            <div
              className="count followingCount"
              onClick={handleFollowingClick}
            >
              {followersCount}位<span>跟隨中</span>
            </div>
            <div
              className="count followersCount"
              onClick={handleFollowersClick}
            >
              {followingCount}位<span>跟隨者</span>
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
          setUserData={setUserData}
        />
      )}
    </div>
  );
};

export default UserInfo;
