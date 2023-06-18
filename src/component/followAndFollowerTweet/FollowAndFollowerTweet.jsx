import React, { useState } from 'react';
import grayLogo from '../../assets/logoGray.svg';
import './FollowAndFollowerTweet.scss';
import { following, unfollowing } from '../../api/followship';

const FollowAndFollowerTweet = ({
  index,
  userName,
  intro,
  avatar,
  followerId,
  isFollowship,
  allList,
  setList,
  tabStatus,
}) => {
  const handleFollow = async () => {
    if (isFollowship) {
      try {
        await unfollowing(String(followerId));
        const newList = allList.map((user, i) => {
          if (index === i) {
            return tabStatus === 'followers'
              ? { ...user, isFollowed: false }
              : { ...user, isFollowing: false };
          } else {
            return user;
          }
        });
        setList(newList);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await following({ id: String(followerId) });
        const newList = allList.map((user, i) => {
          if (index === i) {
            return tabStatus === 'followers'
              ? { ...user, isFollowed: true }
              : { ...user, isFollowing: true };
          } else {
            return user;
          }
        });
        setList(newList);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //若url是follow render跟隨者頁面
  return (
    <>
      <div key={index} className="followAndFollowerTweetContainer">
        <div className="upSection">
          <img src={avatar} alt="logo-gray" className="userLogo" />
          <h4 className="userName">{userName}</h4>
          <button
            className={`whiteButton  ${isFollowship ? 'isFollow' : ''}`}
            onClick={handleFollow}
          >
            {isFollowship ? '正在跟隨' : '跟隨'}
          </button>
        </div>
        <h4 className="tweet">{intro}</h4>
      </div>
      <hr />
    </>
  );
};

export default FollowAndFollowerTweet;
