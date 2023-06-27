import React from "react";
import PopularCard from "./PopularCard/PopularCard";
import "./popularList.scss";

/* 等待api串接10名推薦跟隨，順序follower由多到少 */

const PopularList = ({ popularCards }) => {
  return (
    <div className="popularList">
      <h4 className="medium">推薦跟隨</h4>
      <hr />
      <div className="popularCards">
        {popularCards.map((card) => (
          <PopularCard
            key={card.id}
            userName={card.name}
            avatar={card.avatar}
            account={card.account}
            isFollowed={card.isFollowed}
            followerId={card.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularList;
