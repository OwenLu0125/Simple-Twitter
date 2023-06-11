import React, { useState } from "react";
import grayLogo from "../../../assets/logoGray.svg";
import "./PopularCard.scss";

const PopularCard = ({ userName, account }) => {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => {
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
