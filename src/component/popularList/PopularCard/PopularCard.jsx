import React, { useEffect, useState } from "react";
import defaultLogo from "../../../assets/logoGray.svg";
import "./PopularCard.scss";
import { useNavigate } from "react-router-dom";
import { getUserPageById } from "../../../api/getUserPage";
import { useUserId } from "../../../contexts/UserIdContext";
import { likePopularCard, unlikePopularCard } from "../../../api/popularlist";

const PopularCard = ({
  followerId,
  userName,
  account,
  isFollowed,
  avatar,
  isFollowedFromUserPage,
  userData,
  setFollow,
  //onFollowerIdChange,
}) => {
  const [isFollow, setIsFollow] = useState(isFollowed);
  const navigate = useNavigate();
  const { setUserIdFromTweet } = useUserId();

  useEffect(() => {
    setIsFollow(isFollowed);
  }, [isFollowedFromUserPage]);

  const handleUserPage = async () => {
    setUserIdFromTweet(followerId);

    const userData = await getUserPageById(followerId);
    if (userData) {
      console.log(followerId);
      navigate(`/user/${userData.name}`);
    }
  };

  const handleCardFollow = async () => {
    if (followerId === userData?.id) {
      if (isFollowed === false) {
        const followResult = await likePopularCard(userData?.id);
        setFollow(followResult.isFollowed);
      } else {
        const followResult = await unlikePopularCard(userData?.id);
        setFollow(followResult.isFollowed);
      }
    }

    setIsFollow(!isFollow);
  };

  //  加入更新資料的邏輯
  /*   const handleFollow = async () => {
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
    //onFollowerIdChange(followerId);
    setIsFollow(!isFollow);
  };
 */
  return (
    <div className="popularCard">
      <img
        src={avatar ?? defaultLogo}
        alt="user"
        className="popularCardLogo"
        onClick={handleUserPage}
      />
      <div className="popularCardInfo">
        <h4 className="popularCardUserName">{userName}</h4>
        <p className="popularCardAccount">{account}</p>
      </div>
      <button
        className={`whiteButton  ${isFollow ? "isFollow" : ""}`}
        onClick={handleCardFollow}
      >
        {isFollow ? "正在跟隨" : "跟隨"}
      </button>
    </div>
  );
};

export default PopularCard;
