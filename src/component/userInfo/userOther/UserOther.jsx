import React, { useState } from "react";
import btnMsg from "../../../assets/btnMsg.svg";
import btnNotfi from "../../../assets/btnNotfi.svg";
import activeNotfi from "../../../assets/btn_notfi.svg";
import "./UserOther.scss";

const UserOtherItem = ({
  avatar,
  username,
  accountName,
  bio,
  followingCount,
  followersCount,
}) => {
  const [notificationIcon, setNotificationIcon] = useState(btnNotfi);
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => {
    setIsFollow(!isFollow);
  };

  const handleNotificationClick = () => {
    if (notificationIcon === btnNotfi) {
      setNotificationIcon(activeNotfi);
    } else {
      setNotificationIcon(btnNotfi);
    }
  };
  return (
    <div className="userInfoContainer">
      <div className="background" />
      <div className="userContext">
        <div className="upSection">
          <img src={avatar} alt="User Icon" className="userAvatar" />
          <div className="btnSection">
            <img src={btnMsg} alt="msg" className="msgIcon" />
            <img
              src={notificationIcon}
              alt="notfi"
              className="notiIcon"
              onClick={handleNotificationClick}
            />
            <button
              className={`whiteButton  ${isFollow ? "isFollow" : ""}`}
              onClick={handleFollow}
            >
              {isFollow ? "正在跟隨" : "跟隨"}
            </button>
            {/* 要帶入API資料 */}
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
    </div>
  );
};

export default UserOtherItem;
