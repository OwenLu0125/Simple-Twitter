import React from 'react';
import PopularCard from './PopularCard/PopularCard';
import './PopularList.scss';

/* 等待api串接10名推薦跟隨，順序follower由多到少 */

const PopularList = () => {
  return (
    <div className="popular-list">
      <h4 className="medium">推薦跟隨</h4>
      <hr />
      <div className="popular-cards">
        <PopularCard userName="User1" account="@user1" />
        <PopularCard userName="User2" account="@user2" />
      </div>
    </div>
  );
};

export default PopularList;
