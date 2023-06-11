import React from "react";
import userPhoto from "../../assets/postPhoto.svg";
import "./UserInfo.scss";

const UserInfo = ({
  username,
  accountName,
  bio,
  followingCount,
  followersCount,
}) => {
  return (
    <div className="userInfoContainer">
      <div className="background" />
      <div className="userContext">
        <div className="upSection">
          <img src={userPhoto} alt="User Icon" className="userImage" />
          <button className="whiteButton">編輯個人資料</button>
        </div>
        <div className="lowerSection">
          <h5 className="medium">{username}</h5>
          <div className="accountName">@{accountName}</div>
          <div className="bio">{bio}</div>
          <div className="countSection">
            <div className="count followingCount">
              {followingCount}位
              <span>跟隨中</span>
            </div>
            <div className="count followersCount">
              {followersCount}位
              <span>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
