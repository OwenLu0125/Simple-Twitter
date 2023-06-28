import React, { useState, useEffect } from "react";
import { likePopularCard, unlikePopularCard } from "../../../api/popularlist";
import { useNavigate } from "react-router-dom";

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
  isFollowed,
  followerId,
  id,
  setUserIdFromTweet,
}) => {
  const [notificationIcon, setNotificationIcon] = useState(btnNotfi);
  const [isFollow, setIsFollow] = useState(isFollowed);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFollow(isFollowed);
  }, [isFollowed]);

  const handleFollow = async () => {
    if (isFollow === false) {
      try {
        await likePopularCard(followerId);
      } catch (error) {
        console.log(error);
        console.log("likePopularCard failed");
      }
    } else {
      try {
        await unlikePopularCard(followerId);
      } catch (error) {
        console.log(error);
      }
    }
    setIsFollow(!isFollow);
  };

  const handleNotificationClick = () => {
    if (notificationIcon === btnNotfi) {
      setNotificationIcon(activeNotfi);
    } else {
      setNotificationIcon(btnNotfi);
    }
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
          </div>
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
    </div>
  );
};

export default UserOtherItem;
