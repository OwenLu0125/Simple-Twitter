import React, { useState } from "react";
import {likePopularCard, unlikePopularCard} from '../../../api/popularlist'
import grayLogo from "../../../assets/logoGray.svg";
import "./PopularCard.scss";

const PopularCard = ({ followerId, userName, account, isFollowed }) => {
  const [isFollow, setIsFollow] = useState(isFollowed);

    //  加入更新資料的邏輯
  const handleFollow = async() => {
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

  return (
    <div className="popular-card">
      <img src={grayLogo} alt="logo-gray" className="popular-card-logo" />
      <div className="popular-card-info">
        <h4 className="popular-card-userName">{userName}</h4>
        <p className="popular-card-account">{account}</p>
      </div>
      <button
        className={`whiteButton  ${isFollow ? "isFollow" : ""}`}
        onClick={handleFollow}
      >
        {isFollow ? "正在跟隨" : "跟隨"}
      </button>
    </div>
  );
};

export default PopularCard;
