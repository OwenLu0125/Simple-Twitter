import React, { useState } from 'react';
import EditPopupModal from '../../popupModal/editPopupModal/EditPopupModal';
import userPhoto from '../../../assets/postPhoto.svg';
import btnMsg from '../../../assets/btnMsg.svg';
import btnNotfi from '../../../assets/btnNotfi.svg';
import './UserOther.scss';

const UserOtherItem = ({
  username,
  accountName,
  bio,
  followingCount,
  followersCount,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditProfileClick = () => {
    setShowModal(true);
  };

  const handleClosePopup = () => {
    setShowModal(false);
  };
  return (
    <div className="userInfoContainer">
      <div className="background" />
      <div className="userContext">
        <div className="upSection">
          <img src={userPhoto} alt="User Icon" className="userAvatar" />
          <div className="btnSection">
            <img src={btnMsg} alt="msg" className="msgIcon" />
            <img src={btnNotfi} alt="notfi" className="notIicon" />
            <button className="whiteButton" onClick={handleEditProfileClick}>
              編輯個人資料
            </button>
          </div>
        </div>
        <div className="lowerSection">
          <h5 className="medium">{username}</h5>
          <div className="accountName">@{accountName}</div>
          <div className="bio">{bio}</div>
          <div className="countSection">
            <div className="count followingCount">
              {followingCount}位<span>跟隨中</span>
            </div>
            <div className="count followersCount">
              {followersCount}位<span>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditPopupModal open={showModal} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default UserOtherItem;
